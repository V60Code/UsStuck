/**
 * Smart Cache System untuk Gemini API
 * Menghemat penggunaan API dengan caching response dan similarity matching
 */

class SmartCache {
  constructor() {
    this.cacheKey = 'islamic_qa_cache';
    this.maxCacheSize = 200; // Simpan 200 Q&A
    this.cacheDuration = 7 * 24 * 60 * 60 * 1000; // 7 hari
    this.similarityThreshold = 0.7; // Threshold untuk similarity matching
  }

  /**
   * Normalize pertanyaan untuk cache hit yang lebih baik
   */
  normalizeQuestion(question) {
    return question
      .toLowerCase()
      .replace(/[^\w\s]/g, '') // Hapus tanda baca
      .replace(/\s+/g, ' ')    // Normalize spasi
      .trim()
      // Sinonim umum
      .replace(/bagaimana|gimana|caranya/g, 'cara')
      .replace(/apa itu|apakah/g, 'apa')
      .replace(/kapan|bilamana/g, 'waktu')
      .replace(/dimana|di mana/g, 'tempat')
      .replace(/mengapa|kenapa/g, 'sebab');
  }

  /**
   * Hitung similarity antara dua string menggunakan Jaccard similarity
   */
  calculateSimilarity(str1, str2) {
    const words1 = new Set(str1.split(' ').filter(word => word.length > 2));
    const words2 = new Set(str2.split(' ').filter(word => word.length > 2));
    
    const intersection = new Set([...words1].filter(x => words2.has(x)));
    const union = new Set([...words1, ...words2]);
    
    return intersection.size / union.size;
  }

  /**
   * Cari jawaban dari cache (exact match atau similarity)
   */
  findCachedResponse(question) {
    const cache = this.getCache();
    const normalizedQ = this.normalizeQuestion(question);
    
    // 1. Exact match
    if (cache[normalizedQ]) {
      console.log('🎯 Cache HIT (exact):', normalizedQ);
      return {
        ...cache[normalizedQ],
        fromCache: true,
        cacheType: 'exact'
      };
    }
    
    // 2. Similarity match
    let bestMatch = null;
    let highestScore = 0;
    
    for (const [cachedQ, response] of Object.entries(cache)) {
      const similarity = this.calculateSimilarity(normalizedQ, cachedQ);
      
      if (similarity > this.similarityThreshold && similarity > highestScore) {
        highestScore = similarity;
        bestMatch = {
          ...response,
          fromCache: true,
          cacheType: 'similarity',
          similarity: similarity
        };
      }
    }
    
    if (bestMatch) {
      console.log(`🎯 Cache HIT (similarity: ${(highestScore * 100).toFixed(1)}%):`, normalizedQ);
      return bestMatch;
    }
    
    console.log('❌ Cache MISS:', normalizedQ);
    return null;
  }

  /**
   * Simpan response ke cache
   */
  saveResponse(question, response) {
    try {
      const cache = this.getCache();
      const normalizedQ = this.normalizeQuestion(question);
      
      // Jangan simpan jika sudah ada
      if (cache[normalizedQ]) {
        return;
      }
      
      cache[normalizedQ] = {
        response,
        timestamp: Date.now(),
        originalQuestion: question,
        accessCount: 1
      };
      
      // Cleanup cache jika melebihi limit
      this.cleanupCache(cache);
      
      localStorage.setItem(this.cacheKey, JSON.stringify(cache));
      console.log('💾 Response cached:', normalizedQ);
      
    } catch (error) {
      console.error('Error saving to cache:', error);
    }
  }

  /**
   * Get cache dari localStorage
   */
  getCache() {
    try {
      const cached = localStorage.getItem(this.cacheKey);
      return cached ? JSON.parse(cached) : {};
    } catch (error) {
      console.error('Error reading cache:', error);
      return {};
    }
  }

  /**
   * Cleanup cache - hapus yang expired dan batasi jumlah
   */
  cleanupCache(cache) {
    const entries = Object.entries(cache);
    const now = Date.now();
    
    // 1. Hapus yang expired
    const validEntries = entries.filter(([_, data]) => 
      (now - data.timestamp) < this.cacheDuration
    );
    
    // 2. Jika masih terlalu banyak, hapus yang paling jarang diakses
    if (validEntries.length > this.maxCacheSize) {
      validEntries.sort((a, b) => {
        // Sort by access count (descending) then by timestamp (descending)
        const accessDiff = (b[1].accessCount || 1) - (a[1].accessCount || 1);
        if (accessDiff !== 0) return accessDiff;
        return b[1].timestamp - a[1].timestamp;
      });
      
      validEntries.splice(this.maxCacheSize);
    }
    
    // Update cache
    const cleanedCache = Object.fromEntries(validEntries);
    localStorage.setItem(this.cacheKey, JSON.stringify(cleanedCache));
    
    return cleanedCache;
  }

  /**
   * Update access count untuk cache entry
   */
  updateAccessCount(question) {
    try {
      const cache = this.getCache();
      const normalizedQ = this.normalizeQuestion(question);
      
      if (cache[normalizedQ]) {
        cache[normalizedQ].accessCount = (cache[normalizedQ].accessCount || 1) + 1;
        cache[normalizedQ].lastAccess = Date.now();
        localStorage.setItem(this.cacheKey, JSON.stringify(cache));
      }
    } catch (error) {
      console.error('Error updating access count:', error);
    }
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    const cache = this.getCache();
    const entries = Object.entries(cache);
    const now = Date.now();
    
    const validEntries = entries.filter(([_, data]) => 
      (now - data.timestamp) < this.cacheDuration
    );
    
    return {
      totalEntries: entries.length,
      validEntries: validEntries.length,
      expiredEntries: entries.length - validEntries.length,
      cacheSize: this.maxCacheSize,
      utilizationPercent: (validEntries.length / this.maxCacheSize * 100).toFixed(1),
      oldestEntry: validEntries.length > 0 ? 
        Math.min(...validEntries.map(([_, data]) => data.timestamp)) : null,
      newestEntry: validEntries.length > 0 ? 
        Math.max(...validEntries.map(([_, data]) => data.timestamp)) : null
    };
  }

  /**
   * Clear cache (untuk testing atau maintenance)
   */
  clearCache() {
    localStorage.removeItem(this.cacheKey);
    console.log('🗑️ Cache cleared');
  }

  /**
   * Export cache untuk backup
   */
  exportCache() {
    return this.getCache();
  }

  /**
   * Import cache dari backup
   */
  importCache(cacheData) {
    try {
      localStorage.setItem(this.cacheKey, JSON.stringify(cacheData));
      console.log('📥 Cache imported successfully');
      return true;
    } catch (error) {
      console.error('Error importing cache:', error);
      return false;
    }
  }
}

export default SmartCache;