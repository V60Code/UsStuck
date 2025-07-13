# Integrasi Gemini AI dengan Dataset Hadits

## 📋 Overview

Implementasi ini mengintegrasikan Google Gemini AI dengan dataset hadits lokal untuk fitur Ask AI di aplikasi UsStuck. AI akan memberikan jawaban berdasarkan hadits yang relevan dari dataset yang tersedia.

## 🚀 Fitur Utama

### ✅ Yang Sudah Diimplementasikan:

1. **Gemini API Integration**
   - Konfigurasi API key dari file `data.txt`
   - Service layer untuk komunikasi dengan Gemini API
   - Error handling dan fallback mechanism

2. **Dataset Hadits Integration**
   - Load dataset dari `hadits.json`
   - Pencarian hadits relevan berdasarkan keyword
   - Scoring system untuk menentukan relevansi

3. **Enhanced UI**
   - Tampilan hadits yang digunakan dalam response
   - Status indicator (Gemini AI vs Fallback)
   - Loading states dan error handling

4. **Smart Context Building**
   - Template prompt yang disesuaikan untuk konteks Islamic
   - Injeksi hadits relevan ke dalam prompt
   - Referensi sumber yang akurat

## 📁 Struktur File

```
src/scripts/
├── config/
│   └── gemini-config.js          # Konfigurasi Gemini API
├── services/
│   ├── dataset-service.js        # Service untuk dataset hadits
│   └── gemini-service.js         # Service untuk Gemini API
├── models/ask-ai/
│   └── ask-ai-model.js          # Model yang sudah diupdate
├── presenters/ask-ai/
│   └── ask-ai-presenter.js      # Presenter dengan Gemini integration
└── data/
    ├── data.txt                 # API key Gemini
    └── hadits.json             # Dataset hadits
```

## 🔧 Cara Kerja

### 1. **Inisialisasi**
```javascript
// Service akan otomatis load API key dan dataset saat pertama kali digunakan
const geminiService = new GeminiService();
await geminiService.initialize();
```

### 2. **Proses Query**
1. User mengirim pertanyaan
2. System mencari hadits yang relevan dari dataset
3. Hadits relevan dimasukkan ke dalam prompt context
4. Gemini AI memproses dengan context hadits
5. Response ditampilkan dengan sumber hadits

### 3. **Fallback Mechanism**
- Jika Gemini API gagal → gunakan mock response
- Jika dataset tidak tersedia → tetap gunakan Gemini tanpa context
- Jika API key tidak valid → fallback ke mock response

## 🎯 Contoh Penggunaan

### Input User:
```
"Bagaimana hukum puasa bagi orang yang sakit?"
```

### Proses Internal:
1. **Dataset Search**: Cari hadits dengan keyword "puasa", "sakit", "hukum"
2. **Context Building**: 
   ```
   === DATA HADITS RELEVAN ===
   - Hadits tentang rukhsah puasa untuk orang sakit
   - Hadits tentang qadha puasa
   
   === PERTANYAAN ===
   Bagaimana hukum puasa bagi orang yang sakit?
   ```
3. **Gemini Response**: AI memberikan jawaban berdasarkan hadits context

### Output:
- **Jawaban AI** berdasarkan hadits
- **Hadits yang digunakan** ditampilkan dengan sumber
- **Status indicator** menunjukkan menggunakan Gemini AI

## 🔑 Konfigurasi API Key

File `src/scripts/data/data.txt`:
```
GEMINI_API_KEY="YOUR_ACTUAL_API_KEY_HERE"
```

## 📊 Format Dataset

Dataset `hadits.json` mendukung berbagai format field:
```json
[
  {
    "text": "Teks hadits dalam bahasa Arab",
    "translation": "Terjemahan bahasa Indonesia", 
    "narrator": "Nama perawi",
    "source": "Sumber kitab hadits",
    "theme": "Tema/kategori hadits"
  }
]
```

## 🛠️ Method Testing

### Test Koneksi Gemini:
```javascript
// Di browser console
const presenter = new AskAiPresenter();
await presenter.testGeminiConnection();
```

### Cek Status Service:
```javascript
const status = await presenter.getGeminiStatus();
console.log(status);
```

### Toggle Gemini Usage:
```javascript
presenter.toggleGeminiUsage(false); // Disable Gemini, use fallback
presenter.toggleGeminiUsage(true);  // Enable Gemini
```

## 🔍 Debugging

### Console Logs:
- `Initializing Gemini service...` - Service mulai inisialisasi
- `Loaded X hadits entries` - Dataset berhasil dimuat
- `Found X relevant hadits for question` - Hadits relevan ditemukan
- `Gemini service initialized successfully` - Service siap digunakan

### Error Handling:
- API key tidak valid → Fallback ke mock response
- Dataset tidak ditemukan → Gunakan Gemini tanpa context
- Network error → Retry dengan exponential backoff
- Rate limit → Queue request dan retry

## 📈 Optimisasi

### Performance:
- Dataset di-cache setelah pertama kali dimuat
- Keyword extraction yang efisien
- Limit hasil pencarian hadits (max 3)

### Accuracy:
- Relevance scoring berdasarkan keyword match
- Template prompt yang dioptimasi untuk konteks Islamic
- Safety settings untuk content filtering

## 🚀 Deployment

### Environment Variables:
```bash
# Production
GEMINI_API_KEY=your_production_api_key

# Development  
GEMINI_API_KEY=your_development_api_key
```

### Build Process:
```bash
npm run build
```

Dataset dan API key akan otomatis tersedia di production build.

## 🔮 Future Enhancements

1. **Vector Search**: Implementasi semantic search untuk hadits
2. **Multiple Languages**: Support Arabic, English, Indonesian
3. **Audio Response**: Text-to-speech untuk hadits
4. **Bookmark System**: Save favorite hadits
5. **Advanced Filtering**: Filter by theme, narrator, source
6. **Offline Mode**: Cache responses untuk offline usage

## 📞 Support

Jika ada masalah dengan implementasi:
1. Check console logs untuk error details
2. Verify API key validity
3. Ensure dataset format is correct
4. Test network connectivity

---

**Status**: ✅ Ready for Production
**Last Updated**: December 2024
**Version**: 1.0.0