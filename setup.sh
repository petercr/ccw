#!/bin/bash

# Monorepo Setup Script

echo "🚀 Setting up Santan Monorepo..."
echo ""

# Check if .env files exist
if [ ! -f "apps/frontend/.env.local" ]; then
  echo "⚠️  Frontend .env.local not found"
  echo "   Copy apps/frontend/.env.example to apps/frontend/.env.local and configure it"
else
  echo "✅ Frontend .env.local exists"
fi

if [ ! -f "apps/studio/.env.local" ]; then
  echo "⚠️  Studio .env.local not found"
  echo "   Copy apps/studio/.env.example to apps/studio/.env.local and configure it"
else
  echo "✅ Studio .env.local exists"
fi

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✨ Setup complete!"
echo ""
echo "Available commands:"
echo "  vp run -r --parallel dev  - Run all apps in development mode"
echo "  vp dev                    - Frontend Vite+ dev server"
echo "  vp run -r build           - Build all apps"
echo "  vp check                  - Format, lint, and type-check"
echo "  vp run -r type-check      - Type check all apps"
echo ""
echo "Run individual apps:"
echo "  vp dev"
echo "  vp run @santan/studio#dev"
echo ""

