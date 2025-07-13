import CONFIG from '../config.js';

// Konfigurasi Gemini API - Updated with correct endpoints
export const GEMINI_CONFIG = {
  model: CONFIG.GEMINI.MODEL,
  baseUrl: CONFIG.GEMINI.BASE_URL,
  maxTokens: CONFIG.GEMINI.MAX_TOKENS,
  temperature: CONFIG.GEMINI.TEMPERATURE
};

// Load API key dari config
export async function loadApiKey() {
  try {
    // Langsung return API key dari config
    const apiKey = CONFIG.GEMINI.API_KEY;
    
    if (apiKey && apiKey !== 'YOUR_API_KEY_HERE') {
      console.log('✅ Gemini API key loaded successfully');
      return apiKey;
    } else {
      console.error('❌ Invalid API key in config');
      return null;
    }
  } catch (error) {
    console.error('Error loading API key:', error);
    return null;
  }
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