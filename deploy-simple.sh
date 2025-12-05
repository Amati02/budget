#!/bin/bash

echo "🚀 Deploying Budget Tracker - Simple Method"

# Stop existing services
systemctl stop nginx-budget 2>/dev/null || true
systemctl stop budget-tracker-bot 2>/dev/null || true
systemctl stop budget-tracker 2>/dev/null || true

# Create application directory
mkdir -p /opt/budget-tracker
cd /opt/budget-tracker

# Copy files (assuming they're uploaded here)
echo "📁 Setting up files..."

# Set permissions
chmod +x server.js
chmod 644 *.html *.css *.js

# Install nginx if not installed
if ! command -v nginx &> /dev/null; then
    echo "📦 Installing nginx..."
    apt update
    apt install -y nginx
fi

# Install Node.js if not installed
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt install -y nodejs
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install express cors

# Setup systemd services
echo "⚙️ Setting up systemd services..."
cp budget-tracker.service /etc/systemd/system/
cp budget-tracker-bot.service /etc/systemd/system/
cp nginx-budget.service /etc/systemd/system/

# Reload systemd
systemctl daemon-reload

# Enable and start services
echo "🚀 Starting services..."
systemctl enable budget-tracker
systemctl start budget-tracker

systemctl enable budget-tracker-bot
systemctl start budget-tracker-bot

systemctl enable nginx-budget
systemctl start nginx-budget

# Wait for services to start
sleep 5

# Check status
echo "📊 Service Status:"
systemctl status budget-tracker --no-pager -l
systemctl status budget-tracker-bot --no-pager -l
systemctl status nginx-budget --no-pager -l

# Test the application
echo "🧪 Testing application..."
curl -s http://localhost:4001/health
echo ""
curl -s http://localhost:8080/health
echo ""

echo "✅ Deployment complete!"
echo "🌐 Budget tracker should be available at:"
echo "   - Direct: http://179.61.132.56:4001"
echo "   - Via nginx: http://179.61.132.56:8080"
echo "   - Via Traefik: https://budget.amatin8n.ru (after Traefik config)"
