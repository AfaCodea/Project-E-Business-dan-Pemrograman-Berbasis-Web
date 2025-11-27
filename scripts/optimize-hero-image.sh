#!/bin/bash

# Image Optimization Script for Hero Section
# This script optimizes the hero image for better web performance

echo "🎨 Hero Image Optimization Script"
echo "=================================="
echo ""

IMAGE_PATH="public/images/hero-section.jpg"

if [ ! -f "$IMAGE_PATH" ]; then
    echo "❌ Error: Image not found at $IMAGE_PATH"
    exit 1
fi

echo "📊 Current image info:"
ls -lh "$IMAGE_PATH"
echo ""

# Check if ImageMagick is installed
if command -v convert &> /dev/null; then
    echo "✅ ImageMagick found"
    echo ""
    echo "🔧 Optimizing image..."
    
    # Create backup
    cp "$IMAGE_PATH" "${IMAGE_PATH}.backup"
    echo "✅ Backup created: ${IMAGE_PATH}.backup"
    
    # Optimize JPG (reduce quality to 85%, strip metadata)
    convert "$IMAGE_PATH" -quality 85 -strip "${IMAGE_PATH}.optimized.jpg"
    
    # Generate WebP version
    convert "$IMAGE_PATH" -quality 85 -define webp:method=6 "public/images/hero-section.webp"
    
    echo "✅ Optimized JPG created"
    echo "✅ WebP version created"
    echo ""
    
    echo "📊 Optimized sizes:"
    ls -lh "${IMAGE_PATH}.optimized.jpg"
    ls -lh "public/images/hero-section.webp"
    
    echo ""
    echo "💡 To use optimized image, run:"
    echo "   mv ${IMAGE_PATH}.optimized.jpg $IMAGE_PATH"
    
elif command -v sips &> /dev/null; then
    echo "✅ sips found (macOS native)"
    echo ""
    echo "🔧 Optimizing image with sips..."
    
    # Create backup
    cp "$IMAGE_PATH" "${IMAGE_PATH}.backup"
    echo "✅ Backup created: ${IMAGE_PATH}.backup"
    
    # Optimize with sips (macOS)
    sips -s format jpeg -s formatOptions 85 "$IMAGE_PATH" --out "${IMAGE_PATH}.optimized.jpg"
    
    echo "✅ Optimized JPG created"
    echo ""
    
    echo "📊 Optimized size:"
    ls -lh "${IMAGE_PATH}.optimized.jpg"
    
    echo ""
    echo "💡 To use optimized image, run:"
    echo "   mv ${IMAGE_PATH}.optimized.jpg $IMAGE_PATH"
    
else
    echo "⚠️  No image optimization tool found"
    echo ""
    echo "📝 Please install one of the following:"
    echo "   • ImageMagick: brew install imagemagick"
    echo "   • Or use online tools:"
    echo "     - TinyPNG: https://tinypng.com"
    echo "     - Squoosh: https://squoosh.app"
    echo ""
    echo "💡 Recommended settings:"
    echo "   • Quality: 85%"
    echo "   • Format: WebP or optimized JPG"
    echo "   • Target size: < 200KB"
fi

echo ""
echo "✨ Done!"
