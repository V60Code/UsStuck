# 🚀 Deployment Guide - UsStuck

## Netlify Deployment (Recommended)

### Prerequisites
- GitHub repository dengan kode UsStuck
- Netlify account (gratis)
- Gemini API key

### Step 1: Prepare Repository

1. **Pastikan .env tidak ter-commit:**
   ```bash
   # Check apakah .env ada di git
   git status
   
   # Jika .env ter-track, remove dari git
   git rm --cached .env
   git commit -m "Remove .env from tracking"
   ```

2. **Push ke GitHub:**
   ```bash
   git add .
   git commit -m "Setup environment variables for deployment"
   git push origin main
   ```

### Step 2: Connect to Netlify

1. **Login ke [Netlify](https://netlify.com)**
2. **Click "New site from Git"**
3. **Choose GitHub** dan authorize Netlify
4. **Select repository** UsStuck
5. **Configure build settings:**
   - **Branch to deploy:** `main`
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

### Step 3: Set Environment Variables

⚠️ **PENTING:** Jangan pernah commit API key ke repository!

1. **Get your Gemini API Key:**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create new API key
   - Copy the generated key

2. **Go to Site Settings** di Netlify
3. **Navigate to Environment Variables**
4. **Add the following variables:**

   | Variable Name | Value |
   |---------------|-------|
   | `VITE_GEMINI_API_KEY` | `YOUR_ACTUAL_API_KEY_HERE` |
   | `VITE_API_BASE_URL` | `https://generativelanguage.googleapis.com/v1/models` |
   | `VITE_APP_NAME` | `UsStuck` |
   | `VITE_APP_VERSION` | `1.0.0` |

   🔒 **Security Note:** API key hanya disimpan di Netlify environment variables, tidak di source code!

### Step 4: Deploy

1. **Trigger deployment:**
   - Netlify akan otomatis build setelah environment variables di-set
   - Atau click "Trigger deploy" → "Deploy site"

2. **Monitor build process:**
   - Check build logs untuk error
   - Build time biasanya 2-3 menit

3. **Test deployment:**
   - Buka URL yang diberikan Netlify
   - Test fitur Ask AI untuk memastikan API key bekerja

### Step 5: Custom Domain (Optional)

1. **Go to Domain settings**
2. **Add custom domain** (jika punya)
3. **Configure DNS** sesuai instruksi Netlify

## Troubleshooting

### Build Errors

**Error: "VITE_GEMINI_API_KEY is not defined"**
```bash
# Solution: Check environment variables di Netlify
# Pastikan variable name exact match: VITE_GEMINI_API_KEY
```

**Error: "Failed to build"**
```bash
# Check build logs di Netlify dashboard
# Biasanya karena dependency issues atau syntax error
```

### Runtime Errors

**API calls failing in production:**
```javascript
// Check di browser console:
// 1. Apakah API key ter-load dengan benar
// 2. Check network tab untuk error details
// 3. Verify CORS settings
```

### Environment Variables Not Working

1. **Variable names harus exact match**
2. **Restart deployment setelah menambah variables**
3. **Check case sensitivity**

## 🚨 API Key Security & Recovery

### If API Key Gets Exposed

**Immediate Actions:**
1. **Revoke the exposed key** di [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **Generate new API key**
3. **Update Netlify environment variables** dengan key baru
4. **Trigger new deployment**
5. **Remove from git history** jika ter-commit:
   ```bash
   git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch DEPLOYMENT.md' --prune-empty --tag-name-filter cat -- --all
   git push origin --force --all
   ```

### Prevention Measures

- 🔒 **Never commit API keys** to any file
- 🔒 **Use placeholders** in documentation
- 🔒 **Enable secret scanning** di GitHub
- 🔒 **Regular API key rotation**
- 🔒 **Monitor API usage** untuk aktivitas mencurigakan

## Security Checklist

- ✅ `.env` file tidak ter-commit ke GitHub
- ✅ API key hanya di environment variables
- ✅ No hardcoded secrets di source code
- ✅ `.gitignore` includes `.env`
- ✅ Environment variables set di Netlify
- ✅ API key validation implemented
- ✅ Rate limiting implemented
- ✅ Documentation uses placeholders only
- ✅ Secret scanning enabled

## Monitoring & Maintenance

### Check API Usage
```javascript
// Monitor di browser console:
// - API call success rate
// - Rate limiting status
// - Error messages
```

### Update API Key
1. **Generate new key** di Google AI Studio
2. **Update environment variable** di Netlify
3. **Trigger new deployment**

### Performance Monitoring
- **Netlify Analytics** untuk traffic
- **Browser DevTools** untuk performance
- **Console logs** untuk API errors

## Alternative Deployment Options

### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add VITE_GEMINI_API_KEY
```

### GitHub Pages (Static only)
```bash
# Build for production
npm run build

# Deploy to gh-pages branch
npm install -g gh-pages
gh-pages -d dist
```

**Note:** GitHub Pages tidak support environment variables untuk runtime, jadi tidak recommended untuk production dengan API keys.

## Production URLs

- **Netlify:** `https://your-site-name.netlify.app`
- **Custom Domain:** `https://usstuck.com` (jika configured)

## Support

Jika ada masalah deployment:
1. Check build logs di Netlify
2. Verify environment variables
3. Test locally dengan `npm run build && npm run preview`
4. Contact team untuk troubleshooting