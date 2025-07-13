#!/bin/bash

# Script untuk menyiapkan deployment ke Netlify
echo "🚀 Preparing files for Netlify deployment..."

# Buat direktori public jika belum ada
mkdir -p src/public

# Copy hadits.json ke direktori public
if [ -f "src/scripts/data/hadits.json" ]; then
    echo "📄 Copying hadits.json to public directory..."
    cp src/scripts/data/hadits.json src/public/hadits.json
    echo "✅ hadits.json copied successfully"
else
    echo "❌ hadits.json not found in src/scripts/data/"
    exit 1
fi

# Copy hadits.json ke root untuk direct access
echo "📄 Copying hadits.json to root directory..."
cp src/scripts/data/hadits.json hadits.json
echo "✅ hadits.json copied to root"

# Verify files
echo "🔍 Verifying copied files..."
if [ -f "src/public/hadits.json" ] && [ -f "hadits.json" ]; then
    echo "✅ All files copied successfully!"
    echo "📊 File sizes:"
    ls -lh src/public/hadits.json
    ls -lh hadits.json
else
    echo "❌ File copy verification failed"
    exit 1
fi

echo "🎉 Deployment preparation complete!"