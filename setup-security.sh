#!/bin/bash
# Security Setup Script for UsStuck
# Configures git hooks and security tools

echo "🔒 Setting up security measures for UsStuck..."

# Make pre-commit hook executable
chmod +x .githooks/pre-commit

# Configure git to use custom hooks directory
git config core.hooksPath .githooks

echo "✅ Git hooks configured"

# Check if gitleaks is installed
if ! command -v gitleaks &> /dev/null; then
    echo "⚠️  GitLeaks not installed"
    echo "Please install GitLeaks for enhanced security:"
    echo "  - macOS: brew install gitleaks"
    echo "  - Windows: choco install gitleaks"
    echo "  - Linux: Download from https://github.com/zricethezav/gitleaks/releases"
    echo "  - Go: go install github.com/zricethezav/gitleaks/v8@latest"
else
    echo "✅ GitLeaks found"
    
    # Test gitleaks configuration
    echo "🔍 Testing GitLeaks configuration..."
    if gitleaks detect --config .gitleaks.toml --no-git; then
        echo "✅ GitLeaks configuration valid"
    else
        echo "⚠️  GitLeaks detected potential issues"
        echo "Please review and fix any detected secrets"
    fi
fi

# Verify .env is in .gitignore
if grep -q "\.env" .gitignore; then
    echo "✅ .env files are ignored by git"
else
    echo "⚠️  Adding .env to .gitignore"
    echo "
# Environment variables" >> .gitignore
    echo ".env" >> .gitignore
    echo ".env.local" >> .gitignore
    echo ".env.*.local" >> .gitignore
fi

# Check if .env exists and warn
if [ -f ".env" ]; then
    echo "⚠️  .env file exists - make sure it's not tracked by git"
    if git ls-files --error-unmatch .env 2>/dev/null; then
        echo "❌ .env is tracked by git! Run: git rm --cached .env"
    else
        echo "✅ .env is not tracked by git"
    fi
fi

echo "
🎉 Security setup complete!"
echo "Next steps:"
echo "1. Install GitLeaks if not already installed"
echo "2. Test with: gitleaks detect --config .gitleaks.toml"
echo "3. Make sure your .env file contains your API keys"
echo "4. Never commit .env to git"
echo "5. Use environment variables in production (Netlify)"