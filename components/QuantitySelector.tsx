'use client';

import React from 'react';

interface QuantitySelectorProps {
    quantity: number;
    onQuantityChange: (quantity: number) => void;
    min?: number;
    max?: number;
}

const QuantitySelector = ({
    quantity,
    onQuantityChange,
    min = 1,
    max = 10
}: QuantitySelectorProps) => {
    const handleDecrease = () => {
        if (quantity > min) {
            onQuantityChange(quantity - 1);
        }
    };

    const handleIncrease = () => {
        if (quantity < max) {
            onQuantityChange(quantity + 1);
        }
    };

    return (
        <div className="quantity-selector">
            <h3 className="quantity-selector-label">Quantity</h3>
            <div className="quantity-controls">
                <button
                    onClick={handleDecrease}
                    disabled={quantity <= min}
                    className="quantity-btn"
                    aria-label="Decrease quantity"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>
                <span className="quantity-display">{quantity}</span>
                <button
                    onClick={handleIncrease}
                    disabled={quantity >= max}
                    className="quantity-btn"
                    aria-label="Increase quantity"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default QuantitySelector;
