'use client';

import React from 'react';

interface SizeSelectorProps {
    sizes: number[];
    selectedSize: number | null;
    onSizeSelect: (size: number) => void;
}

const SizeSelector = ({ sizes, selectedSize, onSizeSelect }: SizeSelectorProps) => {
    return (
        <div className="size-selector">
            <h3 className="size-selector-label">Select Size (US)</h3>
            <div className="size-options">
                {sizes.map((size) => (
                    <button
                        key={size}
                        onClick={() => onSizeSelect(size)}
                        className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                        aria-label={`Size ${size}`}
                    >
                        {size}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SizeSelector;
