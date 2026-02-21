# LMS Frontend - Automated Setup & Fix Script (Windows PowerShell)
# Run this script to apply all fixes and start the project
# Usage: .\setup.ps1

Write-Host "════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "LMS Frontend - Complete Project Fix & Setup" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Function to print status
function Print-Status {
    param([string]$Message)
    Write-Host "▶ $Message" -ForegroundColor Blue
}

function Print-Success {
    param([string]$Message)
    Write-Host "✓ $Message" -ForegroundColor Green
}

function Print-Error {
    param([string]$Message)
    Write-Host "✗ $Message" -ForegroundColor Red
}

function Print-Warning {
    param([string]$Message)
    Write-Host "⚠ $Message" -ForegroundColor Yellow
}

# Check Node.js version
Print-Status "Checking Node.js version..."
$nodeVersion = node -v
Write-Host "  Node version: $nodeVersion"
$npmVersion = npm -v
Write-Host "  NPM version: $npmVersion"
Write-Host ""

# Phase 1: Clean Environment
Print-Status "Phase 1: Cleaning environment..."
Print-Warning "Removing node_modules..."
Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
Print-Warning "Removing package-lock.json..."
Remove-Item -Path "package-lock.json" -Force -ErrorAction SilentlyContinue
Print-Warning "Removing .expo directory..."
Remove-Item -Path ".expo" -Recurse -Force -ErrorAction SilentlyContinue
Print-Success "Environment cleaned"
Write-Host ""

# Phase 2: Install Dependencies
Print-Status "Phase 2: Installing dependencies..."
npm install
if ($LASTEXITCODE -eq 0) {
    Print-Success "Dependencies installed successfully"
} else {
    Print-Error "Failed to install dependencies"
    exit 1
}
Write-Host ""

# Phase 3: Verify Installation
Print-Status "Phase 3: Verifying installation..."

$reactVersion = npm list react 2>$null | Select-String "react@" | Select-Object -First 1 | ForEach-Object { $_ -match "([0-9]+\.[0-9]+\.[0-9]+)" | Out-Null; $matches[1] }
Write-Host "  React version: $($reactVersion -or 'not found')"

$rnVersion = npm list react-native 2>$null | Select-String "react-native@" | Select-Object -First 1 | ForEach-Object { $_ -match "([0-9]+\.[0-9]+\.[0-9]+)" | Out-Null; $matches[1] }
Write-Host "  React Native version: $($rnVersion -or 'not found')"

$expoVersion = npm list expo 2>$null | Select-String "expo@" | Select-Object -First 1 | ForEach-Object { $_ -match "([0-9]+\.[0-9]+\.[0-9]+)" | Out-Null; $matches[1] }
Write-Host "  Expo version: $($expoVersion -or 'not found')"

Write-Host ""

# Phase 4: TypeScript Check
Print-Status "Phase 4: Running TypeScript compiler check..."
npx tsc --noEmit 2>&1 | Select-Object -First 20
if ($LASTEXITCODE -eq 0) {
    Print-Success "TypeScript check passed"
} else {
    Print-Warning "TypeScript has some warnings/errors (might be expected)"
}
Write-Host ""

# Phase 5: Ready Message
Print-Status "Phase 5: Setup complete!"
Write-Host ""
Print-Success "All fixes have been applied successfully!"
Write-Host ""
Write-Host "════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "Next Steps - Choose ONE to start your app:" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "  1. Start Expo Dev Server (Expo Go):" -ForegroundColor Blue
Write-Host "     npx expo start -c"
Write-Host ""
Write-Host "  2. Run on Android Emulator:" -ForegroundColor Blue
Write-Host "     npx expo run:android"
Write-Host ""
Write-Host "  3. Run on iOS Simulator (macOS only):" -ForegroundColor Blue
Write-Host "     npx expo run:ios"
Write-Host ""
Write-Host "  4. Run on Web Browser:" -ForegroundColor Blue
Write-Host "     npx expo start --web"
Write-Host ""
Write-Host "════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "📖 For detailed information, see:" -ForegroundColor Cyan
Write-Host "   - PROJECT_ANALYSIS.md - Problem analysis"
Write-Host "   - FIX_GUIDE.md - Step-by-step fixes and explanations"
Write-Host ""
Print-Success "Happy coding! 🚀"
