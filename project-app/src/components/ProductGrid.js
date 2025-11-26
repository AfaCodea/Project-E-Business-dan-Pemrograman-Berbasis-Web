import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiEye, FiStar, FiTag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import StatusBadge from './StatusBadge';

const Section = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="%23e2e8f0" opacity="0.3"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>');
    opacity: 0.5;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }

  @media (max-width: 480px) {
    padding: 0 0.75rem;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.25rem;
  }

  @media (max-width: 480px) {
    font-size: 1.875rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.125rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const CategoryTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 0.5rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    gap: 0.25rem;
    margin-bottom: 1.5rem;
  }
`;

const Tab = styled(motion.button)`
  background: ${props => props.active ? 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)' : 'transparent'};
  color: ${props => props.active ? 'white' : 'var(--text-secondary)'};
  border: 2px solid ${props => props.active ? 'transparent' : 'var(--gray-200)'};
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    background: ${props => props.active ? 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-color) 100%)' : 'var(--gray-50)'};
    border-color: ${props => props.active ? 'transparent' : 'var(--primary-color)'};
    color: ${props => props.active ? 'white' : 'var(--primary-color)'};
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const ProductCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.8);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
`;

const ProductImage = styled.div`
  width: 100%;
  height: 280px;
  background: url(${props => props.bgImage}) center/cover;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;

  ${ProductCard}:hover & {
    transform: scale(1.05);
  }
`;

const ProductOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.8) 0%, rgba(236, 72, 153, 0.8) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  ${ProductCard}:hover & {
    opacity: 1;
  }
`;

const QuickViewButton = styled.button`
  background: white;
  color: var(--primary-color);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const ProductActions = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ProductCard}:hover & {
    opacity: 1;
  }
`;

const ActionButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  color: var(--text-secondary);

  &:hover {
    background: white;
    color: var(--primary-color);
    transform: scale(1.1);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  &.active {
    background: var(--error-color);
    color: white;
  }
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
`;

const ProductName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  line-height: 1.4;
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

const CurrentPrice = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-color);
`;

const OriginalPrice = styled.span`
  font-size: 1rem;
  color: var(--text-tertiary);
  text-decoration: line-through;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
`;

const Star = styled(FiStar)`
  color: ${props => props.filled ? '#fbbf24' : '#d1d5db'};
  font-size: 0.875rem;
`;

const RatingText = styled.span`
  font-size: 0.875rem;
  color: var(--text-tertiary);
  margin-left: 0.25rem;
`;

const ProductBadges = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 2;
`;

const SaleBadge = styled.div`
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const NewBadge = styled.div`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
`;

const ViewAllButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  margin: 0 auto;
  text-align: center;
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(99, 102, 241, 0.4);
  }
`;

const ProductGridComponent = ({ title, subtitle, products, categories }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [wishlist, setWishlist] = useState(new Set());
  const { addToCart } = useCart();

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === category));
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} ditambahkan ke keranjang!`, {
      style: {
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: 'white',
        borderRadius: '12px',
        boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
      },
    });
  };

  const handleWishlistToggle = (productId) => {
    const newWishlist = new Set(wishlist);
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId);
      toast.success('Removed from wishlist');
    } else {
      newWishlist.add(productId);
      toast.success('Added to wishlist', {
        style: {
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          color: 'white',
          borderRadius: '12px',
          boxShadow: '0 8px 25px rgba(239, 68, 68, 0.3)',
        },
      });
    }
    setWishlist(newWishlist);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} filled={i < rating} />
    ));
  };

  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTitle>{title}</SectionTitle>
          {subtitle && <SectionSubtitle>{subtitle}</SectionSubtitle>}
        </SectionHeader>

        {categories && (
          <CategoryTabs>
            <Tab 
              active={activeCategory === 'all'} 
              onClick={() => handleCategoryChange('all')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All
            </Tab>
            {categories.map(category => (
              <Tab 
                key={category}
                active={activeCategory === category} 
                onClick={() => handleCategoryChange(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </Tab>
            ))}
          </CategoryTabs>
        )}

        <ProductGrid>
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                layout
              >
                <ProductImage bgImage={product.image}>
                  <ProductBadges>
                    {product.originalPrice && (
                      <SaleBadge>
                        <FiTag size={10} />
                        Sale
                      </SaleBadge>
                    )}
                    {product.isNew && (
                      <NewBadge>New</NewBadge>
                    )}
                  </ProductBadges>
                  <ProductOverlay>
                    <QuickViewButton>
                      <FiEye size={16} />
                      Quick View
                    </QuickViewButton>
                  </ProductOverlay>
                  <ProductActions>
                    <ActionButton
                      className={wishlist.has(product.id) ? 'active' : ''}
                      onClick={() => handleWishlistToggle(product.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiHeart size={18} />
                    </ActionButton>
                    <ActionButton 
                      onClick={() => handleAddToCart(product)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiShoppingCart size={18} />
                    </ActionButton>
                  </ProductActions>
                </ProductImage>
                <ProductInfo>
                  <ProductName>{product.name}</ProductName>
                  <ProductPrice>
                    <CurrentPrice>${product.price}</CurrentPrice>
                    {product.originalPrice && (
                      <OriginalPrice>${product.originalPrice}</OriginalPrice>
                    )}
                  </ProductPrice>
                  <Rating>
                    {renderStars(product.rating || 4)}
                    <RatingText>({product.reviews || Math.floor(Math.random() * 100) + 10})</RatingText>
                  </Rating>
                </ProductInfo>
              </ProductCard>
            ))}
          </AnimatePresence>
        </ProductGrid>

        <div style={{ textAlign: 'center' }}>
          <ViewAllButton to="/products">
            VIEW ALL PRODUCTS
          </ViewAllButton>
        </div>
      </Container>
    </Section>
  );
};

export default ProductGridComponent;
