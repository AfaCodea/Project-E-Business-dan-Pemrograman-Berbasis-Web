import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMail, FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiArrowRight, FiMapPin, FiPhone, FiClock } from 'react-icons/fi';
import toast from 'react-hot-toast';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  color: white;
  padding: 80px 0 30px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%23334155" stroke-width="0.5" opacity="0.3"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
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

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (max-width: 480px) {
    gap: 1.5rem;
  }
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: white;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 30px;
      height: 2px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 1px;
    }
  }

  p {
    color: #cbd5e1;
    line-height: 1.7;
    margin-bottom: 1rem;
    font-size: 0.95rem;
  }
`;

const Logo = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
  letter-spacing: 1px;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #cbd5e1;
  font-size: 0.9rem;
  
  svg {
    color: #667eea;
    flex-shrink: 0;
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 0.875rem 1rem;
  border: 2px solid #334155;
  border-radius: 12px;
  background: rgba(51, 65, 85, 0.5);
  backdrop-filter: blur(10px);
  color: white;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const NewsletterButton = styled(motion.button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.875rem 1.5rem;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 0.75rem;
  }

  a {
    color: #cbd5e1;
    text-decoration: none;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0;

    &:hover {
      color: #667eea;
      padding-left: 0.5rem;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: rgba(51, 65, 85, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid #334155;
  border-radius: 12px;
  color: #cbd5e1;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-color: transparent;
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #334155;
  padding-top: 2rem;
  text-align: center;
  color: #94a3b8;
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const FooterBottomLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
  
  a {
    color: #94a3b8;
    text-decoration: none;
    font-size: 0.85rem;
    transition: color 0.3s ease;
    
    &:hover {
      color: #667eea;
    }
  }
`;

const BackToTop = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  z-index: 1000;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
  }
`;

const Footer = () => {
  const [email, setEmail] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing to our newsletter!', {
        style: {
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          borderRadius: '12px',
          boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
        },
      });
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <FooterContainer>
      <Container>
        <FooterContent>
          <FooterSection>
            <Logo>FASHION</Logo>
            <p>
              Temukan koleksi fashion terbaru dan terbaik untuk gaya hidup Anda. 
              Kami menyediakan pakaian berkualitas tinggi dengan desain yang trendi dan modern.
            </p>
            <ContactInfo>
              <ContactItem>
                <FiMapPin size={16} />
                <span>123 Fashion Street, Jakarta 12345</span>
              </ContactItem>
              <ContactItem>
                <FiPhone size={16} />
                <span>+62 123 456 7890</span>
              </ContactItem>
              <ContactItem>
                <FiClock size={16} />
                <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
              </ContactItem>
            </ContactInfo>
            <NewsletterForm onSubmit={handleNewsletterSubmit}>
              <NewsletterInput
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <NewsletterButton 
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
                <FiArrowRight size={16} />
              </NewsletterButton>
            </NewsletterForm>
            <SocialLinks>
              <SocialLink 
                href="#" 
                aria-label="Facebook"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiFacebook size={18} />
              </SocialLink>
              <SocialLink 
                href="#" 
                aria-label="Twitter"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiTwitter size={18} />
              </SocialLink>
              <SocialLink 
                href="#" 
                aria-label="Instagram"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiInstagram size={18} />
              </SocialLink>
              <SocialLink 
                href="#" 
                aria-label="YouTube"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiYoutube size={18} />
              </SocialLink>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <h3>POPULAR</h3>
            <FooterLinks>
              <li><a href="/products?category=men">Men's Clothing</a></li>
              <li><a href="/products?category=women">Women's Clothing</a></li>
              <li><a href="/products?category=shoes">Shoes</a></li>
              <li><a href="/products?category=accessories">Accessories</a></li>
              <li><a href="/products?sale=true">Sale Items</a></li>
              <li><a href="/products?category=trending">Trending Now</a></li>
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <h3>VIEW ALL</h3>
            <FooterLinks>
              <li><a href="/products">All Products</a></li>
              <li><a href="/products?category=new">New Arrivals</a></li>
              <li><a href="/products?category=best-seller">Best Sellers</a></li>
              <li><a href="/products?category=limited">Limited Edition</a></li>
              <li><a href="/products?category=premium">Premium Collection</a></li>
              <li><a href="/products?category=summer">Summer Collection</a></li>
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <h3>INFO</h3>
            <FooterLinks>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/shipping">Shipping Info</a></li>
              <li><a href="/returns">Returns & Exchanges</a></li>
              <li><a href="/size-guide">Size Guide</a></li>
              <li><a href="/faq">FAQ</a></li>
            </FooterLinks>
          </FooterSection>
        </FooterContent>

        <FooterBottom>
          <p>&copy; 2024 FASHION. All rights reserved.</p>
          <FooterBottomLinks>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/cookies">Cookie Policy</a>
          </FooterBottomLinks>
        </FooterBottom>
      </Container>

      {showBackToTop && (
        <BackToTop
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ↑
        </BackToTop>
      )}
    </FooterContainer>
  );
};

export default Footer;
