import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

const Section = styled.section`
  padding: 80px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const TestimonialContent = styled.div`
  h2 {
    font-size: 48px;
    font-weight: 800;
    margin-bottom: 20px;
    line-height: 1.1;

    @media (max-width: 768px) {
      font-size: 32px;
    }
  }

  p {
    font-size: 18px;
    opacity: 0.9;
    line-height: 1.6;
    margin-bottom: 30px;

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }
`;

const CustomerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
`;

const CustomerImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: url(${props => props.bgImage}) center/cover;
  border: 3px solid rgba(255, 255, 255, 0.3);
`;

const CustomerDetails = styled.div`
  h4 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 4px;
  }

  p {
    font-size: 14px;
    opacity: 0.8;
    margin: 0;
  }
`;

const TestimonialImage = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 12px;
  background: url(${props => props.bgImage}) center/cover;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const StarRating = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 20px;
`;

const Star = styled(FiStar)`
  color: #FFD700;
  font-size: 20px;
`;

const Testimonial = () => {
  return (
    <Section>
      <Container>
        <TestimonialGrid>
          <TestimonialContent>
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              What people said
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Love the way they handle the order.
            </motion.p>
            
            <StarRating>
              {[...Array(5)].map((_, i) => (
                <Star key={i} />
              ))}
            </StarRating>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p style={{ fontStyle: 'italic', fontSize: '16px', marginBottom: '20px' }}>
                "Pelayanan yang luar biasa! Produk berkualitas tinggi dan pengiriman yang sangat cepat. 
                Saya sangat puas dengan pembelian saya dan pasti akan berbelanja lagi di sini."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <CustomerInfo>
                <CustomerImage bgImage="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" />
                <CustomerDetails>
                  <h4>Samantha Williams</h4>
                  <p>Verified Customer</p>
                </CustomerDetails>
              </CustomerInfo>
            </motion.div>
          </TestimonialContent>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <TestimonialImage bgImage="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" />
          </motion.div>
        </TestimonialGrid>
      </Container>
    </Section>
  );
};

export default Testimonial;
