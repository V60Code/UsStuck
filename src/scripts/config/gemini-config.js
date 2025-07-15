import CONFIG from '../config.js';
import { validateApiKey, rateLimiter, logApiUsage } from '../utils/api-security.js';

// Konfigurasi Gemini API - Updated with correct endpoints
export const GEMINI_CONFIG = {
  model: CONFIG.GEMINI.MODEL,
  baseUrl: CONFIG.GEMINI.BASE_URL,
  maxTokens: CONFIG.GEMINI.MAX_TOKENS,
  temperature: CONFIG.GEMINI.TEMPERATURE
};

// Load API key dari environment variables dengan validasi
export async function loadApiKey() {
  try {
    const apiKey = CONFIG.GEMINI.API_KEY;
    
    // Validasi API key menggunakan utility function
    if (!validateApiKey(apiKey)) {
      console.error('❌ Invalid or missing API key');
      return null;
    }
    
    console.log('✅ API key loaded and validated successfully');
    return apiKey;
  } catch (error) {
    console.error('Error loading API key:', error);
    return null;
  }
}

// Function untuk check rate limit sebelum API call
export function canMakeApiCall() {
  return rateLimiter.canMakeRequest();
}

// Function untuk log API usage
export function logGeminiApiCall(success, responseTime) {
  logApiUsage('gemini-api', success, responseTime);
}

// Template prompt untuk konteks Islamic dengan hadits
export const ISLAMIC_CONTEXT_PROMPT = `
Anda adalah asisten AI Islam yang berpengetahuan luas tentang Al-Quran dan Hadits. 
Gunakan data hadits berikut sebagai referensi utama untuk menjawab pertanyaan:

=== DATA HADITS RELEVAN ===
{HADITS_CONTEXT}

=== INSTRUKSI ===
1. Jawab pertanyaan berdasarkan hadits dan ajaran Islam yang sahih
2. Sertakan referensi hadits yang relevan jika ada
3. Gunakan bahasa Indonesia yang sopan dan mudah dipahami
4. Jika tidak ada hadits yang relevan, berikan jawaban umum berdasarkan pengetahuan Islam
5. Jika tidak yakin, katakan dengan jujur dan sarankan untuk bertanya kepada ulama

=== PERTANYAAN ===
{USER_QUESTION}

=== JAWABAN ===
`;