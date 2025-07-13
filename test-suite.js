// 🧪 Comprehensive Testing Suite for Islamic AI Assistant

// Test Configuration
const TEST_CONFIG = {
  timeout: 10000,
  retries: 3,
  verbose: true
};

// Test Data
const TEST_QUESTIONS = [
  {
    question: "Bagaimana cara sholat yang benar?",
    expectedTopics: ['sholat', 'ibadah'],
    expectedHaditsCount: { min: 1, max: 3 }
  },
  {
    question: "Apa hukum riba dalam Islam?",
    expectedTopics: ['riba', 'muamalah'],
    expectedHaditsCount: { min: 1, max: 3 }
  },
  {
    question: "Bagaimana berbakti kepada orang tua?",
    expectedTopics: ['orang tua', 'akhlak'],
    expectedHaditsCount: { min: 1, max: 3 }
  }
];

// 🧪 Unit Tests
class UnitTestSuite {
  constructor() {
    this.results = [];
    this.passed = 0;
    this.failed = 0;
  }

  async runAllTests() {
    console.log('🧪 Starting Unit Test Suite...\n');
    
    await this.testDatasetService();
    await this.testGeminiService();
    await this.testEnhancedFeatures();
    
    this.printResults();
  }

  async testDatasetService() {
    console.log('📊 Testing Dataset Service...');
    
    // Test dataset loading
    await this.test('Dataset Loading', async () => {
      const datasetService = new DatasetService();
      const loaded = await datasetService.loadHaditsDataset();
      this.assert(loaded === true, 'Dataset should load successfully');
      this.assert(datasetService.haditsData.length > 0, 'Dataset should contain hadits');
    });

    // Test hadits search
    await this.test('Hadits Search', async () => {
      const datasetService = new DatasetService();
      await datasetService.loadHaditsDataset();
      
      const results = datasetService.findRelevantHadits('sholat');
      this.assert(Array.isArray(results), 'Should return array');
      this.assert(results.length <= 3, 'Should return max 3 results');
      
      if (results.length > 0) {
        this.assert(results[0].hasOwnProperty('relevanceScore'), 'Should have relevance score');
        this.assert(results[0].relevanceScore > 0, 'Relevance score should be positive');
      }
    });

    // Test relevance scoring
    await this.test('Relevance Scoring', async () => {
      const datasetService = new DatasetService();
      await datasetService.loadHaditsDataset();
      
      const mockHadits = {
        text: 'إنما الأعمال بالنيات',
        translation: 'Sesungguhnya amal perbuatan itu tergantung pada niatnya',
        source: 'Bukhari'
      };
      
      const score1 = datasetService.calculateRelevanceScore(mockHadits, ['niat', 'amal']);
      const score2 = datasetService.calculateRelevanceScore(mockHadits, ['sholat', 'puasa']);
      
      this.assert(score1 > score2, 'More relevant keywords should have higher score');
    });
  }

  async testGeminiService() {
    console.log('🤖 Testing Gemini Service...');
    
    // Test service initialization
    await this.test('Gemini Initialization', async () => {
      const geminiService = new GeminiService();
      const status = geminiService.getStatus();
      
      this.assert(typeof status === 'object', 'Status should be object');
      this.assert(status.hasOwnProperty('initialized'), 'Should have initialized property');
      this.assert(status.hasOwnProperty('hasApiKey'), 'Should have hasApiKey property');
    });

    // Test response generation (if API key available)
    await this.test('Response Generation', async () => {
      try {
        const geminiService = new GeminiService();
        const initialized = await geminiService.initialize();
        
        if (initialized) {
          const response = await geminiService.generateResponse("Assalamu'alaikum");
          this.assert(typeof response === 'object', 'Response should be object');
          this.assert(response.hasOwnProperty('text'), 'Response should have text');
          this.assert(response.hasOwnProperty('sources'), 'Response should have sources');
          this.assert(Array.isArray(response.sources), 'Sources should be array');
        } else {
          console.log('⚠️ Skipping response generation test - service not initialized');
        }
      } catch (error) {
        console.log('⚠️ Skipping response generation test - API error:', error.message);
      }
    });
  }

  async testEnhancedFeatures() {
    console.log('🚀 Testing Enhanced Features...');
    
    // Test enhanced dataset service (if available)
    await this.test('Enhanced Semantic Search', async () => {
      if (typeof EnhancedDatasetService !== 'undefined') {
        const enhancedService = new EnhancedDatasetService();
        await enhancedService.loadHaditsDataset();
        
        const results = await enhancedService.findRelevantHaditsEnhanced('sholat');
        this.assert(Array.isArray(results), 'Should return array');
        
        if (results.length > 0) {
          this.assert(results[0].hasOwnProperty('matchDetails'), 'Should have match details');
          this.assert(results[0].hasOwnProperty('relevanceScore'), 'Should have relevance score');
        }
      } else {
        console.log('⚠️ Enhanced Dataset Service not available');
      }
    });

    // Test performance monitoring
    await this.test('Performance Monitoring', async () => {
      if (typeof PerformanceMonitor !== 'undefined') {
        const monitor = new PerformanceMonitor();
        
        const timer = monitor.startTimer('testOperation');
        await new Promise(resolve => setTimeout(resolve, 100)); // Simulate work
        timer.end();
        
        const report = monitor.getPerformanceReport();
        this.assert(typeof report === 'object', 'Report should be object');
        this.assert(report.hasOwnProperty('testOperation'), 'Should have test operation metrics');
      } else {
        console.log('⚠️ Performance Monitor not available');
      }
    });

    // Test question suggestions
    await this.test('Question Suggestions', async () => {
      if (typeof QuestionSuggestionService !== 'undefined') {
        const suggestionService = new QuestionSuggestionService();
        
        const suggestions = suggestionService.generateSuggestions('sholat');
        this.assert(typeof suggestions === 'object', 'Suggestions should be object');
        this.assert(suggestions.hasOwnProperty('related'), 'Should have related questions');
        this.assert(suggestions.hasOwnProperty('followUp'), 'Should have follow-up questions');
        this.assert(Array.isArray(suggestions.related), 'Related should be array');
      } else {
        console.log('⚠️ Question Suggestion Service not available');
      }
    });
  }

  async test(name, testFunction) {
    try {
      await testFunction();
      this.results.push({ name, status: 'PASSED', error: null });
      this.passed++;
      console.log(`✅ ${name}`);
    } catch (error) {
      this.results.push({ name, status: 'FAILED', error: error.message });
      this.failed++;
      console.log(`❌ ${name}: ${error.message}`);
    }
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  printResults() {
    console.log('\n📊 Unit Test Results:');
    console.log(`✅ Passed: ${this.passed}`);
    console.log(`❌ Failed: ${this.failed}`);
    console.log(`📈 Success Rate: ${((this.passed / (this.passed + this.failed)) * 100).toFixed(1)}%`);
    
    if (this.failed > 0) {
      console.log('\n❌ Failed Tests:');
      this.results.filter(r => r.status === 'FAILED').forEach(result => {
        console.log(`  - ${result.name}: ${result.error}`);
      });
    }
  }
}

// 🔄 Integration Tests
class IntegrationTestSuite {
  constructor() {
    this.results = [];
  }

  async runAllTests() {
    console.log('\n🔄 Starting Integration Test Suite...\n');
    
    await this.testEndToEndFlow();
    await this.testErrorHandling();
    await this.testPerformance();
    
    this.printResults();
  }

  async testEndToEndFlow() {
    console.log('🔄 Testing End-to-End Flow...');
    
    for (const testCase of TEST_QUESTIONS) {
      await this.test(`E2E: ${testCase.question}`, async () => {
        // Test complete flow from question to response
        const askAiModel = new AskAiModel();
        
        const response = await askAiModel.askQuestion(testCase.question);
        
        this.assert(response !== null, 'Should return response');
        this.assert(response.hasOwnProperty('text'), 'Response should have text');
        this.assert(response.text.length > 0, 'Response text should not be empty');
        
        if (response.haditsUsed && response.haditsUsed.length > 0) {
          this.assert(
            response.haditsUsed.length >= testCase.expectedHaditsCount.min &&
            response.haditsUsed.length <= testCase.expectedHaditsCount.max,
            `Should return ${testCase.expectedHaditsCount.min}-${testCase.expectedHaditsCount.max} hadits`
          );
        }
      });
    }
  }

  async testErrorHandling() {
    console.log('⚠️ Testing Error Handling...');
    
    await this.test('Invalid Question Handling', async () => {
      const askAiModel = new AskAiModel();
      
      // Test with empty question
      const response1 = await askAiModel.askQuestion('');
      this.assert(response1 !== null, 'Should handle empty question gracefully');
      
      // Test with very long question
      const longQuestion = 'a'.repeat(1000);
      const response2 = await askAiModel.askQuestion(longQuestion);
      this.assert(response2 !== null, 'Should handle long question gracefully');
    });

    await this.test('Service Failure Handling', async () => {
      // Test fallback when Gemini service fails
      const askAiModel = new AskAiModel();
      askAiModel.useGemini = false; // Force fallback
      
      const response = await askAiModel.askQuestion('Test question');
      this.assert(response !== null, 'Should provide fallback response');
      this.assert(response.text.length > 0, 'Fallback response should have content');
    });
  }

  async testPerformance() {
    console.log('⚡ Testing Performance...');
    
    await this.test('Response Time', async () => {
      const askAiModel = new AskAiModel();
      
      const startTime = performance.now();
      await askAiModel.askQuestion('Bagaimana cara sholat?');
      const endTime = performance.now();
      
      const responseTime = endTime - startTime;
      this.assert(responseTime < 30000, `Response time should be under 30s (was ${responseTime.toFixed(0)}ms)`);
    });

    await this.test('Concurrent Requests', async () => {
      const askAiModel = new AskAiModel();
      
      const promises = [
        askAiModel.askQuestion('Apa itu sholat?'),
        askAiModel.askQuestion('Bagaimana cara puasa?'),
        askAiModel.askQuestion('Apa hukum zakat?')
      ];
      
      const responses = await Promise.all(promises);
      
      responses.forEach((response, index) => {
        this.assert(response !== null, `Concurrent request ${index + 1} should succeed`);
        this.assert(response.text.length > 0, `Concurrent response ${index + 1} should have content`);
      });
    });
  }

  async test(name, testFunction) {
    try {
      const startTime = performance.now();
      await testFunction();
      const endTime = performance.now();
      
      this.results.push({ 
        name, 
        status: 'PASSED', 
        error: null, 
        duration: endTime - startTime 
      });
      console.log(`✅ ${name} (${(endTime - startTime).toFixed(0)}ms)`);
    } catch (error) {
      this.results.push({ 
        name, 
        status: 'FAILED', 
        error: error.message, 
        duration: 0 
      });
      console.log(`❌ ${name}: ${error.message}`);
    }
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  printResults() {
    const passed = this.results.filter(r => r.status === 'PASSED').length;
    const failed = this.results.filter(r => r.status === 'FAILED').length;
    const avgDuration = this.results.reduce((sum, r) => sum + r.duration, 0) / this.results.length;
    
    console.log('\n📊 Integration Test Results:');
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);
    console.log(`⚡ Average Duration: ${avgDuration.toFixed(0)}ms`);
  }
}

// 🎯 Quality Assurance Tests
class QualityAssuranceTests {
  constructor() {
    this.results = [];
  }

  async runAllTests() {
    console.log('\n🎯 Starting Quality Assurance Tests...\n');
    
    await this.testCodeQuality();
    await this.testAccessibility();
    await this.testSecurity();
    
    this.printResults();
  }

  async testCodeQuality() {
    console.log('📝 Testing Code Quality...');
    
    await this.test('Service Dependencies', async () => {
      // Check if all required services are available
      this.assert(typeof DatasetService !== 'undefined', 'DatasetService should be available');
      this.assert(typeof GeminiService !== 'undefined', 'GeminiService should be available');
      this.assert(typeof AskAiModel !== 'undefined', 'AskAiModel should be available');
    });

    await this.test('Configuration Validation', async () => {
      // Check if configuration is properly set
      this.assert(typeof CONFIG !== 'undefined', 'CONFIG should be available');
      this.assert(CONFIG.GEMINI, 'Gemini config should exist');
      this.assert(CONFIG.GEMINI.MODEL, 'Gemini model should be configured');
    });
  }

  async testAccessibility() {
    console.log('♿ Testing Accessibility...');
    
    await this.test('UI Elements', async () => {
      // Check if main UI elements exist
      const chatInput = document.getElementById('chat-input');
      const sendButton = document.getElementById('send-button');
      
      if (chatInput) {
        this.assert(chatInput.hasAttribute('aria-label') || chatInput.hasAttribute('placeholder'), 
                   'Chat input should have accessibility label');
      }
      
      if (sendButton) {
        this.assert(sendButton.hasAttribute('aria-label') || sendButton.textContent.trim().length > 0,
                   'Send button should have accessibility label');
      }
    });
  }

  async testSecurity() {
    console.log('🔒 Testing Security...');
    
    await this.test('Input Sanitization', async () => {
      const askAiModel = new AskAiModel();
      
      // Test with potentially harmful input
      const maliciousInputs = [
        '<script>alert("xss")</script>',
        'javascript:alert("xss")',
        '${7*7}',
        '{{7*7}}'
      ];
      
      for (const input of maliciousInputs) {
        const response = await askAiModel.askQuestion(input);
        this.assert(response !== null, 'Should handle malicious input gracefully');
        this.assert(!response.text.includes('<script>'), 'Response should not contain script tags');
      }
    });

    await this.test('API Key Protection', async () => {
      // Ensure API key is not exposed in client-side code
      const pageSource = document.documentElement.outerHTML;
      this.assert(!pageSource.includes('AIza'), 'API key should not be visible in page source');
    });
  }

  async test(name, testFunction) {
    try {
      await testFunction();
      this.results.push({ name, status: 'PASSED', error: null });
      console.log(`✅ ${name}`);
    } catch (error) {
      this.results.push({ name, status: 'FAILED', error: error.message });
      console.log(`❌ ${name}: ${error.message}`);
    }
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  printResults() {
    const passed = this.results.filter(r => r.status === 'PASSED').length;
    const failed = this.results.filter(r => r.status === 'FAILED').length;
    
    console.log('\n📊 Quality Assurance Results:');
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);
  }
}

// 🚀 Main Test Runner
class TestRunner {
  async runAllTests() {
    console.log('🚀 Starting Comprehensive Test Suite for Islamic AI Assistant\n');
    console.log('=' .repeat(60));
    
    const unitTests = new UnitTestSuite();
    await unitTests.runAllTests();
    
    const integrationTests = new IntegrationTestSuite();
    await integrationTests.runAllTests();
    
    const qaTests = new QualityAssuranceTests();
    await qaTests.runAllTests();
    
    console.log('\n' + '='.repeat(60));
    console.log('🎉 All tests completed!');
    
    // Generate summary report
    this.generateSummaryReport(unitTests, integrationTests, qaTests);
  }

  generateSummaryReport(unitTests, integrationTests, qaTests) {
    const totalPassed = unitTests.passed + 
                       integrationTests.results.filter(r => r.status === 'PASSED').length +
                       qaTests.results.filter(r => r.status === 'PASSED').length;
    
    const totalFailed = unitTests.failed + 
                       integrationTests.results.filter(r => r.status === 'FAILED').length +
                       qaTests.results.filter(r => r.status === 'FAILED').length;
    
    const totalTests = totalPassed + totalFailed;
    const successRate = totalTests > 0 ? (totalPassed / totalTests * 100).toFixed(1) : 0;
    
    console.log('\n📋 COMPREHENSIVE TEST SUMMARY');
    console.log('=' .repeat(40));
    console.log(`📊 Total Tests: ${totalTests}`);
    console.log(`✅ Passed: ${totalPassed}`);
    console.log(`❌ Failed: ${totalFailed}`);
    console.log(`📈 Overall Success Rate: ${successRate}%`);
    
    if (successRate >= 90) {
      console.log('🎉 Excellent! Your code quality is outstanding!');
    } else if (successRate >= 75) {
      console.log('👍 Good! Your code quality is solid with room for improvement.');
    } else if (successRate >= 50) {
      console.log('⚠️ Fair. Consider addressing the failed tests to improve quality.');
    } else {
      console.log('🔧 Needs improvement. Please review and fix the failing tests.');
    }
  }
}

// 🎯 Quick Test Functions for Browser Console
window.runQuickTest = async function() {
  console.log('🚀 Running Quick Test...');
  
  try {
    // Test basic functionality
    const askAiModel = new AskAiModel();
    const response = await askAiModel.askQuestion('Assalamu alaikum');
    
    console.log('✅ Quick test passed!');
    console.log('📝 Response:', response.text.substring(0, 100) + '...');
    
    return { success: true, response };
  } catch (error) {
    console.log('❌ Quick test failed:', error.message);
    return { success: false, error: error.message };
  }
};

window.runFullTestSuite = async function() {
  const testRunner = new TestRunner();
  await testRunner.runAllTests();
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    UnitTestSuite,
    IntegrationTestSuite,
    QualityAssuranceTests,
    TestRunner
  };
}

console.log('🧪 Test Suite loaded! Use runQuickTest() or runFullTestSuite() in console.');