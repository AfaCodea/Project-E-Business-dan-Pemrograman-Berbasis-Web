import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowRight, FiStar } from 'react-icons/fi';

const HeroContainer = styled.section`
  padding: 80px 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="%23e2e8f0" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
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

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (max-width: 480px) {
    gap: 1.5rem;
  }
`;

const MainBanner = styled(motion.div)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  border-radius: 24px;
  padding: 4rem 3rem;
  color: white;
  position: relative;
  overflow: hidden;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    animation: float 6s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    padding: 3rem 2rem;
    min-height: 400px;
  }

  @media (max-width: 480px) {
    padding: 2rem 1.5rem;
    min-height: 350px;
    border-radius: 16px;
  }
`;

const BannerImage = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background: url('https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80') center/cover;
  opacity: 0.2;
  border-radius: 0 24px 24px 0;
  filter: brightness(1.2) contrast(1.1);

  @media (max-width: 768px) {
    width: 100%;
    opacity: 0.15;
  }
`;

const BannerContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 500px;
`;

const Badge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const BannerTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const BannerSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.95;
  line-height: 1.6;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const BannerButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  color: #4f46e5;
  padding: 1rem 2rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    background: white;
  }
`;

const SideBanners = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SideBanner = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.15), 0 10px 20px -5px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    min-height: 180px;
    padding: 1.5rem;
  }
`;

const SideBannerImage = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 45%;
  height: 100%;
  background: url(${props => props.bgImage}) center/cover;
  opacity: 0.7;
  border-radius: 0 20px 20px 0;
  filter: brightness(1.1) contrast(1.1);
`;

const SideBannerContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 220px;
`;

const SideBannerTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const SideBannerSubtitle = styled.p`
  font-size: 0.9rem;
  color: var(--text-tertiary);
  margin-bottom: 1.25rem;
  line-height: 1.5;
`;

const SideBannerButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
  }
`;

const StatsContainer = styled(motion.div)`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// Animations
const floatAnimation = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }
`;

const Hero = () => {
  return (
    <>
      <style>{floatAnimation}</style>
      <HeroContainer>
        <Container>
          <HeroGrid>
            <MainBanner
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <BannerImage />
              <BannerContent>
                <Badge
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <FiStar size={16} />
                  New Collection 2024
                </Badge>
                <BannerTitle>Color of Summer Outfit</BannerTitle>
                <BannerSubtitle>
                  Discover the latest fashion trends and create your perfect summer look with our curated collection of premium clothing and accessories.
                </BannerSubtitle>
                <BannerButton to="/products?category=summer">
                  VIEW COLLECTION
                  <FiArrowRight size={18} />
                </BannerButton>
                <StatsContainer
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <StatItem>
                    <StatNumber>10K+</StatNumber>
                    <StatLabel>Happy Customers</StatLabel>
                  </StatItem>
                  <StatItem>
                    <StatNumber>500+</StatNumber>
                    <StatLabel>Products</StatLabel>
                  </StatItem>
                  <StatItem>
                    <StatNumber>50+</StatNumber>
                    <StatLabel>Brands</StatLabel>
                  </StatItem>
                </StatsContainer>
              </BannerContent>
            </MainBanner>

            <SideBanners>
              <SideBanner
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
              >
                <SideBannerImage bgImage="https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" />
                <SideBannerContent>
                  <SideBannerTitle>Outdoor Active</SideBannerTitle>
                  <SideBannerSubtitle>Perfect for your active lifestyle and outdoor adventures</SideBannerSubtitle>
                  <SideBannerButton to="/products?category=active">
                    SHOP NOW
                    <FiArrowRight size={14} />
                  </SideBannerButton>
                </SideBannerContent>
              </SideBanner>

              <SideBanner
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
              >
                <SideBannerImage bgImage="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" />
                <SideBannerContent>
                  <SideBannerTitle>Casual Comfort</SideBannerTitle>
                  <SideBannerSubtitle>Relaxed style for everyday wear and comfort</SideBannerSubtitle>
                  <SideBannerButton to="/products?category=casual">
                    EXPLORE
                    <FiArrowRight size={14} />
                  </SideBannerButton>
                </SideBannerContent>
              </SideBanner>
            </SideBanners>
          </HeroGrid>
        </Container>
      </HeroContainer>
    </>
  );
};

export default Hero;
