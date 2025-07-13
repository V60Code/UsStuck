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

   // Cari hadits yang relevan berdasarkan pertanyaan dengan algoritma yang lebih canggih
   findRelevantHadits(question) {
     if (!this.haditsData || !Array.isArray(this.haditsData)) {
       return [];
     }
     
     console.log(`🔍 Searching for hadits related to: "${question}"`);
     console.log(`📊 Total hadits in dataset: ${this.haditsData.length}`);
     
     const keywords = this.extractKeywords(question);
     const semanticKeywords = this.extractSemanticKeywords(question);
     const relevantHadits = [];
     
     for (const hadits of this.haditsData) {
       const score = this.calculateAdvancedRelevanceScore(hadits, keywords, semanticKeywords, question);
       if (score > 0) {
         relevantHadits.push({
           ...hadits,
           relevanceScore: score,
           matchDetails: this.getMatchDetails(hadits, keywords, semanticKeywords)
         });
       }
     }
     
     // Sort by relevance score and return top 3
     const sortedResults = relevantHadits
       .sort((a, b) => b.relevanceScore - a.relevanceScore)
       .slice(0, 3);
     
     console.log(`✅ Found ${sortedResults.length} relevant hadits`);
     if (sortedResults.length > 0) {
       console.log(`🎯 Top result score: ${sortedResults[0].relevanceScore.toFixed(2)}`);
       console.log(`📝 Top result preview: ${(sortedResults[0].Terjemahan || sortedResults[0].translation || '').substring(0, 100)}...`);
     }
     
     return sortedResults;
   }

   extractKeywords(question) {
     // Validate input and provide safe fallback
     if (!question || typeof question !== 'string') {
       console.warn('extractKeywords: Invalid question input:', question);
       return [];
     }
     
     // Remove common words and extract meaningful keywords
     const commonWords = ['apa', 'bagaimana', 'mengapa', 'kapan', 'dimana', 'siapa', 'yang', 'adalah', 'tentang', 'dalam', 'untuk', 'dengan', 'dari', 'ke', 'di', 'pada', 'oleh', 'dan', 'atau', 'tetapi', 'jika', 'maka', 'itu', 'ini', 'tersebut', 'dapat', 'bisa', 'harus', 'akan', 'telah', 'sudah', 'tidak', 'juga', 'serta', 'bahwa'];
     
     try {
       return question
         .toLowerCase()
         .replace(/[^\w\s]/g, ' ')
         .split(/\s+/)
         .filter(word => word.length > 2 && !commonWords.includes(word))
         .slice(0, 15); // Increased limit for better matching
     } catch (error) {
       console.error('Error in extractKeywords:', error);
       return [];
     }
   }

   // Extract semantic keywords based on Islamic concepts
   extractSemanticKeywords(question) {
     // Validate input and provide safe fallback
     if (!question || typeof question !== 'string') {
       console.warn('extractSemanticKeywords: Invalid question input:', question);
       return [];
     }
     
     try {
       const questionLower = question.toLowerCase();
       const semanticMap = {
         // Definisi dan konsep dasar
         'islam': ['islam', 'muslim', 'menyembah allah', 'tidak menyekutukan', 'shalat', 'zakat', 'puasa', 'ramadan', 'syahadat'],
         'iman': ['iman', 'beriman', 'allah', 'malaikat', 'kitab', 'rasul', 'hari akhir', 'qada qadar', 'takdir'],
         'ihsan': ['ihsan', 'menyembah allah', 'seolah melihat', 'dia melihat'],
         
         // Ibadah
         'shalat': ['shalat', 'salat', 'sembahyang', 'rukun', 'syarat', 'wudhu', 'kiblat'],
         'puasa': ['puasa', 'shaum', 'ramadan', 'sahur', 'berbuka', 'imsak'],
         'zakat': ['zakat', 'sedekah', 'infaq', 'harta', 'fakir', 'miskin'],
         'haji': ['haji', 'umrah', 'makkah', 'ka\'bah', 'ihram', 'tawaf'],
         
         // Akhlak dan perilaku
         'akhlak': ['akhlak', 'perilaku', 'adab', 'sopan', 'santun', 'berbuat baik'],
         'orang tua': ['orang tua', 'ibu', 'ayah', 'berbakti', 'birrul walidain'],
         'tetangga': ['tetangga', 'bertetangga', 'hak tetangga'],
         
         // Muamalah
         'jual beli': ['jual', 'beli', 'perdagangan', 'bisnis', 'halal', 'haram'],
         'riba': ['riba', 'bunga', 'tambahan', 'haram'],
         
         // Konsep waktu dan eskatologi
         'hari kiamat': ['kiamat', 'hari akhir', 'akhirat', 'yaumul qiyamah', 'tanda kiamat'],
         'surga neraka': ['surga', 'neraka', 'jannah', 'jahannam']
       };
       
       const foundConcepts = [];
       
       Object.keys(semanticMap).forEach(concept => {
         if (semanticMap[concept].some(keyword => questionLower.includes(keyword))) {
           foundConcepts.push(...semanticMap[concept]);
         }
       });
       
       return [...new Set(foundConcepts)]; // Remove duplicates
     } catch (error) {
       console.error('Error in extractSemanticKeywords:', error);
       return [];
     }
   }

   calculateAdvancedRelevanceScore(hadits, keywords, semanticKeywords, originalQuestion) {
     // Validate inputs
     if (!hadits || typeof hadits !== 'object') {
       console.warn('calculateAdvancedRelevanceScore: Invalid hadits input:', hadits);
       return 0;
     }
     
     if (!Array.isArray(keywords)) keywords = [];
     if (!Array.isArray(semanticKeywords)) semanticKeywords = [];
     if (!originalQuestion || typeof originalQuestion !== 'string') {
       console.warn('calculateAdvancedRelevanceScore: Invalid originalQuestion input:', originalQuestion);
       originalQuestion = '';
     }
     
     let score = 0;
     
     try {
       // Map field names correctly based on actual data structure with safe string conversion
       const searchFields = {
         arabic: String(hadits.Arab || hadits.text || hadits.arab || hadits.arabic || ''),
         translation: String(hadits.Terjemahan || hadits.translation || hadits.terjemahan || hadits.indonesian || ''),
         narrator: String(hadits.Perawi || hadits.narrator || hadits.perawi || ''),
         source: String(hadits.Nama || hadits.source || hadits.sumber || hadits.kitab || ''),
         id: String(hadits.id || '')
       };
       
       // Weight different fields differently
       const fieldWeights = {
         translation: 3.0,  // Highest weight for Indonesian translation
         arabic: 2.0,       // High weight for Arabic text
         narrator: 1.0,     // Medium weight for narrator
         source: 1.0,       // Medium weight for source
         id: 0.5           // Low weight for ID
       };
       
       // 1. Exact keyword matching
       Object.keys(searchFields).forEach(fieldName => {
         const fieldText = searchFields[fieldName].toLowerCase();
         const weight = fieldWeights[fieldName] || 1.0;
         
         keywords.forEach(keyword => {
           if (typeof keyword === 'string') {
             const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
             const matches = fieldText.match(regex);
             if (matches) {
               score += matches.length * weight * 2; // Exact word boundary matches get higher score
             }
             
             // Partial matches (less score)
             if (fieldText.includes(keyword)) {
               score += weight * 0.5;
             }
           }
         });
       });
       
       // 2. Semantic keyword matching (higher weight)
       Object.keys(searchFields).forEach(fieldName => {
         const fieldText = searchFields[fieldName].toLowerCase();
         const weight = fieldWeights[fieldName] || 1.0;
         
         semanticKeywords.forEach(keyword => {
           if (typeof keyword === 'string' && fieldText.includes(keyword)) {
             score += weight * 3; // Semantic matches get higher score
           }
         });
       });
       
       // 3. Special boost for specific question types
       const questionLower = originalQuestion.toLowerCase();
       const translationText = searchFields.translation.toLowerCase();
       
       // Boost for definition questions
       if (questionLower.includes('apa itu') || questionLower.includes('definisi') || questionLower.includes('pengertian')) {
         if (translationText.includes('adalah') || translationText.includes('yaitu') || translationText.includes('itu')) {
           score += 5;
         }
       }
       
       // Boost for Islam definition specifically
       if (questionLower.includes('islam')) {
         if (translationText.includes('islam adalah') || 
             translationText.includes('menyembah allah') || 
             translationText.includes('tidak menyekutukan') ||
             translationText.includes('shalat') && translationText.includes('zakat') && translationText.includes('puasa')) {
           score += 10; // High boost for Islam definition
         }
       }
       
       // Boost for Iman definition
       if (questionLower.includes('iman')) {
         if (translationText.includes('iman adalah') || 
             translationText.includes('beriman kepada allah') || 
             translationText.includes('malaikat') && translationText.includes('kitab') && translationText.includes('rasul')) {
           score += 10;
         }
       }
       
       // Boost for Ihsan definition
       if (questionLower.includes('ihsan')) {
         if (translationText.includes('ihsan') || 
             translationText.includes('menyembah allah seolah') || 
             translationText.includes('seolah melihat')) {
           score += 10;
         }
       }
       
       // 4. Authority boost based on source
       const source = searchFields.source.toLowerCase();
       if (source.includes('bukhari') || source.includes('muslim')) {
         score += 2; // Boost for most authentic sources
       }
       
       return score;
     } catch (error) {
       console.error('Error in calculateAdvancedRelevanceScore:', error);
       return 0;
     }
   }

   // Get detailed match information for debugging
   getMatchDetails(hadits, keywords, semanticKeywords) {
     // Validate inputs
     if (!hadits || typeof hadits !== 'object') {
       console.warn('getMatchDetails: Invalid hadits input:', hadits);
       return { keywordMatches: [], semanticMatches: [], fieldMatches: {} };
     }
     
     if (!Array.isArray(keywords)) keywords = [];
     if (!Array.isArray(semanticKeywords)) semanticKeywords = [];
     
     try {
       const searchFields = {
         arabic: String(hadits.Arab || hadits.text || hadits.arab || hadits.arabic || ''),
         translation: String(hadits.Terjemahan || hadits.translation || hadits.terjemahan || hadits.indonesian || ''),
         narrator: String(hadits.Perawi || hadits.narrator || hadits.perawi || ''),
         source: String(hadits.Nama || hadits.source || hadits.sumber || hadits.kitab || '')
       };
       
       const matches = {
         keywordMatches: [],
         semanticMatches: [],
         fieldMatches: {}
       };
       
       // Find keyword matches
       keywords.forEach(keyword => {
         if (typeof keyword === 'string') {
           Object.keys(searchFields).forEach(field => {
             if (searchFields[field].toLowerCase().includes(keyword)) {
               matches.keywordMatches.push({ keyword, field });
             }
           });
         }
       });
       
       // Find semantic matches
       semanticKeywords.forEach(keyword => {
         if (typeof keyword === 'string') {
           Object.keys(searchFields).forEach(field => {
             if (searchFields[field].toLowerCase().includes(keyword)) {
               matches.semanticMatches.push({ keyword, field });
             }
           });
         }
       });
       
       return matches;
     } catch (error) {
       console.error('Error in getMatchDetails:', error);
       return { keywordMatches: [], semanticMatches: [], fieldMatches: {} };
     }
   }

   formatHaditsForContext(hadits) {
     const formatted = [];
     
     hadits.forEach((item, index) => {
       let haditsText = `\n--- Hadits ${index + 1} ---\n`;
       
       // Use correct field mapping based on actual data structure
       const arabicText = item.Arab || item.text || item.arab || item.arabic || '';
       const translationText = item.Terjemahan || item.translation || item.terjemahan || item.indonesian || '';
       const narratorText = item.Perawi || item.narrator || item.perawi || '';
       const sourceText = item.Nama || item.source || item.sumber || item.kitab || '';
       
       if (arabicText) {
         haditsText += `Arab: ${arabicText}\n`;
       }
       
       if (translationText) {
         haditsText += `Terjemahan: ${translationText}\n`;
       }
       
       if (narratorText) {
         haditsText += `Perawi: ${narratorText}\n`;
       }
       
       if (sourceText) {
         haditsText += `Sumber: ${sourceText}\n`;
       }
       
       // Add relevance score for debugging
       if (item.relevanceScore) {
         haditsText += `Skor Relevansi: ${item.relevanceScore.toFixed(2)}\n`;
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