# Advanced Code Quality and Maintainability Improvements

## Current Issue: Gemini API Rate Limit Exceeded

### Problem Analysis
The application has exceeded the Gemini API free tier quota (50 requests per day per project per model). This indicates the need for better rate limiting and quota management.

## Immediate Improvements

### 1. Rate Limiting and Quota Management

#### A. Implement Request Throttling
```javascript
// Add to gemini-service.js
class RequestThrottler {
  constructor(maxRequestsPerDay = 45) { // Leave buffer for safety
    this.maxRequests = maxRequestsPerDay;
    this.requests = this.loadRequestHistory();
    this.resetDaily();
  }

  canMakeRequest() {
    this.cleanOldRequests();
    return this.requests.length < this.maxRequests;
  }

  recordRequest() {
    this.requests.push(Date.now());
    this.saveRequestHistory();
  }

  cleanOldRequests() {
    const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
    this.requests = this.requests.filter(time => time > oneDayAgo);
  }

  getRemainingRequests() {
    this.cleanOldRequests();
    return Math.max(0, this.maxRequests - this.requests.length);
  }

  loadRequestHistory() {
    try {
      const stored = localStorage.getItem('gemini_requests');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  saveRequestHistory() {
    localStorage.setItem('gemini_requests', JSON.stringify(this.requests));
  }
}
```

#### B. Enhanced Error Handling with Retry Logic
```javascript
// Improved error handling in gemini-service.js
async makeRequestWithRetry(prompt, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      if (!this.throttler.canMakeRequest()) {
        throw new Error('QUOTA_EXCEEDED');
      }

      const response = await this.gemini.generateContent(prompt);
      this.throttler.recordRequest();
      return response;

    } catch (error) {
      if (error.message === 'QUOTA_EXCEEDED') {
        throw new Error(`Quota exceeded. Remaining: ${this.throttler.getRemainingRequests()}`);
      }

      if (error.status === 429) {
        const retryAfter = this.extractRetryDelay(error) || (attempt * 2000);
        if (attempt < maxRetries) {
          await this.delay(retryAfter);
          continue;
        }
      }

      throw error;
    }
  }
}
```

### 2. Caching System for Responses

#### A. Intelligent Response Caching
```javascript
// Add to gemini-service.js
class ResponseCache {
  constructor(maxSize = 100, ttl = 24 * 60 * 60 * 1000) { // 24 hours
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttl = ttl;
  }

  generateKey(question) {
    // Normalize question for better cache hits
    return question.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  get(question) {
    const key = this.generateKey(question);
    const cached = this.cache.get(key);
    
    if (cached && (Date.now() - cached.timestamp) < this.ttl) {
      return cached.response;
    }
    
    if (cached) {
      this.cache.delete(key);
    }
    
    return null;
  }

  set(question, response) {
    const key = this.generateKey(question);
    
    // Implement LRU eviction
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    this.cache.set(key, {
      response,
      timestamp: Date.now()
    });
  }
}
```

### 3. Improved Fallback System

#### A. Enhanced Local Knowledge Base
```javascript
// Expand fallback responses with more comprehensive Islamic knowledge
const enhancedFallbackResponses = {
  sholat: {
    keywords: ['sholat', 'salat', 'sembahyang', 'solat'],
    responses: [
      {
        text: "Sholat adalah rukun Islam kedua yang wajib dilaksanakan 5 waktu sehari...",
        haditsUsed: [
          {
            text: "Sholat adalah tiang agama, barangsiapa yang menegakkannya maka ia telah menegakkan agama...",
            source: "HR. Baihaqi",
            narrator: "Umar bin Khattab"
          }
        ]
      }
    ]
  },
  // Add more comprehensive topics
};
```

### 4. User Experience Improvements

#### A. Quota Status Display
```javascript
// Add to ask-ai-view.js
renderQuotaStatus(remaining, total) {
  const percentage = (remaining / total) * 100;
  const statusColor = percentage > 50 ? '#28a745' : percentage > 20 ? '#ffc107' : '#dc3545';
  
  return `
    <div class="quota-status" style="margin-bottom: 16px; padding: 8px 12px; background: #f8f9fa; border-radius: 6px; border-left: 4px solid ${statusColor};">
      <div style="font-size: 12px; color: #666;">
        📊 API Quota: ${remaining}/${total} requests remaining today
      </div>
      <div style="width: 100%; height: 4px; background: #e9ecef; border-radius: 2px; margin-top: 4px;">
        <div style="width: ${percentage}%; height: 100%; background: ${statusColor}; border-radius: 2px; transition: width 0.3s ease;"></div>
      </div>
    </div>
  `;
}
```

#### B. Smart Question Suggestions
```javascript
// Add intelligent question suggestions based on available quota
getSuggestedQuestions(remainingQuota) {
  if (remainingQuota === 0) {
    return [
      "Bagaimana cara sholat yang benar?",
      "Apa itu zakat dan siapa yang wajib membayar?",
      "Kapan waktu puasa Ramadan?"
    ];
  }
  
  return [
    "Jelaskan tentang rukun Islam",
    "Bagaimana adab bertamu dalam Islam?",
    "Apa hikmah puasa Ramadan?"
  ];
}
```

### 5. Performance Optimizations

#### A. Lazy Loading for Hadith Dataset
```javascript
// Implement lazy loading for better initial load time
class LazyHadithLoader {
  constructor() {
    this.cache = new Map();
    this.loadPromises = new Map();
  }

  async loadCategory(category) {
    if (this.cache.has(category)) {
      return this.cache.get(category);
    }

    if (this.loadPromises.has(category)) {
      return this.loadPromises.get(category);
    }

    const promise = this.fetchCategoryData(category);
    this.loadPromises.set(category, promise);
    
    try {
      const data = await promise;
      this.cache.set(category, data);
      return data;
    } finally {
      this.loadPromises.delete(category);
    }
  }
}
```

#### B. Debounced Input Processing
```javascript
// Add input debouncing to prevent excessive API calls
class DebouncedProcessor {
  constructor(delay = 500) {
    this.delay = delay;
    this.timeoutId = null;
  }

  process(fn, ...args) {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => fn(...args), this.delay);
  }
}
```

### 6. Monitoring and Analytics

#### A. Usage Analytics
```javascript
// Track usage patterns for optimization
class UsageAnalytics {
  constructor() {
    this.metrics = {
      questionsAsked: 0,
      apiCallsSuccessful: 0,
      apiCallsFailed: 0,
      fallbackUsed: 0,
      averageResponseTime: 0
    };
  }

  trackQuestion(question, responseTime, wasSuccessful, usedFallback) {
    this.metrics.questionsAsked++;
    
    if (wasSuccessful) {
      this.metrics.apiCallsSuccessful++;
    } else {
      this.metrics.apiCallsFailed++;
    }
    
    if (usedFallback) {
      this.metrics.fallbackUsed++;
    }
    
    // Update average response time
    this.metrics.averageResponseTime = 
      (this.metrics.averageResponseTime + responseTime) / 2;
  }

  getReport() {
    return {
      ...this.metrics,
      successRate: (this.metrics.apiCallsSuccessful / this.metrics.questionsAsked) * 100,
      fallbackRate: (this.metrics.fallbackUsed / this.metrics.questionsAsked) * 100
    };
  }
}
```

## Implementation Priority

### High Priority (Immediate)
1. ✅ **Rate Limiting System** - Prevent quota exhaustion
2. ✅ **Enhanced Error Handling** - Better user experience during failures
3. ✅ **Response Caching** - Reduce API calls for similar questions

### Medium Priority (Next Sprint)
1. **Quota Status Display** - Show users remaining quota
2. **Enhanced Fallback System** - More comprehensive local responses
3. **Performance Optimizations** - Faster load times

### Low Priority (Future Enhancement)
1. **Usage Analytics** - Track and optimize usage patterns
2. **Advanced Caching Strategies** - Semantic similarity caching
3. **Offline Mode** - Full functionality without API

## Benefits

### User Experience
- ✅ **Transparent Quota Management** - Users know their limits
- ✅ **Faster Responses** - Caching reduces wait times
- ✅ **Reliable Fallbacks** - Always get helpful responses

### Developer Experience
- ✅ **Better Error Handling** - Easier debugging and monitoring
- ✅ **Modular Architecture** - Easier to maintain and extend
- ✅ **Performance Insights** - Data-driven optimization

### Business Value
- ✅ **Cost Optimization** - Efficient API usage
- ✅ **Scalability** - Ready for increased usage
- ✅ **User Retention** - Better experience even with limitations

## Next Steps

1. **Implement rate limiting system** to prevent future quota issues
2. **Add response caching** to reduce API dependency
3. **Enhance fallback responses** with more comprehensive Islamic knowledge
4. **Add quota monitoring** for better user awareness
5. **Consider upgrading to paid tier** for higher limits if usage justifies it

## Rate Limit Information

Based on the Gemini API documentation <mcreference link="https://ai.google.dev/gemini-api/docs/rate-limits" index="1">1</mcreference>, the free tier has the following limits:
- **50 requests per day** for Gemini 1.5 Flash model
- **Rate limits are applied per project**, not per API key
- **Upgrade options available** with billing account for higher tiers

Consider implementing the suggested improvements to optimize API usage and provide a better user experience even within quota constraints.