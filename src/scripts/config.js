const CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://generativelanguage.googleapis.com/v1/models',
  
  // Gemini AI Configuration - Using environment variables for security
  GEMINI: {
    API_KEY: import.meta.env.VITE_GEMINI_API_KEY || 'YOUR_API_KEY_HERE',
    MODEL: 'gemini-1.5-flash', // Using stable model that's available
    BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://generativelanguage.googleapis.com/v1/models', // Correct API endpoint
    MAX_TOKENS: 1024,
    TEMPERATURE: 0.7
  }
};

export default CONFIG;
