'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/products';
import { useCart } from '@/lib/cart-context';
import { toast } from '@/hooks/use-toast';
import ImageGallery from './ImageGallery';
import SizeSelector from './SizeSelector';
import QuantitySelector from './QuantitySelector';
import CheckoutDialog from '@/components/CheckoutDialog';

interface ProductDetailProps {
    product: Product;
}


const ProductDetail = ({ product }: ProductDetailProps) => {
    const [selectedSize, setSelectedSize] = useState<number | null>(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    const handleAddToCart = () => {
        if (!selectedSize && product.sizes && product.sizes.length > 0) {
            toast({
                title: "Size Required",
                description: "Please select a size",
            });
            return;
        }

        // Add to cart multiple times based on quantity (silently)
        for (let i = 0; i < quantity; i++) {
            addToCart(product, selectedSize || undefined, true);
        }

        // Show single toast after all items added
        const message = quantity > 1
            ? `${quantity} × ${product.name} added to cart`
            : `${product.name} added to cart`;
        toast({
            title: "Added to Cart",
            description: message,
        });
    };

    const handleBuyNow = () => {
        if (!selectedSize && product.sizes && product.sizes.length > 0) {
            toast({
                title: "Size Required",
                description: "Please select a size",
            });
            return;
        }

        // Add to cart multiple times based on quantity (silently)
        for (let i = 0; i < quantity; i++) {
            addToCart(product, selectedSize || undefined, true);
        }

        setIsCheckoutOpen(true);
    };

    const images = product.images || [product.image];
    const sizes = product.sizes || [];
    const specs = product.specifications;

    return (
        <div className="product-detail-container">
            {/* Breadcrumb */}
            <nav className="breadcrumb">
                <Link href="/">Home</Link>
                <span className="breadcrumb-separator">/</span>
                <Link href="/shop">Shop</Link>
                <span className="breadcrumb-separator">/</span>
                <span className="breadcrumb-current">{product.name}</span>
            </nav>

            {/* Product Detail Grid */}
            <div className="product-detail-grid">
                {/* Image Gallery */}
                <div className="product-images">
                    <ImageGallery images={images} productName={product.name} />
                </div>

                {/* Product Info */}
                <div className="product-info">
                    <h1 className="product-title">{product.name}</h1>

                    {/* Rating */}
                    <div className="product-rating">
                        <div className="stars">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    className={`star ${i < product.rating ? 'filled' : ''}`}
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                >
                                    <path
                                        d="M10 1L12.5 7.5L19 8.5L14.5 13L15.5 19L10 16L4.5 19L5.5 13L1 8.5L7.5 7.5L10 1Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            ))}
                        </div>
                        <span className="rating-text">({product.rating}.0)</span>
                    </div>

                    {/* Price */}
                    <div className="product-price">Rp {product.price.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>

                    {/* Description */}
                    <p className="product-description">
                        {product.detailedDescription || product.description}
                    </p>

                    {/* Size Selector */}
                    {sizes.length > 0 && (
                        <SizeSelector
                            sizes={sizes}
                            selectedSize={selectedSize}
                            onSizeSelect={setSelectedSize}
                        />
                    )}

                    {/* Quantity Selector */}
                    <QuantitySelector
                        quantity={quantity}
                        onQuantityChange={setQuantity}
                    />

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
                        <button
                            onClick={handleAddToCart}
                            className="add-to-cart-btn flex-1 bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-all duration-300 mb-0 text-sm sm:text-base"
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={handleBuyNow}
                            className="add-to-cart-btn flex-1 bg-orange hover:bg-orange/90 border-none text-white mb-0 text-sm sm:text-base"
                        >
                            Buy Now
                        </button>
                    </div>

                    <CheckoutDialog
                        isOpen={isCheckoutOpen}
                        onClose={() => setIsCheckoutOpen(false)}
                    />

                    {/* Stock Status */}
                    {product.inStock !== undefined && (
                        <div className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                            {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                        </div>
                    )}

                    {/* Specifications */}
                    {specs && (
                        <div className="product-specifications">
                            <h3>Specifications</h3>
                            <dl className="specs-list">
                                {specs.material && (
                                    <>
                                        <dt>Material</dt>
                                        <dd>{specs.material}</dd>
                                    </>
                                )}
                                {specs.color && (
                                    <>
                                        <dt>Color</dt>
                                        <dd>{specs.color}</dd>
                                    </>
                                )}
                                {specs.weight && (
                                    <>
                                        <dt>Weight</dt>
                                        <dd>{specs.weight}</dd>
                                    </>
                                )}
                                {specs.sole && (
                                    <>
                                        <dt>Sole</dt>
                                        <dd>{specs.sole}</dd>
                                    </>
                                )}
                                {specs.style && (
                                    <>
                                        <dt>Style</dt>
                                        <dd>{specs.style}</dd>
                                    </>
                                )}
                            </dl>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
