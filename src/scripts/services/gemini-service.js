import { GEMINI_CONFIG, ISLAMIC_CONTEXT_PROMPT, loadApiKey } from '../config/gemini-config.js';
import DatasetService from './dataset-service.js';
import SmartCache from '../utils/smart-cache.js';
import QuotaManager from '../utils/quota-manager.js';

class GeminiService {
  constructor() {
    this.datasetService = new DatasetService();
    this.smartCache = new SmartCache();
    this.quotaManager = new QuotaManager();
    this.apiKey = null;
    this.isInitialized = false;
  }

  async initialize() {
    if (this.isInitialized) return true;

    try {
      // Load API key
      this.apiKey = await loadApiKey();
      if (!this.apiKey) {
        throw new Error('Failed to load Gemini API key');
      }

      // Load dataset
      await this.datasetService.loadHaditsDataset();
      
      this.isInitialized = true;
      console.log('Gemini service initialized successfully');
      return true;
      
    } catch (error) {
      console.error('Failed to initialize Gemini service:', error);
      return false;
    }
  }

  async generateResponse(question) {
    try {
      // Ensure service is initialized
      const initialized = await this.initialize();
      if (!initialized) {
        throw new Error('Gemini service not initialized');
      }

      // 1. Check cache first
      const cachedResponse = this.smartCache.findCachedResponse(question);
      if (cachedResponse) {
        console.log('🎯 Using cached response');
        this.smartCache.updateAccessCount(question);
        return {
          ...cachedResponse.response,
          fromCache: true,
          cacheType: cachedResponse.cacheType
        };
      }

      // 2. Check quota before API call
      const quotaCheck = this.quotaManager.canMakeRequest();
      if (!quotaCheck.canMake) {
        console.warn('❌ Quota exceeded:', quotaCheck);
        
        if (!quotaCheck.dailyLimit) {
          const resetTime = this.quotaManager.getTimeUntilReset();
          throw new Error(`Quota harian habis. Reset dalam ${resetTime.hours}j ${resetTime.minutes}m`);
        }
        
        if (!quotaCheck.minuteLimit) {
          throw new Error('Rate limit exceeded. Tunggu 1 menit.');
        }
      }

      // 3. Wait if needed for rate limiting
      const canProceed = await this.quotaManager.waitIfNeeded();
      if (!canProceed) {
        throw new Error('Daily quota exceeded');
      }

      // Find relevant hadits
      const relevantHadits = this.datasetService.findRelevantHadits(question);
      console.log(`Found ${relevantHadits.length} relevant hadits for question`);

      // Format hadits context
      const haditsContext = relevantHadits.length > 0 
        ? this.datasetService.formatHaditsForContext(relevantHadits)
        : 'Tidak ada hadits spesifik yang ditemukan untuk pertanyaan ini.';

      // Create prompt with context
      const prompt = ISLAMIC_CONTEXT_PROMPT
        .replace('{HADITS_CONTEXT}', haditsContext)
        .replace('{USER_QUESTION}', question);

      // Record request before API call
      this.quotaManager.recordRequest();

      // Call Gemini API
      const response = await this.callGeminiAPI(prompt);
      
      const result = {
        text: response,
        sources: relevantHadits.map(hadits => ({
          text: hadits.Terjemahan || hadits.translation || hadits.terjemahan || hadits.indonesian || '',
          arabic: hadits.Arab || hadits.text || hadits.arab || hadits.arabic || '',
          source: hadits.Nama || hadits.source || hadits.sumber || hadits.kitab || '',
          narrator: hadits.Perawi || hadits.narrator || hadits.perawi || ''
        })),
        hasRelevantHadits: relevantHadits.length > 0,
        fromCache: false
      };

      // 4. Cache the response
      this.smartCache.saveResponse(question, result);
      
      return result;
      
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  }

  async callGeminiAPI(prompt) {
    const url = `${GEMINI_CONFIG.baseUrl}/${GEMINI_CONFIG.model}:generateContent?key=${this.apiKey}`;
    
    const requestBody = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: GEMINI_CONFIG.temperature,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: GEMINI_CONFIG.maxTokens,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    }
    
    throw new Error('Invalid response format from Gemini API');
  }

  // Test connection to Gemini API
  async testConnection() {
    try {
      const testResponse = await this.generateResponse("Assalamu'alaikum");
      return {
        success: true,
        message: 'Connection to Gemini API successful',
        response: testResponse.text.substring(0, 100) + '...'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to connect to Gemini API',
        error: error.message
      };
    }
  }

  // Get service status with cache and quota info
  getStatus() {
    const cacheStats = this.smartCache.getStats();
    const quotaStats = this.quotaManager.getStats();
    const quotaStatus = this.quotaManager.getQuotaStatus();
    
    return {
      isInitialized: this.isInitialized,
      hasApiKey: !!this.apiKey,
      hasDataset: this.datasetService.isLoaded(),
      datasetSize: this.datasetService.getDatasetSize(),
      cache: {
        totalEntries: cacheStats.totalEntries,
        hitRate: cacheStats.hitRate,
        totalHits: cacheStats.totalHits,
        totalMisses: cacheStats.totalMisses,
        cacheSize: cacheStats.cacheSize,
        oldestEntry: cacheStats.oldestEntry,
        newestEntry: cacheStats.newestEntry
      },
      quota: {
        dailyUsed: quotaStats.dailyUsed,
        dailyLimit: quotaStats.dailyLimit,
        dailyRemaining: quotaStats.dailyRemaining,
        minuteUsed: quotaStats.minuteUsed,
        minuteLimit: quotaStats.minuteLimit,
        status: quotaStatus.status,
        statusMessage: quotaStatus.message,
        resetTime: this.quotaManager.getTimeUntilReset()
      }
    };
  }

  // Clear cache
  clearCache() {
    return this.smartCache.clearCache();
  }

  // Export cache data
  exportCache() {
    return this.smartCache.exportCache();
  }

  // Import cache data
  importCache(cacheData) {
    return this.smartCache.importCache(cacheData);
  }

  // Reset quota (for testing)
  resetQuota() {
    return this.quotaManager.resetQuota();
  }
}

export default GeminiService;