#!/bin/bash

echo "🚀 Starting E-commerce Fashion Store..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "📦 Installing frontend dependencies..."
npm install

echo "📦 Setting up backend..."
mkdir -p backend
cd backend

# Copy server package.json if it doesn't exist
if [ ! -f "package.json" ]; then
    cp ../package-server.json package.json
fi

echo "📦 Installing backend dependencies..."
npm install

cd ..

echo "🔧 Creating environment file..."
if [ ! -f ".env" ]; then
    cat > .env << EOL
REACT_APP_API_URL=http://localhost:5000
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key_here
EOL
    echo "✅ Created .env file. Please update with your actual API keys."
fi

echo "🎉 Setup complete!"
echo ""
echo "To start the application:"
echo "1. Frontend: npm start (runs on http://localhost:3000)"
echo "2. Backend: cd backend && npm run dev (runs on http://localhost:5000)"
echo ""
echo "Admin login: Use 'Login sebagai Admin' button or email with 'admin' keyword"
echo ""
echo "Happy coding! 🎨"
