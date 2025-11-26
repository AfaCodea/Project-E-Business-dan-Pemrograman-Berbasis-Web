import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiHeart, FiShoppingCart, FiMinus, FiPlus, FiStar } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';

const ProductDetailContainer = styled.div`
  min-height: 100vh;
  background: white;
  padding: 40px 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-weight: 500;
  margin-bottom: 30px;
  transition: color 0.3s ease;

  &:hover {
    color: #000;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ProductImages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MainImage = styled.div`
  width: 100%;
  height: 500px;
  border-radius: 12px;
  background: url(${props => props.bgImage}) center/cover;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 400px;
  }
`;

const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 80px;
  border-radius: 8px;
  background: url(${props => props.bgImage}) center/cover;
  cursor: pointer;
  border: 2px solid ${props => props.active ? '#667eea' : 'transparent'};
  transition: all 0.3s ease;

  &:hover {
    border-color: #667eea;
  }
`;

const ProductInfo = styled.div`
  padding: 20px 0;
`;

const ProductTitle = styled.h1`
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 16px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const ProductPrice = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #000;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const Stars = styled.div`
  display: flex;
  gap: 2px;
`;

const Star = styled(FiStar)`
  color: ${props => props.filled ? '#FFD700' : '#ddd'};
  font-size: 16px;
`;

const RatingText = styled.span`
  color: #666;
  font-size: 14px;
`;

const ProductDescription = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #666;
  margin-bottom: 30px;
`;

const SizeSelector = styled.div`
  margin-bottom: 30px;
`;

const SizeLabel = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
`;

const SizeOptions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const SizeOption = styled.button`
  padding: 12px 20px;
  border: 2px solid ${props => props.selected ? '#667eea' : '#e9ecef'};
  background: ${props => props.selected ? '#f8f9ff' : 'white'};
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    border-color: #667eea;
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
`;

const QuantityLabel = styled.label`
  font-weight: 600;
  color: #333;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 8px 12px;
`;

const QuantityButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background: #e9ecef;
  }
`;

const Quantity = styled.span`
  font-weight: 600;
  min-width: 40px;
  text-align: center;
  font-size: 16px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const AddToCartButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #000;
  color: white;
  border: none;
  padding: 16px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;

  &:hover {
    background: #333;
    transform: translateY(-2px);
  }
`;

const WishlistButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: transparent;
  color: #333;
  border: 2px solid #e9ecef;
  padding: 16px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #ff4757;
    color: #ff4757;
  }
`;

const ProductFeatures = styled.div`
  border-top: 1px solid #eee;
  padding-top: 30px;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  color: #666;
  font-size: 14px;

  &::before {
    content: '✓';
    color: #2ed573;
    font-weight: bold;
  }
`;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock product data - in real app, this would come from API
  const product = {
    id: parseInt(id),
    name: 'Casual Shoe',
    price: 225,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'shoes',
    rating: 4.5,
    reviews: 128,
    description: 'Sepatu kasual yang nyaman untuk aktivitas sehari-hari. Dibuat dengan bahan berkualitas tinggi dan desain yang stylish. Cocok untuk berbagai kesempatan, dari jalan-jalan santai hingga meeting bisnis.',
    sizes: ['S', 'M', 'L', 'XL'],
    features: [
      'Bahan berkualitas tinggi',
      'Desain yang stylish dan modern',
      'Nyaman dipakai seharian',
      'Mudah dibersihkan',
      'Tersedia dalam berbagai ukuran',
      'Garansi 1 tahun'
    ]
  };

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      image: product.images[0],
      size: selectedSize,
      quantity: quantity
    };
    
    addToCart(cartItem);
    toast.success(`${product.name} ditambahkan ke keranjang!`);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const sizes = ['S', 'M', 'L', 'XL'];

  return (
    <>
      <Header />
      <ProductDetailContainer>
        <Container>
          <BackButton onClick={() => navigate(-1)}>
            <FiArrowLeft size={20} />
            Kembali
          </BackButton>

          <ProductGrid>
            <ProductImages>
              <MainImage bgImage={product.images[selectedImage]} />
              <ThumbnailGrid>
                {product.images.map((image, index) => (
                  <Thumbnail
                    key={index}
                    bgImage={image}
                    active={selectedImage === index}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </ThumbnailGrid>
            </ProductImages>

            <ProductInfo>
              <ProductTitle>{product.name}</ProductTitle>
              <ProductPrice>${product.price}</ProductPrice>
              
              <ProductRating>
                <Stars>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} filled={i < Math.floor(product.rating)} />
                  ))}
                </Stars>
                <RatingText>({product.reviews} ulasan)</RatingText>
              </ProductRating>

              <ProductDescription>{product.description}</ProductDescription>

              <SizeSelector>
                <SizeLabel>Ukuran:</SizeLabel>
                <SizeOptions>
                  {sizes.map(size => (
                    <SizeOption
                      key={size}
                      selected={selectedSize === size}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </SizeOption>
                  ))}
                </SizeOptions>
              </SizeSelector>

              <QuantitySelector>
                <QuantityLabel>Jumlah:</QuantityLabel>
                <QuantityControl>
                  <QuantityButton onClick={() => handleQuantityChange(quantity - 1)}>
                    <FiMinus size={16} />
                  </QuantityButton>
                  <Quantity>{quantity}</Quantity>
                  <QuantityButton onClick={() => handleQuantityChange(quantity + 1)}>
                    <FiPlus size={16} />
                  </QuantityButton>
                </QuantityControl>
              </QuantitySelector>

              <ActionButtons>
                <AddToCartButton onClick={handleAddToCart}>
                  <FiShoppingCart size={20} />
                  Tambah ke Keranjang
                </AddToCartButton>
                <WishlistButton>
                  <FiHeart size={20} />
                  Wishlist
                </WishlistButton>
              </ActionButtons>

              <ProductFeatures>
                <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: '600' }}>
                  Fitur Produk:
                </h3>
                <FeatureList>
                  {product.features.map((feature, index) => (
                    <FeatureItem key={index}>{feature}</FeatureItem>
                  ))}
                </FeatureList>
              </ProductFeatures>
            </ProductInfo>
          </ProductGrid>
        </Container>
      </ProductDetailContainer>
      <Footer />
    </>
  );
};

export default ProductDetail;
