# 🚀 Panduan Deployment Netlify untuk Islamic AI Assistant

## 🔍 Masalah yang Dipecahkan

Ketika deploy di Netlify, file `hadits.json` tidak bisa diakses karena:
- ❌ File berada di `src/scripts/data/` yang tidak di-serve oleh Netlify
- ❌ Path yang digunakan tidak sesuai dengan struktur Netlify
- ❌ File tidak ter-copy ke build output

## ✅ Solusi yang Diimplementasikan

### 1. **Multiple Path Strategy**
Dataset service sekarang mencoba beberapa path:
```javascript
const possiblePaths = [
  '/hadits.json',           // Root access (Netlify friendly)
  './hadits.json',          // Relative root
  '/public/hadits.json',    // Public directory
  './public/hadits.json',   // Relative public
  // ... fallback paths untuk development
];
```

### 2. **File Preparation Scripts**
Dibuat 3 script untuk menyiapkan deployment:
- `prepare-deploy.js` - Cross-platform Node.js script
- `prepare-deploy.sh` - Bash script untuk Linux/Mac
- `prepare-deploy.ps1` - PowerShell script untuk Windows

### 3. **Netlify Configuration**
File `netlify.toml` untuk:
- ✅ Routing SPA yang benar
- ✅ Headers untuk file JSON
- ✅ CORS configuration
- ✅ Cache control

### 4. **Vite Configuration**
Updated `vite.config.js` untuk:
- ✅ Copy file JSON ke build output
- ✅ Serve static files dengan benar
- ✅ MIME type configuration

## 🛠️ Cara Deploy ke Netlify

### **Opsi 1: Automatic Build (Recommended)**

1. **Push ke Git Repository**
   ```bash
   git add .
   git commit -m "Add Netlify deployment configuration"
   git push origin main
   ```

2. **Connect ke Netlify**
   - Login ke [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect repository Anda
   - Set build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`

3. **Deploy**
   - Netlify akan otomatis run `npm run build`
   - Script `prepare-deploy.js` akan copy `hadits.json` ke lokasi yang tepat
   - File akan tersedia di `https://yoursite.netlify.app/hadits.json`

### **Opsi 2: Manual Build & Upload**

1. **Prepare Files**
   ```bash
   # Windows (PowerShell)
   .\prepare-deploy.ps1
   
   # Linux/Mac
   ./prepare-deploy.sh
   
   # Cross-platform (Node.js)
   npm run prepare-deploy
   ```

2. **Build Project**
   ```bash
   npm run build
   ```

3. **Upload ke Netlify**
   - Drag & drop folder `dist/` ke Netlify dashboard
   - Atau gunakan Netlify CLI:
     ```bash
     npm install -g netlify-cli
     netlify deploy --prod --dir=dist
     ```

## 📁 Struktur File Setelah Preparation

```
project/
├── src/
│   ├── public/
│   │   └── hadits.json          ✅ Copy untuk Vite
│   └── scripts/data/
│       └── hadits.json          📄 Original file
├── hadits.json                  ✅ Copy untuk root access
├── public/
│   └── hadits.json              ✅ Alternative public
├── netlify.toml                 ⚙️ Netlify config
└── dist/                        📦 Build output
    ├── hadits.json              ✅ Available at /hadits.json
    └── ...
```

## 🔧 Troubleshooting

### **Problem: File masih tidak bisa diakses**

1. **Check Console Logs**
   ```javascript
   // Buka Developer Tools → Console
   // Lihat log dari dataset service
   ```

2. **Manual Test**
   ```javascript
   // Test di browser console
   fetch('/hadits.json')
     .then(r => r.json())
     .then(data => console.log('✅ Data loaded:', data.length))
     .catch(e => console.error('❌ Error:', e));
   ```

3. **Check Netlify Deploy Logs**
   - Buka Netlify dashboard
   - Go to "Deploys" tab
   - Check build logs untuk error

### **Problem: CORS Error**

File `netlify.toml` sudah include CORS headers:
```toml
[[headers]]
  for = "/hadits.json"
  [headers.values]
    Access-Control-Allow-Origin = "*"
```

### **Problem: File Size Too Large**

Jika `hadits.json` terlalu besar (>10MB):

1. **Split File**
   ```javascript
   // Bagi menjadi chunks
   const chunks = [];
   for (let i = 0; i < data.length; i += 1000) {
     chunks.push(data.slice(i, i + 1000));
   }
   ```

2. **Use CDN**
   - Upload ke GitHub Releases
   - Use jsDelivr: `https://cdn.jsdelivr.net/gh/user/repo@tag/hadits.json`

3. **Compress**
   ```bash
   gzip hadits.json
   # Serve as hadits.json.gz dengan proper headers
   ```

## 📊 Performance Optimization

### **Caching Strategy**
```toml
# netlify.toml
[[headers]]
  for = "/hadits.json"
  [headers.values]
    Cache-Control = "public, max-age=3600"  # 1 hour cache
```

### **Lazy Loading**
```javascript
// Load data only when needed
const datasetService = new DatasetService();
// Data akan di-load saat pertama kali digunakan
```

### **Compression**
Netlify otomatis compress file dengan gzip/brotli.

## 🎯 Expected Results

Setelah deployment berhasil:

1. ✅ **File Accessible**: `https://yoursite.netlify.app/hadits.json`
2. ✅ **AI Responses**: Menggunakan data hadits lengkap, bukan sample data
3. ✅ **Performance**: Fast loading dengan proper caching
4. ✅ **Reliability**: Fallback ke sample data jika ada masalah

## 📞 Support

Jika masih ada masalah:

1. **Check Console**: Lihat error messages di browser console
2. **Check Network**: Lihat request/response di Network tab
3. **Check Build Logs**: Lihat Netlify deploy logs
4. **Test Locally**: Pastikan `npm run build` berhasil di local

---

**Status**: ✅ **READY FOR DEPLOYMENT**

Semua file dan konfigurasi sudah siap untuk deployment ke Netlify!