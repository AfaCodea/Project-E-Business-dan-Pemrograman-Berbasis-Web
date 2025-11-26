import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

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

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const BlogCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
`;

const BlogImage = styled.div`
  width: 100%;
  height: 250px;
  background: url(${props => props.bgImage}) center/cover;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 200px;
  }
`;

const BlogContent = styled.div`
  padding: 30px;
`;

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 16px;
  font-size: 14px;
  color: #666;
`;

const BlogDate = styled.span`
  background: #f8f9fa;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 500;
`;

const BlogCategory = styled.span`
  color: #667eea;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const BlogTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #333;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const BlogExcerpt = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 24px;
`;

const ReadMoreButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #000;
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    background: #333;
    transform: translateY(-1px);
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(4px);
  }
`;

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'How to combine your daily outfit to looks fresh and cool',
      excerpt: 'Pelajari tips dan trik untuk menciptakan kombinasi outfit harian yang fresh dan cool. Dari pemilihan warna hingga aksesori yang tepat.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      date: '15 Mar 2024',
      category: 'Fashion Tips',
      link: '/blog/daily-outfit-combination'
    }
  ];

  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTitle>From The Blog</SectionTitle>
          <SectionSubtitle>
            Dapatkan inspirasi dan tips fashion terbaru dari blog kami
          </SectionSubtitle>
        </SectionHeader>

        <BlogGrid>
          {blogPosts.map((post, index) => (
            <BlogCard
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <BlogImage bgImage={post.image} />
              <BlogContent>
                <BlogMeta>
                  <BlogDate>{post.date}</BlogDate>
                  <BlogCategory>{post.category}</BlogCategory>
                </BlogMeta>
                <BlogTitle>{post.title}</BlogTitle>
                <BlogExcerpt>{post.excerpt}</BlogExcerpt>
                <ReadMoreButton to={post.link}>
                  READ MORE
                  <FiArrowRight size={16} />
                </ReadMoreButton>
              </BlogContent>
            </BlogCard>
          ))}
        </BlogGrid>
      </Container>
    </Section>
  );
};

export default BlogSection;
