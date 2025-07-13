class AskAiModel {
  constructor() {
    this.questions = [];
    this.responses = [];
    this.isLoading = false;
    this.currentConversation = [];
  }

  // Simulate AI response (placeholder for future API integration)
  async askQuestion(question) {
    this.isLoading = true;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock responses based on keywords
    const response = this.generateMockResponse(question);
    
    const conversation = {
      id: Date.now(),
      question: question,
      response: response,
      timestamp: new Date().toISOString()
    };
    
    this.currentConversation.push(conversation);
    this.isLoading = false;
    
    return conversation;
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
}

export default AskAiModel;