import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiHeart, FiPhone, FiRefreshCw } from 'react-icons/fi';

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
  margin: 0 auto;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const BenefitCard = styled(motion.div)`
  background: white;
  padding: 40px 30px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
`;

const BenefitIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  color: white;
  font-size: 32px;
`;

const BenefitTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const BenefitDescription = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.6;
`;

const Benefits = () => {
  const benefits = [
    {
      id: 1,
      icon: <FiHeart />,
      title: 'Take care with love',
      description: 'Setiap produk kami dipilih dengan cinta dan perhatian detail untuk memastikan kualitas terbaik untuk Anda.'
    },
    {
      id: 2,
      icon: <FiPhone />,
      title: 'Friendly Customer Service',
      description: 'Tim customer service kami siap membantu Anda 24/7 dengan senyuman dan solusi terbaik untuk kebutuhan Anda.'
    },
    {
      id: 3,
      icon: <FiRefreshCw />,
      title: 'Refund Process',
      description: 'Proses refund yang mudah dan cepat. Jika Anda tidak puas, kami akan mengembalikan uang Anda tanpa ribet.'
    }
  ];

  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTitle>Why you'll love to shop on our website</SectionTitle>
          <SectionSubtitle>
            Kami berkomitmen memberikan pengalaman berbelanja terbaik dengan layanan berkualitas tinggi
          </SectionSubtitle>
        </SectionHeader>

        <BenefitsGrid>
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={benefit.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <BenefitIcon>
                {benefit.icon}
              </BenefitIcon>
              <BenefitTitle>{benefit.title}</BenefitTitle>
              <BenefitDescription>{benefit.description}</BenefitDescription>
            </BenefitCard>
          ))}
        </BenefitsGrid>
      </Container>
    </Section>
  );
};

export default Benefits;
