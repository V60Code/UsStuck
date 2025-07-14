/**
 * Quota Manager untuk Gemini API
 * Mengelola penggunaan API dengan limit 1,500 request/hari
 */

class QuotaManager {
  constructor() {
    // Gemini API Free Tier Limits (Updated 2024)
    this.maxDailyRequests = 1400; // Buffer 100 request dari 1500
    this.maxPerMinute = 14; // Buffer 1 dari 15 RPM
    this.storageKey = 'gemini_quota_tracker';
    this.minuteStorageKey = 'gemini_minute_tracker';
  }

  /**
   * Cek apakah bisa melakukan request (daily limit)
   */
  canMakeRequest() {
    const dailyUsage = this.getTodayUsage();
    const minuteUsage = this.getCurrentMinuteUsage();
    
    const canMakeDaily = dailyUsage.count < this.maxDailyRequests;
    const canMakePerMinute = minuteUsage.count < this.maxPerMinute;
    
    return {
      canMake: canMakeDaily && canMakePerMinute,
      dailyLimit: canMakeDaily,
      minuteLimit: canMakePerMinute,
      dailyRemaining: Math.max(0, this.maxDailyRequests - dailyUsage.count),
      minuteRemaining: Math.max(0, this.maxPerMinute - minuteUsage.count)
    };
  }

  /**
   * Record request yang telah dilakukan
   */
  recordRequest() {
    // Record daily usage
    const today = this.getToday();
    const dailyUsage = this.getTodayUsage();
    
    dailyUsage.count++;
    dailyUsage.lastRequest = Date.now();
    
    localStorage.setItem(this.storageKey, JSON.stringify({
      date: today,
      ...dailyUsage
    }));

    // Record minute usage
    const currentMinute = this.getCurrentMinute();
    const minuteUsage = this.getCurrentMinuteUsage();
    
    minuteUsage.count++;
    minuteUsage.lastRequest = Date.now();
    
    localStorage.setItem(this.minuteStorageKey, JSON.stringify({
      minute: currentMinute,
      ...minuteUsage
    }));

    console.log(`📊 API Usage - Daily: ${dailyUsage.count}/${this.maxDailyRequests}, Minute: ${minuteUsage.count}/${this.maxPerMinute}`);
  }

  /**
   * Get remaining quota
   */
  getRemainingQuota() {
    const dailyUsage = this.getTodayUsage();
    const minuteUsage = this.getCurrentMinuteUsage();
    
    return {
      daily: Math.max(0, this.maxDailyRequests - dailyUsage.count),
      minute: Math.max(0, this.maxPerMinute - minuteUsage.count),
      dailyTotal: this.maxDailyRequests,
      minuteTotal: this.maxPerMinute
    };
  }

  /**
   * Get usage statistics
   */
  getUsageStats() {
    const dailyUsage = this.getTodayUsage();
    const minuteUsage = this.getCurrentMinuteUsage();
    const remaining = this.getRemainingQuota();
    
    return {
      daily: {
        used: dailyUsage.count,
        remaining: remaining.daily,
        total: this.maxDailyRequests,
        percentage: (dailyUsage.count / this.maxDailyRequests * 100).toFixed(1),
        lastRequest: dailyUsage.lastRequest
      },
      minute: {
        used: minuteUsage.count,
        remaining: remaining.minute,
        total: this.maxPerMinute,
        percentage: (minuteUsage.count / this.maxPerMinute * 100).toFixed(1),
        lastRequest: minuteUsage.lastRequest
      },
      status: this.getQuotaStatus()
    };
  }

  /**
   * Get quota status (green/yellow/red)
   */
  getQuotaStatus() {
    const dailyUsage = this.getTodayUsage();
    const dailyPercentage = (dailyUsage.count / this.maxDailyRequests) * 100;
    
    if (dailyPercentage >= 90) return 'critical'; // Red
    if (dailyPercentage >= 70) return 'warning';  // Yellow
    return 'healthy'; // Green
  }

  /**
   * Cek apakah harus menggunakan cache/local response
   */
  shouldUseLocal(question) {
    const stats = this.getUsageStats();
    const remaining = stats.daily.remaining;
    
    // Gunakan local jika quota tinggal sedikit
    if (remaining < 100) return true;
    
    // Gunakan local untuk pertanyaan basic
    const basicKeywords = [
      'apa itu', 'pengertian', 'definisi', 'arti',
      'cara', 'bagaimana', 'langkah',
      'waktu', 'kapan', 'jam'
    ];
    
    const isBasicQuestion = basicKeywords.some(keyword => 
      question.toLowerCase().includes(keyword)
    );
    
    // Jika quota < 300 dan pertanyaan basic, gunakan local
    if (remaining < 300 && isBasicQuestion) return true;
    
    return false;
  }

  /**
   * Get today's usage
   */
  getTodayUsage() {
    const today = this.getToday();
    const stored = localStorage.getItem(this.storageKey);
    
    if (stored) {
      const data = JSON.parse(stored);
      if (data.date === today) {
        return { 
          count: data.count || 0, 
          lastRequest: data.lastRequest,
          firstRequest: data.firstRequest || data.lastRequest
        };
      }
    }
    
    return { count: 0, lastRequest: null, firstRequest: null };
  }

  /**
   * Get current minute's usage
   */
  getCurrentMinuteUsage() {
    const currentMinute = this.getCurrentMinute();
    const stored = localStorage.getItem(this.minuteStorageKey);
    
    if (stored) {
      const data = JSON.parse(stored);
      if (data.minute === currentMinute) {
        return { 
          count: data.count || 0, 
          lastRequest: data.lastRequest 
        };
      }
    }
    
    return { count: 0, lastRequest: null };
  }

  /**
   * Get today's date string
   */
  getToday() {
    return new Date().toISOString().split('T')[0];
  }

  /**
   * Get current minute string (YYYY-MM-DD-HH-MM)
   */
  getCurrentMinute() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}`;
  }

  /**
   * Wait if rate limit exceeded
   */
  async waitIfNeeded() {
    const canMake = this.canMakeRequest();
    
    if (!canMake.minuteLimit) {
      const waitTime = 60 - new Date().getSeconds();
      console.log(`⏳ Rate limit exceeded, waiting ${waitTime} seconds...`);
      await new Promise(resolve => setTimeout(resolve, waitTime * 1000));
    }
    
    return canMake.dailyLimit;
  }

  /**
   * Get time until quota reset
   */
  getTimeUntilReset() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const msUntilReset = tomorrow.getTime() - now.getTime();
    const hoursUntilReset = Math.floor(msUntilReset / (1000 * 60 * 60));
    const minutesUntilReset = Math.floor((msUntilReset % (1000 * 60 * 60)) / (1000 * 60));
    
    return {
      hours: hoursUntilReset,
      minutes: minutesUntilReset,
      totalMs: msUntilReset
    };
  }

  /**
   * Reset quota (untuk testing)
   */
  resetQuota() {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.minuteStorageKey);
    console.log('🔄 Quota reset');
  }

  /**
   * Get quota usage history (last 7 days)
   */
  getUsageHistory() {
    const history = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      // Try to get usage for this date
      const stored = localStorage.getItem(`${this.storageKey}_${dateStr}`);
      const usage = stored ? JSON.parse(stored).count || 0 : 0;
      
      history.push({
        date: dateStr,
        usage: usage,
        percentage: (usage / this.maxDailyRequests * 100).toFixed(1)
      });
    }
    
    return history;
  }

  /**
   * Export usage data
   */
  exportUsageData() {
    return {
      daily: this.getTodayUsage(),
      stats: this.getUsageStats(),
      history: this.getUsageHistory(),
      limits: {
        dailyMax: this.maxDailyRequests,
        minuteMax: this.maxPerMinute
      },
      exportDate: new Date().toISOString()
    };
  }
}

export default QuotaManager;