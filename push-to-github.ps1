# BioCare - GitHub Push Script (PowerShell)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "BioCare - GitHub Push Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "This script will help you push to GitHub." -ForegroundColor Yellow
Write-Host ""
Write-Host "IMPORTANT: You need a Personal Access Token" -ForegroundColor Red
Write-Host "Get one at: https://github.com/settings/tokens" -ForegroundColor Yellow
Write-Host ""
Write-Host "Token Requirements:" -ForegroundColor Yellow
Write-Host "  - Select 'repo' scope (all permissions)" -ForegroundColor Yellow
Write-Host "  - Copy the token (you won't see it again!)" -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Prompt for token
$token = Read-Host "Enter your GitHub Personal Access Token" -AsSecureString
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($token)
$tokenPlain = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

if ([string]::IsNullOrWhiteSpace($tokenPlain)) {
    Write-Host ""
    Write-Host "Error: Token cannot be empty!" -ForegroundColor Red
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "Setting remote URL with token..." -ForegroundColor Green
git remote set-url origin "https://$tokenPlain@github.com/BiocareAnalysis/Biocare.git"

Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Green
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "SUCCESS! Code pushed to GitHub!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Visit: https://github.com/BiocareAnalysis/Biocare" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "  1. Verify all files are on GitHub" -ForegroundColor Yellow
    Write-Host "  2. Check README.md displays correctly" -ForegroundColor Yellow
    Write-Host "  3. Optionally deploy to Vercel/Netlify" -ForegroundColor Yellow
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "ERROR: Push failed!" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please check:" -ForegroundColor Yellow
    Write-Host "  1. Your token is valid and has 'repo' scope" -ForegroundColor Yellow
    Write-Host "  2. You have write access to BiocareAnalysis/Biocare" -ForegroundColor Yellow
    Write-Host "  3. The repository exists" -ForegroundColor Yellow
    Write-Host "  4. You're logged into the correct GitHub account" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "See GITHUB_PUSH_GUIDE.md for detailed help" -ForegroundColor Cyan
    Write-Host ""
}

# Clear token from memory
$tokenPlain = $null
[System.GC]::Collect()

Write-Host ""
Read-Host "Press Enter to exit"
