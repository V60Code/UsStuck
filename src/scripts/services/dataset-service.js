class DatasetService {
  constructor() {
    this.haditsData = null;
    this.isLoaded = false;
  }

  async loadHaditsDataset() {
    if (this.isLoaded && this.haditsData) {
      return this.haditsData;
    }

    try {
      console.log('Loading hadits dataset...');
      
      // Try multiple paths
      const possiblePaths = [
        '/src/scripts/data/hadits.json',
        './src/scripts/data/hadits.json',
        'src/scripts/data/hadits.json'
      ];
      
      let data = null;
      
      for (const path of possiblePaths) {
        try {
          const response = await fetch(path);
          if (response.ok) {
            data = await response.json();
            console.log(`✅ Dataset loaded from: ${path}`);
            break;
          }
        } catch (pathError) {
          console.log(`❌ Failed to load from ${path}`);
          continue;
        }
      }
      
      if (!data) {
        // Fallback: use sample data
        console.warn('⚠️ Using sample hadits data');
        data = [
          {
            text: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ",
            translation: "Sesungguhnya amal perbuatan itu tergantung pada niatnya",
            narrator: "Umar bin Khattab",
            source: "Sahih Bukhari",
            theme: "niat"
          }
        ];
      }
      
      this.haditsData = data;
      this.isLoaded = true;
      
      console.log(`📚 Loaded ${Array.isArray(this.haditsData) ? this.haditsData.length : 'unknown'} hadits entries`);
      return this.haditsData;
      
    } catch (error) {
      console.error('Error loading hadits dataset:', error);
      this.haditsData = [];
      this.isLoaded = true;
      return [];
    }
  }

  // Cari hadits yang relevan berdasarkan pertanyaan
  findRelevantHadits(question) {
    if (!this.haditsData || !Array.isArray(this.haditsData)) {
      return [];
    }
    
    const keywords = this.extractKeywords(question);
    const relevantHadits = [];
    
    for (const hadits of this.haditsData) {
      const score = this.calculateRelevanceScore(hadits, keywords);
      if (score > 0) {
        relevantHadits.push({
          ...hadits,
          relevanceScore: score
        });
      }
    }
    
    // Sort by relevance score and return top 3
    return relevantHadits
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 3);
  }

  extractKeywords(question) {
    // Remove common words and extract meaningful keywords
    const commonWords = ['apa', 'bagaimana', 'mengapa', 'kapan', 'dimana', 'siapa', 'yang', 'adalah', 'tentang', 'dalam', 'untuk', 'dengan', 'dari', 'ke', 'di', 'pada', 'oleh', 'dan', 'atau', 'tetapi', 'jika', 'maka'];
    
    return question
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2 && !commonWords.includes(word))
      .slice(0, 10); // Limit to 10 keywords
  }

  calculateRelevanceScore(hadits, keywords) {
    let score = 0;
    
    // Check different fields of hadits object
    const searchFields = [
      hadits.text || hadits.arab || hadits.arabic || '',
      hadits.translation || hadits.terjemahan || hadits.indonesian || '',
      hadits.narrator || hadits.perawi || '',
      hadits.source || hadits.sumber || hadits.kitab || '',
      hadits.theme || hadits.tema || hadits.category || ''
    ];
    
    const searchText = searchFields.join(' ').toLowerCase();
    
    keywords.forEach(keyword => {
      const regex = new RegExp(keyword, 'gi');
      const matches = searchText.match(regex);
      if (matches) {
        score += matches.length;
      }
    });
    
    return score;
  }

  formatHaditsForContext(hadits) {
    const formatted = [];
    
    hadits.forEach((item, index) => {
      let haditsText = `\n--- Hadits ${index + 1} ---\n`;
      
      if (item.text || item.arab || item.arabic) {
        haditsText += `Arab: ${item.text || item.arab || item.arabic}\n`;
      }
      
      if (item.translation || item.terjemahan || item.indonesian) {
        haditsText += `Terjemahan: ${item.translation || item.terjemahan || item.indonesian}\n`;
      }
      
      if (item.narrator || item.perawi) {
        haditsText += `Perawi: ${item.narrator || item.perawi}\n`;
      }
      
      if (item.source || item.sumber || item.kitab) {
        haditsText += `Sumber: ${item.source || item.sumber || item.kitab}\n`;
      }
      
      formatted.push(haditsText);
    });
    
    return formatted.join('\n');
  }

  // Get statistics about the dataset
  getDatasetStats() {
    if (!this.haditsData || !Array.isArray(this.haditsData)) {
      return { total: 0, loaded: false };
    }
    
    return {
      total: this.haditsData.length,
      loaded: this.isLoaded,
      sampleFields: this.haditsData.length > 0 ? Object.keys(this.haditsData[0]) : []
    };
  }
}

export default DatasetService;