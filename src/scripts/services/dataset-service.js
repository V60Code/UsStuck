class DatasetService {
  constructor() {
    this.haditsData = [];
    this.loadedAt = null;
  }

  async loadHaditsDataset() {
    if (this.haditsData.length > 0) {
      console.log('Hadits dataset already loaded');
      return true;
    }

    // Multiple possible paths for hadits.json
    const possiblePaths = [
      '/src/data/hadits.json',
      './src/data/hadits.json', 
      '../data/hadits.json',
      '/data/hadits.json',
      './data/hadits.json'
    ];

    for (const path of possiblePaths) {
      try {
        console.log(`Trying to load hadits from: ${path}`);
        const response = await fetch(path);
        
        if (response.ok) {
          const data = await response.json();
          
           if (Array.isArray(data) && data.length > 0) {
             this.haditsData = data;
             this.loadedAt = new Date().toISOString();
             console.log(`✅ Successfully loaded ${data.length} hadits from ${path}`);
             return true;
           } else {
             console.warn(`⚠️ Invalid data format from ${path}`);
           }
         } else {
           console.log(`❌ Failed to load from ${path}: ${response.status}`);
         }
       } catch (error) {
         console.log(`❌ Error loading from ${path}:`, error.message);
       }
     }

     // Fallback: create sample data if no file found
     console.warn('⚠️ Could not load hadits.json, using sample data');
     this.haditsData = [
       {
         id: 1,
         arabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ",
         translation: "Sesungguhnya amal perbuatan itu tergantung pada niatnya",
         source: "HR. Bukhari",
         narrator: "Umar bin Khattab",
         keywords: ["niat", "amal", "perbuatan", "tujuan"]
       },
       {
         id: 2,
         arabic: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
         translation: "Barangsiapa beriman kepada Allah dan hari akhir, hendaklah ia berkata baik atau diam",
         source: "HR. Bukhari & Muslim",
         narrator: "Abu Hurairah",
         keywords: ["berkata", "baik", "diam", "iman", "akhirat"]
       }
     ];
     
     this.loadedAt = new Date().toISOString();
     console.log(`✅ Using ${this.haditsData.length} sample hadits`);
     
     return true;
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
   // Get dataset statistics
   getDatasetStats() {
     return {
       isLoaded: this.haditsData.length > 0,
       count: this.haditsData.length,
       sampleData: this.haditsData.length > 0 ? {
         firstHadits: this.haditsData[0]?.translation || this.haditsData[0]?.terjemahan || 'No translation',
         sources: [...new Set(this.haditsData.map(h => h.source || h.sumber || 'Unknown'))],
         totalSources: [...new Set(this.haditsData.map(h => h.source || h.sumber || 'Unknown'))].length
       } : null,
       loadedAt: this.loadedAt || null
     };
   }

   // Check if dataset is loaded
   isLoaded() {
     return this.haditsData.length > 0;
   }
}

export default DatasetService;