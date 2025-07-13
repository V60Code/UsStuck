// 🧠 Enhanced Semantic Search Implementation
class EnhancedDatasetService extends DatasetService {
  constructor() {
    super();
    this.semanticCache = new Map();
    this.topicClusters = new Map();
    this.keywordIndex = new Map();
  }

  // Advanced relevance scoring with multiple factors
  calculateAdvancedRelevance(hadits, question) {
    const factors = {
      keywordMatch: this.calculateKeywordRelevance(hadits, question),
      semanticSimilarity: this.calculateSemanticSimilarity(hadits, question),
      topicRelevance: this.calculateTopicRelevance(hadits, question),
      contextualFit: this.calculateContextualFit(hadits, question),
      authorityWeight: this.getAuthorityWeight(hadits)
    };

    // Weighted scoring
    const weights = {
      keywordMatch: 0.3,
      semanticSimilarity: 0.25,
      topicRelevance: 0.2,
      contextualFit: 0.15,
      authorityWeight: 0.1
    };

    return Object.keys(factors).reduce((total, factor) => {
      return total + (factors[factor] * weights[factor]);
    }, 0);
  }

  // Semantic similarity using word embeddings approach
  calculateSemanticSimilarity(hadits, question) {
    const haditsText = this.normalizeText(
      `${hadits.translation || hadits.terjemahan || ''} ${hadits.text || hadits.arab || ''}`
    );
    const questionText = this.normalizeText(question);

    // Simple semantic similarity using word overlap and synonyms
    const haditsWords = this.extractMeaningfulWords(haditsText);
    const questionWords = this.extractMeaningfulWords(questionText);
    
    let matches = 0;
    let totalWords = questionWords.length;

    questionWords.forEach(qWord => {
      if (haditsWords.some(hWord => this.areSimilarWords(qWord, hWord))) {
        matches++;
      }
    });

    return totalWords > 0 ? matches / totalWords : 0;
  }

  // Extract meaningful words (remove stop words, etc.)
  extractMeaningfulWords(text) {
    const stopWords = new Set([
      'yang', 'dan', 'di', 'ke', 'dari', 'untuk', 'dengan', 'pada', 'dalam', 'adalah', 'akan',
      'telah', 'sudah', 'tidak', 'juga', 'atau', 'serta', 'itu', 'ini', 'tersebut', 'dapat',
      'bisa', 'harus', 'perlu', 'sangat', 'lebih', 'paling', 'sekali', 'saja', 'bahwa'
    ]);

    return text.toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.has(word))
      .map(word => word.replace(/[^\w]/g, ''));
  }

  // Check if two words are similar (basic implementation)
  areSimilarWords(word1, word2) {
    // Exact match
    if (word1 === word2) return true;
    
    // Root word similarity (basic stemming)
    if (word1.length > 4 && word2.length > 4) {
      const root1 = word1.substring(0, Math.min(4, word1.length));
      const root2 = word2.substring(0, Math.min(4, word2.length));
      if (root1 === root2) return true;
    }

    // Synonym mapping (can be expanded)
    const synonyms = {
      'sholat': ['salat', 'sembahyang', 'ibadah'],
      'puasa': ['shaum', 'shiyam'],
      'zakat': ['sedekah', 'infaq'],
      'haji': ['umrah', 'ibadah'],
      'doa': ['dzikir', 'munajat'],
      'allah': ['tuhan', 'rabb'],
      'nabi': ['rasul', 'prophet'],
      'islam': ['muslim', 'mukmin']
    };

    for (const [key, values] of Object.entries(synonyms)) {
      if ((word1 === key && values.includes(word2)) || 
          (word2 === key && values.includes(word1)) ||
          (values.includes(word1) && values.includes(word2))) {
        return true;
      }
    }

    return false;
  }

  // Calculate topic relevance
  calculateTopicRelevance(hadits, question) {
    const topics = {
      'ibadah': ['sholat', 'puasa', 'zakat', 'haji', 'umrah', 'dzikir', 'doa'],
      'akhlaq': ['akhlak', 'perilaku', 'adab', 'sopan', 'santun', 'berbuat', 'baik'],
      'muamalah': ['jual', 'beli', 'bisnis', 'perdagangan', 'hutang', 'riba'],
      'keluarga': ['orang tua', 'anak', 'istri', 'suami', 'keluarga', 'nikah'],
      'sosial': ['tetangga', 'masyarakat', 'tolong', 'bantu', 'gotong'],
      'aqidah': ['iman', 'tauhid', 'allah', 'nabi', 'rasul', 'kitab']
    };

    const questionLower = question.toLowerCase();
    const haditsText = `${hadits.translation || hadits.terjemahan || ''} ${hadits.text || hadits.arab || ''}`.toLowerCase();

    let maxRelevance = 0;
    
    Object.values(topics).forEach(topicWords => {
      let questionMatches = topicWords.filter(word => questionLower.includes(word)).length;
      let haditsMatches = topicWords.filter(word => haditsText.includes(word)).length;
      
      if (questionMatches > 0 && haditsMatches > 0) {
        const relevance = (questionMatches + haditsMatches) / topicWords.length;
        maxRelevance = Math.max(maxRelevance, relevance);
      }
    });

    return maxRelevance;
  }

  // Calculate contextual fit
  calculateContextualFit(hadits, question) {
    // Check if the hadits context matches the question context
    const questionContext = this.extractContext(question);
    const haditsContext = this.extractContext(hadits.translation || hadits.terjemahan || '');

    if (questionContext && haditsContext) {
      return questionContext === haditsContext ? 1 : 0.5;
    }

    return 0.3; // Default moderate fit
  }

  // Extract context from text (basic implementation)
  extractContext(text) {
    const contexts = {
      'worship': ['sholat', 'puasa', 'zakat', 'haji', 'ibadah', 'dzikir'],
      'social': ['tetangga', 'masyarakat', 'tolong', 'bantu', 'sosial'],
      'family': ['orang tua', 'anak', 'keluarga', 'istri', 'suami'],
      'business': ['jual', 'beli', 'bisnis', 'dagang', 'uang'],
      'ethics': ['akhlak', 'perilaku', 'adab', 'baik', 'buruk']
    };

    const textLower = text.toLowerCase();
    
    for (const [context, keywords] of Object.entries(contexts)) {
      if (keywords.some(keyword => textLower.includes(keyword))) {
        return context;
      }
    }

    return null;
  }

  // Get authority weight based on hadits source
  getAuthorityWeight(hadits) {
    const source = (hadits.source || hadits.sumber || hadits.kitab || '').toLowerCase();
    
    const authorityWeights = {
      'bukhari': 1.0,
      'muslim': 1.0,
      'abu dawud': 0.9,
      'tirmidzi': 0.9,
      'nasa\'i': 0.9,
      'ibnu majah': 0.9,
      'ahmad': 0.8,
      'malik': 0.8
    };

    for (const [sourceName, weight] of Object.entries(authorityWeights)) {
      if (source.includes(sourceName)) {
        return weight;
      }
    }

    return 0.7; // Default weight for other sources
  }

  // Enhanced hadits search with caching
  async findRelevantHaditsEnhanced(question, limit = 3) {
    const cacheKey = this.generateCacheKey(question);
    
    // Check cache first
    if (this.semanticCache.has(cacheKey)) {
      console.log('🎯 Using cached hadits results');
      return this.semanticCache.get(cacheKey);
    }

    if (!this.haditsData || !Array.isArray(this.haditsData)) {
      return [];
    }

    const relevantHadits = [];
    
    for (const hadits of this.haditsData) {
      const score = this.calculateAdvancedRelevance(hadits, question);
      if (score > 0.1) { // Minimum threshold
        relevantHadits.push({
          ...hadits,
          relevanceScore: score,
          matchDetails: this.getMatchDetails(hadits, question)
        });
      }
    }

    // Sort by relevance score and return top results
    const sortedResults = relevantHadits
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit);

    // Cache the results
    this.semanticCache.set(cacheKey, sortedResults);
    
    console.log(`🔍 Found ${sortedResults.length} relevant hadits with enhanced scoring`);
    return sortedResults;
  }

  // Generate cache key for question
  generateCacheKey(question) {
    return question.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .sort()
      .join('_');
  }

  // Get match details for debugging
  getMatchDetails(hadits, question) {
    return {
      keywordMatches: this.getKeywordMatches(hadits, question),
      topicMatch: this.calculateTopicRelevance(hadits, question),
      semanticScore: this.calculateSemanticSimilarity(hadits, question)
    };
  }

  // Get specific keyword matches
  getKeywordMatches(hadits, question) {
    const haditsText = `${hadits.translation || hadits.terjemahan || ''} ${hadits.text || hadits.arab || ''}`.toLowerCase();
    const questionWords = this.extractMeaningfulWords(question.toLowerCase());
    
    return questionWords.filter(word => haditsText.includes(word));
  }

  // Clear cache when needed
  clearCache() {
    this.semanticCache.clear();
    console.log('🧹 Semantic cache cleared');
  }

  // Get cache statistics
  getCacheStats() {
    return {
      cacheSize: this.semanticCache.size,
      cacheKeys: Array.from(this.semanticCache.keys())
    };
  }
}

// 📊 Performance Monitoring Service
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      responseTime: [],
      haditsSearchTime: [],
      geminiApiTime: [],
      cacheHitRate: { hits: 0, misses: 0 }
    };
  }

  startTimer(operation) {
    return {
      operation,
      startTime: performance.now(),
      end: () => {
        const duration = performance.now() - this.startTime;
        this.recordMetric(operation, duration);
        return duration;
      }
    };
  }

  recordMetric(operation, duration) {
    if (this.metrics[operation]) {
      this.metrics[operation].push(duration);
      // Keep only last 100 measurements
      if (this.metrics[operation].length > 100) {
        this.metrics[operation].shift();
      }
    }
  }

  recordCacheHit(isHit) {
    if (isHit) {
      this.metrics.cacheHitRate.hits++;
    } else {
      this.metrics.cacheHitRate.misses++;
    }
  }

  getPerformanceReport() {
    const report = {};
    
    Object.keys(this.metrics).forEach(key => {
      if (Array.isArray(this.metrics[key])) {
        const values = this.metrics[key];
        if (values.length > 0) {
          report[key] = {
            average: values.reduce((a, b) => a + b, 0) / values.length,
            min: Math.min(...values),
            max: Math.max(...values),
            count: values.length
          };
        }
      }
    });

    const { hits, misses } = this.metrics.cacheHitRate;
    const total = hits + misses;
    report.cacheHitRate = total > 0 ? (hits / total * 100).toFixed(2) + '%' : '0%';

    return report;
  }
}

// 🎯 Question Suggestion Service
class QuestionSuggestionService {
  constructor() {
    this.commonQuestions = [
      "Bagaimana cara sholat yang benar?",
      "Apa hukum puasa bagi orang sakit?",
      "Bagaimana cara menghitung zakat?",
      "Apa adab bertamu dalam Islam?",
      "Bagaimana cara berbakti kepada orang tua?",
      "Apa hukum riba dalam Islam?",
      "Bagaimana cara berdoa yang mustajab?",
      "Apa keutamaan membaca Al-Quran?",
      "Bagaimana cara bertaubat yang benar?",
      "Apa hak dan kewajiban suami istri?"
    ];
    
    this.topicKeywords = {
      'sholat': ["Bagaimana cara sholat yang benar?", "Apa syarat sahnya sholat?", "Kapan waktu sholat yang utama?"],
      'puasa': ["Apa yang membatalkan puasa?", "Bagaimana puasa bagi musafir?", "Apa hikmah puasa Ramadan?"],
      'zakat': ["Siapa yang wajib zakat?", "Bagaimana cara menghitung zakat?", "Kepada siapa zakat diberikan?"],
      'akhlak': ["Bagaimana akhlak yang baik?", "Apa adab bergaul dalam Islam?", "Bagaimana cara mengendalikan amarah?"],
      'keluarga': ["Apa hak orang tua?", "Bagaimana mendidik anak dalam Islam?", "Apa adab dalam rumah tangga?"]
    };
  }

  generateSuggestions(currentQuestion) {
    const suggestions = {
      related: this.findRelatedQuestions(currentQuestion),
      followUp: this.generateFollowUpQuestions(currentQuestion),
      popular: this.getPopularQuestions(),
      topical: this.getTopicalSuggestions(currentQuestion)
    };

    return suggestions;
  }

  findRelatedQuestions(question) {
    const questionLower = question.toLowerCase();
    const related = [];

    // Find questions with similar keywords
    Object.keys(this.topicKeywords).forEach(topic => {
      if (questionLower.includes(topic)) {
        related.push(...this.topicKeywords[topic]);
      }
    });

    return related.slice(0, 3);
  }

  generateFollowUpQuestions(question) {
    const followUps = [];
    const questionLower = question.toLowerCase();

    if (questionLower.includes('sholat')) {
      followUps.push("Apa yang harus dilakukan jika lupa dalam sholat?");
      followUps.push("Bagaimana sholat jamaah yang benar?");
    }

    if (questionLower.includes('puasa')) {
      followUps.push("Apa yang dianjurkan saat berbuka puasa?");
      followUps.push("Bagaimana puasa sunnah yang dianjurkan?");
    }

    if (questionLower.includes('zakat')) {
      followUps.push("Apa perbedaan zakat dan sedekah?");
      followUps.push("Kapan waktu yang tepat membayar zakat?");
    }

    return followUps.slice(0, 2);
  }

  getPopularQuestions() {
    return this.commonQuestions.slice(0, 5);
  }

  getTopicalSuggestions(question) {
    // Return suggestions based on current Islamic calendar or events
    const currentMonth = new Date().getMonth() + 1;
    
    if (currentMonth === 9) { // Ramadan (approximate)
      return [
        "Apa amalan yang dianjurkan di bulan Ramadan?",
        "Bagaimana cara memaksimalkan ibadah di Ramadan?",
        "Apa keutamaan lailatul qadr?"
      ];
    }

    if (currentMonth === 12) { // Dzulhijjah
      return [
        "Apa amalan yang dianjurkan di 10 hari pertama Dzulhijjah?",
        "Bagaimana tata cara ibadah haji?",
        "Apa hikmah dari ibadah qurban?"
      ];
    }

    return this.commonQuestions.slice(0, 3);
  }
}

// Export enhanced services
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    EnhancedDatasetService,
    PerformanceMonitor,
    QuestionSuggestionService
  };
}