import { GEMINI_CONFIG, ISLAMIC_CONTEXT_PROMPT, loadApiKey } from '../config/gemini-config.js';
import DatasetService from './dataset-service.js';

class GeminiService {
  constructor() {
    this.datasetService = new DatasetService();
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

      // Call Gemini API
      const response = await this.callGeminiAPI(prompt);
      
      return {
        text: response,
        sources: relevantHadits.map(hadits => ({
          text: hadits.Terjemahan || hadits.translation || hadits.terjemahan || hadits.indonesian || '',
          arabic: hadits.Arab || hadits.text || hadits.arab || hadits.arabic || '',
          source: hadits.Nama || hadits.source || hadits.sumber || hadits.kitab || '',
          narrator: hadits.Perawi || hadits.narrator || hadits.perawi || ''
        })),
        hasRelevantHadits: relevantHadits.length > 0
      };
      
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

  // Get service status
  getStatus() {
    return {
      initialized: this.isInitialized,
      hasApiKey: !!this.apiKey,
      datasetStats: this.datasetService.getDatasetStats()
    };
  }
}

export default GeminiService;