import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import CasualInspirations from '../components/CasualInspirations';
import ColorExplorer from '../components/ColorExplorer';
import Testimonial from '../components/Testimonial';
import Benefits from '../components/Benefits';
import BlogSection from '../components/BlogSection';
import StatusBadge from '../components/StatusBadge';
import Progress from '../components/Progress';

const HomeContainer = styled.div`
  min-height: 100vh;
  background: white;
`;

const Home = () => {
  // Sample data untuk produk trending
  const trendingProducts = [
    {
      id: 1,
      name: 'Premium Casual Sneakers',
      price: 225,
      originalPrice: 280,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 5,
      reviews: 128
    },
    {
      id: 2,
      name: 'Urban Skateboard Shoes',
      price: 125,
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 4,
      reviews: 89,
      isNew: true
    },
    {
      id: 3,
      name: 'Professional Basketball Shoes',
      price: 199,
      originalPrice: 250,
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 5,
      reviews: 156
    },
    {
      id: 4,
      name: 'Athletic Sportswear Shoes',
      price: 99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 4,
      reviews: 67,
      isNew: true
    },
    {
      id: 5,
      name: 'High-Performance Running Shoes',
      price: 149,
      originalPrice: 180,
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 5,
      reviews: 203,
      isNew: true
    },
    {
      id: 6,
      name: 'Modern Lifestyle Sneakers',
      price: 179,
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 4,
      reviews: 94,
      isNew: true
    },
    {
      id: 7,
      name: 'Classic Leather Boots',
      price: 299,
      originalPrice: 350,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 5,
      reviews: 87,
      isNew: true
    },
    {
      id: 8,
      name: 'Minimalist Canvas Shoes',
      price: 89,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 4,
      reviews: 156,
      isNew: true
    },
    {
      id: 9,
      name: 'Sporty Running Shoes',
      price: 129,
      originalPrice: 160,
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 5,
      reviews: 234,
      isNew: true
    },
    {
      id: 10,
      name: 'Casual Slip-On Shoes',
      price: 79,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 4,
      reviews: 98,
      isNew: true
    },
    {
      id: 11,
      name: 'Premium Leather Sneakers',
      price: 249,
      originalPrice: 300,
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 5,
      reviews: 167,
      isNew: true
    },
    {
      id: 12,
      name: 'Comfort Walking Shoes',
      price: 109,
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 4,
      reviews: 145,
      isNew: true
    },
    {
      id: 13,
      name: 'Elegant Dress Shoes',
      price: 199,
      originalPrice: 250,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 5,
      reviews: 89,
      isNew: true
    },
    {
      id: 14,
      name: 'Trendy High-Top Sneakers',
      price: 159,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 4,
      reviews: 112,
      isNew: true
    },
    {
      id: 15,
      name: 'Classic Oxford Shoes',
      price: 229,
      originalPrice: 280,
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 5,
      reviews: 76,
      isNew: true
    },
    {
      id: 16,
      name: 'Sporty Training Shoes',
      price: 139,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 4,
      reviews: 134,
      isNew: true
    },
    {
      id: 17,
      name: 'Vintage Style Boots',
      price: 189,
      originalPrice: 220,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 5,
      reviews: 92,
      isNew: true
    },
    {
      id: 18,
      name: 'Lightweight Running Shoes',
      price: 119,
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 4,
      reviews: 156,
      isNew: true
    },
    {
      id: 19,
      name: 'Fashionable Loafers',
      price: 169,
      originalPrice: 200,
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 5,
      reviews: 78,
      isNew: true
    },
    {
      id: 20,
      name: 'Comfortable Slip-Ons',
      price: 99,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 4,
      reviews: 123,
      isNew: true
    },
    {
      id: 21,
      name: 'Premium Athletic Shoes',
      price: 179,
      originalPrice: 220,
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 5,
      reviews: 145,
      isNew: true
    },
    {
      id: 22,
      name: 'Stylish Canvas Sneakers',
      price: 89,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 4,
      reviews: 98,
      isNew: true
    },
    {
      id: 23,
      name: 'Elegant Dress Boots',
      price: 219,
      originalPrice: 260,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 5,
      reviews: 67,
      isNew: true
    },
    {
      id: 24,
      name: 'Casual Weekend Shoes',
      price: 109,
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 4,
      reviews: 112,
      isNew: true
    },
    {
      id: 25,
      name: 'Professional Work Shoes',
      price: 189,
      originalPrice: 230,
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 5,
      reviews: 89,
      isNew: true
    },
    {
      id: 26,
      name: 'Trendy Street Sneakers',
      price: 149,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 4,
      reviews: 134,
      isNew: true
    },
    {
      id: 27,
      name: 'Classic Derby Shoes',
      price: 199,
      originalPrice: 240,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 5,
      reviews: 76,
      isNew: true
    },
    {
      id: 28,
      name: 'Sporty Cross-Training Shoes',
      price: 129,
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 4,
      reviews: 156,
      isNew: true
    },
    {
      id: 29,
      name: 'Fashionable Ankle Boots',
      price: 179,
      originalPrice: 210,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 5,
      reviews: 98,
      isNew: true
    },
    {
      id: 30,
      name: 'Comfortable Everyday Sneakers',
      price: 119,
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 4,
      reviews: 167,
      isNew: true
    },
    {
      id: 31,
      name: 'Premium Leather Loafers',
      price: 239,
      originalPrice: 280,
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 5,
      reviews: 89,
      isNew: true
    },
    {
      id: 32,
      name: 'Modern Athletic Sneakers',
      price: 159,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 4,
      reviews: 145,
      isNew: true
    },
    {
      id: 33,
      name: 'Classic Wingtip Shoes',
      price: 209,
      originalPrice: 250,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 5,
      reviews: 67,
      isNew: true
    },
    {
      id: 34,
      name: 'Versatile Canvas Shoes',
      price: 99,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 4,
      reviews: 123,
      isNew: true
    },
    {
      id: 35,
      name: 'Elegant Monk Strap Shoes',
      price: 229,
      originalPrice: 270,
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 5,
      reviews: 54,
      isNew: true
    },
    {
      id: 36,
      name: 'Casual Weekend Sneakers',
      price: 139,
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 4,
      reviews: 178,
      isNew: true
    },
    {
      id: 37,
      name: 'Premium Suede Boots',
      price: 199,
      originalPrice: 240,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 5,
      reviews: 89,
      isNew: true
    },
    {
      id: 38,
      name: 'Sporty Running Sneakers',
      price: 149,
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 4,
      reviews: 156,
      isNew: true
    },
    {
      id: 39,
      name: 'Classic Brogue Shoes',
      price: 219,
      originalPrice: 260,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 5,
      reviews: 67,
      isNew: true
    },
    {
      id: 40,
      name: 'Trendy High-Top Sneakers',
      price: 169,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 4,
      reviews: 134,
      isNew: true
    },
    {
      id: 41,
      name: 'Elegant Dress Shoes',
      price: 189,
      originalPrice: 230,
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 5,
      reviews: 89,
      isNew: true
    },
    {
      id: 42,
      name: 'Comfortable Walking Shoes',
      price: 119,
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 4,
      reviews: 167,
      isNew: true
    },
    {
      id: 43,
      name: 'Premium Leather Boots',
      price: 249,
      originalPrice: 290,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 5,
      reviews: 76,
      isNew: true
    },
    {
      id: 44,
      name: 'Sporty Training Sneakers',
      price: 139,
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 4,
      reviews: 145,
      isNew: true
    },
    {
      id: 45,
      name: 'Classic Oxford Boots',
      price: 199,
      originalPrice: 240,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 5,
      reviews: 67,
      isNew: true
    },
    {
      id: 46,
      name: 'Casual Slip-On Sneakers',
      price: 109,
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      rating: 4,
      reviews: 123,
      isNew: true
    }
  ];

  const categories = ['SHORTS', 'HAT', 'JACKETS', 'SNEAKERS', 'T-SHIRT'];

  return (
    <HomeContainer>
      <Header />
      <Hero />
      <CasualInspirations />
      <ProductGrid 
        title="Trending Products"
        subtitle="Discover our most popular and highly-rated products that customers love"
        products={trendingProducts}
        categories={categories}
      />
      <ColorExplorer />
      <Testimonial />
      <Benefits />
      <BlogSection />
      <Footer />
    </HomeContainer>
  );
};

export default Home;
