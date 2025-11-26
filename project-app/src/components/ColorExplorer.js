import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  padding: 80px 0;
  background: white;
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
  margin: 0 auto;
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 15px;
  }
`;

const ColorCard = styled(motion.div)`
  aspect-ratio: 1;
  border-radius: 50%;
  background: ${props => props.color};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const ColorLabel = styled.div`
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  font-weight: 600;
  color: #333;
  text-align: center;
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 10px;
    bottom: -25px;
  }
`;

const ColorExplorer = () => {
  const [selectedColor, setSelectedColor] = useState(null);

  const colors = [
    { name: 'RED PASTEL', color: '#FFB3BA' },
    { name: 'LIME GREEN', color: '#BAFFC9' },
    { name: 'NAVY BLUE', color: '#1E3A8A' },
    { name: 'CLEAN WHITE', color: '#FFFFFF' },
    { name: 'BLUE SKY', color: '#87CEEB' },
    { name: 'PURPLE', color: '#B19CD9' },
    { name: 'PINK', color: '#FFB3E6' },
    { name: 'YELLOW', color: '#FFFFBA' },
    { name: 'DARK GREEN', color: '#2D5016' }
  ];

  const handleColorClick = (color) => {
    setSelectedColor(color);
    // Navigate to products filtered by color
    console.log('Selected color:', color);
  };

  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTitle>Explore by Colors</SectionTitle>
          <SectionSubtitle>
            Temukan produk favorit Anda berdasarkan warna yang Anda sukai
          </SectionSubtitle>
        </SectionHeader>

        <ColorGrid>
          {colors.map((color, index) => (
            <ColorCard
              key={color.name}
              color={color.color}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleColorClick(color)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ColorLabel>{color.name}</ColorLabel>
            </ColorCard>
          ))}
        </ColorGrid>
      </Container>
    </Section>
  );
};

export default ColorExplorer;
