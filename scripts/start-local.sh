#!/bin/bash

echo "🚀 Starting NestJS CRUD API locally..."

# Check if yarn is installed
if ! command -v yarn &> /dev/null; then
    echo "❌ Yarn is not installed. Please install yarn first:"
    echo "   npm install -g yarn"
    echo "   or use corepack: corepack enable"
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "✅ Environment file created. Please review .env and update if needed."
fi

echo "📦 Installing dependencies..."
yarn install

echo "🔨 Building the application..."
yarn build

echo "✅ Ready to start!"
echo ""
echo "To start the application:"
echo "1. Make sure PostgreSQL is running on localhost:5432"
echo "2. Run: yarn start:dev"
echo ""
echo "Or if you want to use Docker:"
echo "1. Start Docker Desktop"
echo "2. Run: docker-compose up -d"
echo "3. Run: yarn start:dev"
echo ""
echo "API will be available at: http://localhost:3000"
echo "Swagger docs at: http://localhost:3000/api" 