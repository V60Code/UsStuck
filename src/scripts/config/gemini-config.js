// Konfigurasi Gemini API
export const GEMINI_CONFIG = {
  model: 'gemini-pro',
  baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models',
  maxTokens: 1024,
  temperature: 0.7
};

// Load API key dari file data.txt
export async function loadApiKey() {
  try {
    const response = await fetch('./src/scripts/data/data.txt');
    const text = await response.text();
    const match = text.match(/GEMINI_API_KEY="([^"]+)"/);
    return match ? match[1] : null;
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