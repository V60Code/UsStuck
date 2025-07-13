# PowerShell script untuk menyiapkan deployment ke Netlify
Write-Host "🚀 Preparing files for Netlify deployment..." -ForegroundColor Green

# Buat direktori public jika belum ada
if (!(Test-Path "src/public")) {
    New-Item -ItemType Directory -Path "src/public" -Force
    Write-Host "📁 Created src/public directory" -ForegroundColor Yellow
}

# Copy hadits.json ke direktori public
if (Test-Path "src/scripts/data/hadits.json") {
    Write-Host "📄 Copying hadits.json to public directory..." -ForegroundColor Blue
    Copy-Item "src/scripts/data/hadits.json" "src/public/hadits.json" -Force
    Write-Host "✅ hadits.json copied to src/public/" -ForegroundColor Green
} else {
    Write-Host "❌ hadits.json not found in src/scripts/data/" -ForegroundColor Red
    exit 1
}

# Copy hadits.json ke root untuk direct access
Write-Host "📄 Copying hadits.json to root directory..." -ForegroundColor Blue
Copy-Item "src/scripts/data/hadits.json" "hadits.json" -Force
Write-Host "✅ hadits.json copied to root" -ForegroundColor Green

# Verify files
Write-Host "🔍 Verifying copied files..." -ForegroundColor Blue
if ((Test-Path "src/public/hadits.json") -and (Test-Path "hadits.json")) {
    Write-Host "✅ All files copied successfully!" -ForegroundColor Green
    Write-Host "📊 File sizes:" -ForegroundColor Yellow
    Get-ChildItem "src/public/hadits.json" | Format-Table Name, Length -AutoSize
    Get-ChildItem "hadits.json" | Format-Table Name, Length -AutoSize
} else {
    Write-Host "❌ File copy verification failed" -ForegroundColor Red
    exit 1
}

Write-Host "🎉 Deployment preparation complete!" -ForegroundColor Green