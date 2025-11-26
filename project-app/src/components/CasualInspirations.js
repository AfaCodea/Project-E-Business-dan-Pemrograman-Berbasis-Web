import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  padding: 80px 0;
  background: #f8f9fa;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 16px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 16px;
  color: #666;
  max-width: 600px;
  margin: 0 auto 30px;
`;

const BrowseButton = styled(Link)`
  display: inline-block;
  background: #000;
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;

  &:hover {
    background: #333;
    transform: translateY(-2px);
  }
`;

const InspirationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const InspirationCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 300px;
  background: url(${props => props.bgImage}) center/cover;
  position: relative;

  @media (max-width: 768px) {
    height: 250px;
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 30px 20px 20px;
  color: white;
`;

const CardTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const CardSubtitle = styled.p`
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 16px;
`;

const CardButton = styled(Link)`
  display: inline-block;
  background: white;
  color: #333;
  padding: 10px 20px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    background: #f8f9fa;
    transform: translateY(-1px);
  }
`;

const CasualInspirations = () => {
  const inspirations = [
    {
      id: 1,
      title: 'Say It With Shirt',
      subtitle: 'Express yourself with our statement tees',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      link: '/products?category=shirts'
    },
    {
      id: 2,
      title: 'Style Guide',
      subtitle: 'Discover the perfect outfit combinations',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      link: '/products?category=style-guide'
    },
    {
      id: 3,
      title: 'Funky never get old',
      subtitle: 'Bold styles that stand the test of time',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      link: '/products?category=funky'
    }
  ];

  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTitle>Casual Inspirations</SectionTitle>
          <SectionSubtitle>
            Temukan inspirasi gaya kasual yang sempurna untuk setiap kesempatan
          </SectionSubtitle>
          <BrowseButton to="/products?category=casual">
            BROWSE INSPIRATIONS
          </BrowseButton>
        </SectionHeader>

        <InspirationGrid>
          {inspirations.map((inspiration, index) => (
            <InspirationCard
              key={inspiration.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <CardImage bgImage={inspiration.image}>
                <CardOverlay>
                  <CardTitle>{inspiration.title}</CardTitle>
                  <CardSubtitle>{inspiration.subtitle}</CardSubtitle>
                  <CardButton to={inspiration.link}>
                    EXPLORE
                  </CardButton>
                </CardOverlay>
              </CardImage>
            </InspirationCard>
          ))}
        </InspirationGrid>
      </Container>
    </Section>
  );
};

export default CasualInspirations;
