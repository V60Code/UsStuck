# Security Setup Script for UsStuck (PowerShell)
# Configures git hooks and security tools for Windows

Write-Host "🔒 Setting up security measures for UsStuck..." -ForegroundColor Green

# Make sure .githooks directory exists
if (!(Test-Path ".githooks")) {
    New-Item -ItemType Directory -Path ".githooks" -Force
    Write-Host "✅ Created .githooks directory" -ForegroundColor Green
}

# Configure git to use custom hooks directory
git config core.hooksPath .githooks
Write-Host "✅ Git hooks configured" -ForegroundColor Green

# Check if gitleaks is installed
$gitleaksInstalled = $false
try {
    $null = Get-Command gitleaks -ErrorAction Stop
    $gitleaksInstalled = $true
    Write-Host "✅ GitLeaks found" -ForegroundColor Green
} catch {
    Write-Host "⚠️  GitLeaks not installed" -ForegroundColor Yellow
    Write-Host "Please install GitLeaks for enhanced security:" -ForegroundColor Yellow
    Write-Host "  - Windows: choco install gitleaks" -ForegroundColor Yellow
    Write-Host "  - Or download from: https://github.com/zricethezav/gitleaks/releases" -ForegroundColor Yellow
    Write-Host "  - Or with Go: go install github.com/zricethezav/gitleaks/v8@latest" -ForegroundColor Yellow
}

if ($gitleaksInstalled) {
    # Test gitleaks configuration
    Write-Host "🔍 Testing GitLeaks configuration..." -ForegroundColor Blue
    try {
        gitleaks detect --config .gitleaks.toml --no-git
        Write-Host "✅ GitLeaks configuration valid" -ForegroundColor Green
    } catch {
        Write-Host "⚠️  GitLeaks detected potential issues" -ForegroundColor Yellow
        Write-Host "Please review and fix any detected secrets" -ForegroundColor Yellow
    }
}

# Verify .env is in .gitignore
$gitignoreContent = Get-Content .gitignore -ErrorAction SilentlyContinue
if ($gitignoreContent -match "\.env") {
    Write-Host "✅ .env files are ignored by git" -ForegroundColor Green
} else {
    Write-Host "⚠️  Adding .env to .gitignore" -ForegroundColor Yellow
    Add-Content .gitignore "`n# Environment variables"
    Add-Content .gitignore ".env"
    Add-Content .gitignore ".env.local"
    Add-Content .gitignore ".env.*.local"
}

# Check if .env exists and warn
if (Test-Path ".env") {
    Write-Host "⚠️  .env file exists - make sure it's not tracked by git" -ForegroundColor Yellow
    
    # Check if .env is tracked by git
    try {
        $gitStatus = git ls-files --error-unmatch .env 2>$null
        if ($gitStatus) {
            Write-Host "❌ .env is tracked by git! Run: git rm --cached .env" -ForegroundColor Red
        } else {
            Write-Host "✅ .env is not tracked by git" -ForegroundColor Green
        }
    } catch {
        Write-Host "✅ .env is not tracked by git" -ForegroundColor Green
    }
}

Write-Host "`n🎉 Security setup complete!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Install GitLeaks if not already installed" -ForegroundColor White
Write-Host "2. Test with: gitleaks detect --config .gitleaks.toml" -ForegroundColor White
Write-Host "3. Make sure your .env file contains your API keys" -ForegroundColor White
Write-Host "4. Never commit .env to git" -ForegroundColor White
Write-Host "5. Use environment variables in production (Netlify)" -ForegroundColor White

Write-Host "`nPress any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")