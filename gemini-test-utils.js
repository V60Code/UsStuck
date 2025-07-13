// 🧪 ENHANCED GEMINI TESTING UTILITIES
// Paste this in browser console for comprehensive testing

console.log('🧪 Loading Enhanced Gemini Testing Utilities...');

// Global testing object
window.GeminiTest = {
  
  // Test 1: Configuration Check
  async testConfig() {
    console.log('🔧 Testing Configuration...');
    
    try {
      // Try to import config
      const { default: CONFIG } = await import('./src/scripts/config.js');
      
      const results = {
        hasConfig: !!CONFIG,
        hasGeminiConfig: !!CONFIG.GEMINI,
        apiKey: CONFIG.GEMINI?.API_KEY ? 'Present' : 'Missing',
        apiKeyLength: CONFIG.GEMINI?.API_KEY?.length || 0,
        model: CONFIG.GEMINI?.MODEL || 'Not set',
        baseUrl: CONFIG.GEMINI?.BASE_URL || 'Not set',
        isValidApiKey: CONFIG.GEMINI?.API_KEY && CONFIG.GEMINI.API_KEY !== 'YOUR_API_KEY_HERE'
      };
      
      console.log('✅ Configuration Results:', results);
      return results;
      
    } catch (error) {
      console.error('❌ Configuration Test Failed:', error);
      return { error: error.message };
    }
  },

  // Test 2: Direct API Call
  async testDirectAPI() {
    console.log('📡 Testing Direct API Call...');
    
    try {
      const apiKey = 'AIzaSyDBltsYy8WI1wATuco1XosChzJu5IqZias';
      const model = 'gemini-1.5-flash';
      const url = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`;
      
      const requestBody = {
        contents: [{
          parts: [{
            text: "Assalamu'alaikum, test koneksi API. Jawab singkat dalam bahasa Indonesia."
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 100,
        }
      };

      console.log('📤 Sending request to:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      
      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        const responseText = data.candidates[0].content.parts[0].text;
        console.log('✅ Direct API Test SUCCESS!');
        console.log('🤖 Response:', responseText);
        return { success: true, response: responseText };
      } else {
        console.error('❌ Invalid response format:', data);
        return { success: false, error: 'Invalid response format', data };
      }
      
    } catch (error) {
      console.error('❌ Direct API Test Failed:', error);
      return { success: false, error: error.message };
    }
  },

  // Test 3: Dataset Service
  async testDatasetService() {
    console.log('📚 Testing Dataset Service...');
    
    try {
      const { default: DatasetService } = await import('./src/scripts/services/dataset-service.js');
      
      const service = new DatasetService();
      const loadResult = await service.loadHaditsDataset();
      const stats = service.getDatasetStats();
      
      console.log('✅ Dataset Service Results:', {
        loadResult,
        stats,
        isLoaded: service.isLoaded()
      });
      
      return { success: true, loadResult, stats };
      
    } catch (error) {
      console.error('❌ Dataset Service Test Failed:', error);
      return { success: false, error: error.message };
    }
  },

  // Test 4: Gemini Service
  async testGeminiService() {
    console.log('🤖 Testing Gemini Service...');
    
    try {
      const { default: GeminiService } = await import('./src/scripts/services/gemini-service.js');
      
      const service = new GeminiService();
      
      console.log('🔄 Initializing service...');
      const initResult = await service.initialize();
      
      console.log('📊 Getting status...');
      const status = service.getStatus();
      
      console.log('🔗 Testing connection...');
      const connectionTest = await service.testConnection();
      
      const results = {
        initialized: initResult,
        status,
        connectionTest
      };
      
      console.log('✅ Gemini Service Results:', results);
      return { success: true, results };
      
    } catch (error) {
      console.error('❌ Gemini Service Test Failed:', error);
      return { success: false, error: error.message };
    }
  },

  // Test 5: Full Integration Test
  async testFullIntegration() {
    console.log('🎯 Running Full Integration Test...');
    
    const results = {
      config: await this.testConfig(),
      directAPI: await this.testDirectAPI(),
      dataset: await this.testDatasetService(),
      geminiService: await this.testGeminiService()
    };
    
    const summary = {
      configOK: !results.config.error && results.config.isValidApiKey,
      apiOK: results.directAPI.success,
      datasetOK: results.dataset.success && results.dataset.stats?.isLoaded,
      serviceOK: results.geminiService.success && results.geminiService.results?.connectionTest?.success
    };
    
    const allOK = Object.values(summary).every(Boolean);
    
    console.log('📋 Integration Test Summary:', summary);
    console.log(allOK ? '🎉 ALL TESTS PASSED!' : '⚠️ Some tests failed');
    
    return { results, summary, allOK };
  },

  // Test 6: Performance Test
  async testPerformance() {
    console.log('⚡ Running Performance Test...');
    
    const start = performance.now();
    
    try {
      const result = await this.testDirectAPI();
      const end = performance.now();
      const duration = end - start;
      
      console.log(`⏱️ API Response Time: ${duration.toFixed(2)}ms`);
      
      return {
        success: result.success,
        responseTime: duration,
        performance: duration < 5000 ? 'Good' : duration < 10000 ? 'Fair' : 'Slow'
      };
      
    } catch (error) {
      const end = performance.now();
      const duration = end - start;
      
      console.error('❌ Performance Test Failed:', error);
      return { success: false, error: error.message, responseTime: duration };
    }
  },

  // Utility: Run All Tests
  async runAllTests() {
    console.log('🚀 Running All Tests...');
    
    const testResults = {
      config: await this.testConfig(),
      directAPI: await this.testDirectAPI(),
      dataset: await this.testDatasetService(),
      geminiService: await this.testGeminiService(),
      performance: await this.testPerformance(),
      integration: await this.testFullIntegration()
    };
    
    console.log('📊 Complete Test Results:', testResults);
    
    // Generate report
    const report = this.generateReport(testResults);
    console.log('📄 Test Report:', report);
    
    return testResults;
  },

  // Generate human-readable report
  generateReport(results) {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        configurationOK: !results.config.error,
        apiConnectionOK: results.directAPI.success,
        datasetLoadingOK: results.dataset.success,
        geminiServiceOK: results.geminiService.success,
        performanceOK: results.performance.success && results.performance.responseTime < 10000
      },
      recommendations: []
    };
    
    // Add recommendations based on results
    if (!report.summary.configurationOK) {
      report.recommendations.push('Check API key configuration');
    }
    
    if (!report.summary.apiConnectionOK) {
      report.recommendations.push('Check internet connection and API endpoint');
    }
    
    if (!report.summary.datasetLoadingOK) {
      report.recommendations.push('Check hadits.json file location and format');
    }
    
    if (!report.summary.geminiServiceOK) {
      report.recommendations.push('Check Gemini service initialization');
    }
    
    if (!report.summary.performanceOK) {
      report.recommendations.push('API response is slow, consider optimization');
    }
    
    if (report.recommendations.length === 0) {
      report.recommendations.push('All systems working correctly! 🎉');
    }
    
    return report;
  }
};

// Auto-run basic test
console.log('🎯 Auto-running basic configuration test...');
GeminiTest.testConfig().then(result => {
  if (result.isValidApiKey) {
    console.log('✅ Configuration looks good! Run GeminiTest.runAllTests() for complete testing.');
  } else {
    console.log('⚠️ Configuration issues detected. Run GeminiTest.testConfig() for details.');
  }
});

console.log(`
🧪 Gemini Testing Utilities Loaded!

Available commands:
- GeminiTest.testConfig()         - Test configuration
- GeminiTest.testDirectAPI()      - Test direct API call
- GeminiTest.testDatasetService() - Test dataset loading
- GeminiTest.testGeminiService()  - Test Gemini service
- GeminiTest.testPerformance()    - Test API performance
- GeminiTest.runAllTests()        - Run all tests

Example: GeminiTest.runAllTests()
`);

export default GeminiTest;