#!/bin/bash

# Setup script for Markitdown Desktop
# This script installs all dependencies using UV for faster Python package installation

set -e

echo "🚀 Setting up Markitdown Desktop..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.10+ first."
    exit 1
fi

# Check Python version
python_version=$(python3 --version | cut -d' ' -f2)
echo "✓ Found Python $python_version"

# Check Node version
node_version=$(node --version)
echo "✓ Found Node.js $node_version"
echo ""

# Install UV if not present
if ! command -v uv &> /dev/null; then
    echo "📦 Installing UV (ultra-fast Python package installer)..."
    curl -LsSf https://astral.sh/uv/install.sh | sh

    # Add UV to PATH for current session
    export PATH="$HOME/.local/bin:$PATH"
    echo "✓ UV installed successfully"
else
    echo "✓ UV is already installed"
fi

echo ""
echo "📦 Installing Node.js dependencies..."
npm install
echo "✓ Node.js dependencies installed"

echo ""
echo "📦 Installing Python dependencies with UV..."
cd python
uv pip install --system -r requirements.txt
cd ..
echo "✓ Python dependencies installed"

echo ""
echo "✅ Setup complete!"
echo ""
echo "To run the application in development mode:"
echo ""
echo "  Terminal 1: cd python && python server.py"
echo "  Terminal 2: npm run dev"
echo ""
echo "To build for production:"
echo "  npm run build"
echo "  npm run dist"
echo ""