#!/bin/bash

# Chinese Sensitive Words MCP Server - Quick Install Script

set -e

echo "🔍 Installing Chinese Sensitive Words MCP Server..."
echo ""

# Check Node.js version
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed."
    echo "   Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install via npx (no global install needed)
echo ""
echo "📦 Testing MCP server..."
npx -y chinese-sensitive-words-mcp --help 2>/dev/null || true

echo ""
echo "✅ Installation complete!"
echo ""
echo "📋 Add this to your AI client configuration:"
echo ""
echo '  {'
echo '    "mcpServers": {'
echo '      "chinese-sensitive-words": {'
echo '        "command": "npx",'
echo '        "args": ["-y", "chinese-sensitive-words-mcp"]'
echo '      }'
echo '    }'
echo '  }'
echo ""
echo "🚀 Supported clients: Claude Desktop, Cursor, Windsurf, Claude Code, OpenClaw"
