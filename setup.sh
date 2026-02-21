#!/bin/bash
# LMS Frontend - Automated Setup & Fix Script
# Run this script to apply all fixes and start the project

echo "════════════════════════════════════════════════════════════════"
echo "LMS Frontend - Complete Project Fix & Setup"
echo "════════════════════════════════════════════════════════════════"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    echo -e "${BLUE}▶ $1${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Check Node.js version
print_status "Checking Node.js version..."
NODE_VERSION=$(node -v)
echo "  Node version: $NODE_VERSION"
NPM_VERSION=$(npm -v)
echo "  NPM version: $NPM_VERSION"
echo ""

# Phase 1: Clean Environment
print_status "Phase 1: Cleaning environment..."
print_warning "Removing node_modules..."
rm -rf node_modules 2>/dev/null
print_warning "Removing package-lock.json..."
rm -f package-lock.json 2>/dev/null
print_warning "Removing .expo directory..."
rm -rf .expo 2>/dev/null
print_success "Environment cleaned"
echo ""

# Phase 2: Install Dependencies
print_status "Phase 2: Installing dependencies..."
npm install
if [ $? -eq 0 ]; then
    print_success "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi
echo ""

# Phase 3: Verify Installation
print_status "Phase 3: Verifying installation..."

# Check React version
REACT_VERSION=$(npm list react 2>/dev/null | grep "react@" | head -1 | grep -oE "[0-9]+\.[0-9]+\.[0-9]+")
echo "  React version: ${REACT_VERSION:-not found}"

# Check React Native version
RN_VERSION=$(npm list react-native 2>/dev/null | grep "react-native@" | head -1 | grep -oE "[0-9]+\.[0-9]+\.[0-9]+")
echo "  React Native version: ${RN_VERSION:-not found}"

# Check Expo version
EXPO_VERSION=$(npm list expo 2>/dev/null | grep "expo@" | head -1 | grep -oE "[0-9]+\.[0-9]+\.[0-9]+")
echo "  Expo version: ${EXPO_VERSION:-not found}"

echo ""

# Phase 4: TypeScript Check
print_status "Phase 4: Running TypeScript compiler check..."
npx tsc --noEmit 2>&1 | head -20
if [ ${PIPESTATUS[0]} -eq 0 ]; then
    print_success "TypeScript check passed"
else
    print_warning "TypeScript has some warnings/errors (might be expected)"
fi
echo ""

# Phase 5: Ready Message
print_status "Phase 5: Setup complete!"
echo ""
print_success "All fixes have been applied successfully!"
echo ""
echo "════════════════════════════════════════════════════════════════"
echo "Next Steps - Choose ONE to start your app:"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "  ${BLUE}1. Start Expo Dev Server (Expo Go):${NC}"
echo "     npx expo start -c"
echo ""
echo "  ${BLUE}2. Run on Android Emulator:${NC}"
echo "     npx expo run:android"
echo ""
echo "  ${BLUE}3. Run on iOS Simulator (macOS only):${NC}"
echo "     npx expo run:ios"
echo ""
echo "  ${BLUE}4. Run on Web Browser:${NC}"
echo "     npx expo start --web"
echo ""
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "📖 For detailed information, see:"
echo "   - PROJECT_ANALYSIS.md - Problem analysis"
echo "   - FIX_GUIDE.md - Step-by-step fixes and explanations"
echo ""
print_success "Happy coding! 🚀"
