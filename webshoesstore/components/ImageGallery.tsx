'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
    images: string[];
    productName: string;
}

const ImageGallery = ({ images, productName }: ImageGalleryProps) => {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="image-gallery">
            {/* Main Image */}
            <div className="main-image-container">
                <Image
                    src={images[selectedImage]}
                    alt={productName}
                    width={600}
                    height={600}
                    className="main-image"
                    priority
                />
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
                <div className="thumbnail-strip">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                            aria-label={`View image ${index + 1}`}
                        >
                            <Image
                                src={image}
                                alt={`${productName} view ${index + 1}`}
                                width={100}
                                height={100}
                                className="thumbnail-image"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageGallery;
