@echo off
echo ========================================
echo BioCare - GitHub Push Script
echo ========================================
echo.
echo This script will help you push to GitHub.
echo.
echo IMPORTANT: You need a Personal Access Token
echo Get one at: https://github.com/settings/tokens
echo.
echo ========================================
echo.

set /p TOKEN="Enter your GitHub Personal Access Token: "

if "%TOKEN%"=="" (
    echo Error: Token cannot be empty!
    pause
    exit /b 1
)

echo.
echo Setting remote URL with token...
git remote set-url origin https://%TOKEN%@github.com/BiocareAnalysis/Biocare.git

echo.
echo Pushing to GitHub...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo SUCCESS! Code pushed to GitHub!
    echo ========================================
    echo.
    echo Visit: https://github.com/BiocareAnalysis/Biocare
    echo.
) else (
    echo.
    echo ========================================
    echo ERROR: Push failed!
    echo ========================================
    echo.
    echo Please check:
    echo 1. Your token is valid
    echo 2. You have write access to the repository
    echo 3. The repository exists
    echo.
    echo See GITHUB_PUSH_GUIDE.md for more help
    echo.
)

pause
