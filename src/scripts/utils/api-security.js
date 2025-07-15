// API Security utilities untuk UsStuck

/**
 * Validasi format dan keberadaan API key
 * @returns {boolean} - true jika API key valid
 */
export const validateApiKey = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error('❌ GEMINI API KEY not found in environment variables');
    console.error('💡 Please check your .env file or Netlify environment variables');
    return false;
  }
  
  if (apiKey === 'YOUR_API_KEY_HERE' || apiKey === 'your_actual_api_key_here') {
    console.error('❌ Please replace placeholder API key with actual key');
    return false;
  }
  
  // Validasi format API key Gemini
  if (apiKey.startsWith('AIza') && apiKey.length === 39) {
    console.log('✅ Valid Gemini API key format detected');
    return true;
  }
  
  console.warn('⚠️ API key format might be invalid');
  console.warn('Expected: AIza... (39 characters)');
  console.warn(`Received: ${apiKey.substring(0, 8)}... (${apiKey.length} characters)`);
  return false;
};

/**
 * Rate limiter untuk mencegah spam API calls
 */
export const rateLimiter = {
  requests: [],
  maxRequests: 10, // Maximum 10 requests
  timeWindow: 60000, // per 1 minute
  
  /**
   * Check apakah request bisa dilakukan
   * @returns {boolean} - true jika bisa request
   */
  canMakeRequest() {
    const now = Date.now();
    
    // Filter requests yang masih dalam time window
    this.requests = this.requests.filter(time => now - time < this.timeWindow);
    
    if (this.requests.length >= this.maxRequests) {
      console.warn('⚠️ Rate limit exceeded. Please wait before making more requests.');
      return false;
    }
    
    this.requests.push(now);
    return true;
  },
  
  /**
   * Get remaining requests
   * @returns {number} - jumlah request yang tersisa
   */
  getRemainingRequests() {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.timeWindow);
    return Math.max(0, this.maxRequests - this.requests.length);
  },
  
  /**
   * Get time until next request available (in seconds)
   * @returns {number} - waktu tunggu dalam detik
   */
  getTimeUntilReset() {
    if (this.requests.length === 0) return 0;
    
    const oldestRequest = Math.min(...this.requests);
    const timeUntilReset = Math.max(0, this.timeWindow - (Date.now() - oldestRequest));
    return Math.ceil(timeUntilReset / 1000);
  }
};

/**
 * Sanitize user input untuk mencegah injection
 * @param {string} input - user input
 * @returns {string} - sanitized input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') {
    return '';
  }
  
  return input
    .trim()
    .replace(/[<>"'&]/g, '') // Remove potentially dangerous characters
    .substring(0, 1000); // Limit length
};

/**
 * Log API usage untuk monitoring
 * @param {string} endpoint - API endpoint yang dipanggil
 * @param {boolean} success - apakah request berhasil
 * @param {number} responseTime - waktu response dalam ms
 */
export const logApiUsage = (endpoint, success, responseTime) => {
  const timestamp = new Date().toISOString();
  const logData = {
    timestamp,
    endpoint,
    success,
    responseTime,
    remaining: rateLimiter.getRemainingRequests()
  };
  
  // Log ke console untuk development
  if (import.meta.env.DEV) {
    console.log('📊 API Usage:', logData);
  }
  
  // Bisa ditambahkan analytics tracking di sini
};

/**
 * Check environment dan berikan warning jika ada masalah
 */
export const checkEnvironment = () => {
  const issues = [];
  
  // Check API key
  if (!validateApiKey()) {
    issues.push('Invalid or missing Gemini API key');
  }
  
  // Check base URL
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  if (!baseUrl || !baseUrl.startsWith('https://')) {
    issues.push('Invalid or missing API base URL');
  }
  
  // Check development vs production
  if (import.meta.env.DEV) {
    console.log('🔧 Running in development mode');
  } else {
    console.log('🚀 Running in production mode');
  }
  
  if (issues.length > 0) {
    console.error('🚨 Environment Issues Found:');
    issues.forEach(issue => console.error(`  - ${issue}`));
    return false;
  }
  
  console.log('✅ Environment check passed');
  return true;
};

// Auto-check environment saat module di-import
if (typeof window !== 'undefined') {
  // Delay check untuk memastikan environment variables sudah loaded
  setTimeout(checkEnvironment, 100);
}