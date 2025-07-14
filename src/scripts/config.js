const CONFIG = {
  BASE_URL: 'API_BASE_URL',
  
  // Gemini AI Configuration - Updated with correct model and API version
  GEMINI: {
    API_KEY: 'AIzaSyA-lmqp-KlXDmI8d9rEexB_Ij9vPRto8JY',
    MODEL: 'gemini-1.5-flash', // Using stable model that's available
    BASE_URL: 'https://generativelanguage.googleapis.com/v1/models', // Correct API endpoint
    MAX_TOKENS: 1024,
    TEMPERATURE: 0.7
  }
};

export default CONFIG;
