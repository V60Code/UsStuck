import GeminiService from '../../services/gemini-service.js';

class AskAiModel {
  constructor() {
    this.questions = [];
    this.responses = [];
    this.isLoading = false;
    this.currentConversation = [];
    this.geminiService = new GeminiService();
    this.useGemini = true; // Flag to enable/disable Gemini
  }

  // Ask question using Gemini AI with hadits dataset
  async askQuestion(question) {
    this.isLoading = true;
    
    try {
      let response;
      
      if (this.useGemini) {
        // Try using Gemini API with hadits dataset
        try {
          const geminiResponse = await this.geminiService.generateResponse(question);
          response = {
            text: geminiResponse.text,
            source: geminiResponse.hasRelevantHadits ? "Berdasarkan Hadits" : "Pengetahuan Islam Umum",
            references: geminiResponse.sources.map(source => 
              `${source.source}${source.narrator ? ` - ${source.narrator}` : ''}`
            ).filter(ref => ref.trim() !== ''),
            haditsUsed: geminiResponse.sources,
            isGeminiResponse: true
          };
        } catch (geminiError) {
          console.warn('Gemini API failed, using fallback:', geminiError);
          response = this.generateMockResponse(question);
          response.isGeminiResponse = false;
          response.fallbackReason = geminiError.message;
        }
      } else {
        // Use mock response
        response = this.generateMockResponse(question);
        response.isGeminiResponse = false;
      }
      
      const conversation = {
        id: Date.now(),
        question: question,
        response: response,
        timestamp: new Date().toISOString()
      };
      
      this.currentConversation.push(conversation);
      this.isLoading = false;
      
      return conversation;
      
    } catch (error) {
      this.isLoading = false;
      console.error('Error in askQuestion:', error);
      
      // Return error response
      const errorResponse = {
        id: Date.now(),
        question: question,
        response: {
          text: "Maaf, terjadi kesalahan saat memproses pertanyaan Anda. Silakan coba lagi atau konsultasi dengan ustadz.",
          source: "Sistem",
          references: [],
          isGeminiResponse: false,
          error: error.message
        },
        timestamp: new Date().toISOString()
      };
      
      this.currentConversation.push(errorResponse);
      return errorResponse;
    }
  }

  generateMockResponse(question) {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('sholat') || lowerQuestion.includes('salat')) {
      return {
        text: "Sholat adalah rukun Islam yang kedua dan merupakan kewajiban bagi setiap Muslim. Sholat dilakukan 5 waktu dalam sehari: Subuh, Dzuhur, Ashar, Maghrib, dan Isya.",
        source: "Hadits Bukhari Muslim",
        references: ["Al-Quran Surah Al-Baqarah: 43", "Hadits Bukhari No. 8"]
      };
    } else if (lowerQuestion.includes('puasa') || lowerQuestion.includes('ramadan')) {
      return {
        text: "Puasa Ramadan adalah rukun Islam yang keempat. Puasa dilakukan dari terbit fajar hingga terbenam matahari selama bulan Ramadan.",
        source: "Al-Quran dan Hadits",
        references: ["Al-Quran Surah Al-Baqarah: 183-185", "Hadits Bukhari No. 1901"]
      };
    } else if (lowerQuestion.includes('zakat')) {
      return {
        text: "Zakat adalah rukun Islam yang ketiga. Zakat wajib dikeluarkan oleh Muslim yang mampu untuk membersihkan harta dan membantu yang membutuhkan.",
        source: "Al-Quran dan Hadits",
        references: ["Al-Quran Surah At-Taubah: 103", "Hadits Bukhari No. 1395"]
      };
    } else {
      return {
        text: "Terima kasih atas pertanyaan Anda. Fitur AI masih dalam pengembangan. Silakan konsultasi dengan ustadz atau rujuk ke sumber-sumber Islam yang terpercaya.",
        source: "Sistem",
        references: []
      };
    }
  }

  getConversationHistory() {
    return this.currentConversation;
  }

  clearConversation() {
    this.currentConversation = [];
  }

  getLoadingState() {
    return this.isLoading;
  }

  // Toggle Gemini usage
  toggleGemini(enabled) {
    this.useGemini = enabled;
    console.log(`Gemini AI ${enabled ? 'enabled' : 'disabled'}`);
  }

  // Get Gemini service status
  async getGeminiStatus() {
    return this.geminiService.getStatus();
  }

  // Test Gemini connection
  async testGeminiConnection() {
    return await this.geminiService.testConnection();
  }

  // Initialize Gemini service manually
  async initializeGemini() {
    return await this.geminiService.initialize();
  }

  // Clear cache
  async clearCache() {
    return this.geminiService.clearCache();
  }

  // Export cache
  async exportCache() {
    return this.geminiService.exportCache();
  }

  // Import cache
  async importCache(cacheData) {
    return this.geminiService.importCache(cacheData);
  }

  // Reset quota (for testing)
  async resetQuota() {
    return this.geminiService.resetQuota();
  }
}

export default AskAiModel;