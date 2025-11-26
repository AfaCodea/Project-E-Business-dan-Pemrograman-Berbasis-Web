import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { FiSearch, FiHeart, FiShoppingCart, FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const HeaderContainer = styled.header`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  
  &.scrolled {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
`;

const TopBar = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 8px 0;
  text-align: center;
  font-size: 14px;
  color: white;
  font-weight: 500;
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
    animation: shimmer 3s infinite;
  }
`;

const MainHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  max-width: 1400px;
  margin: 0 auto;
  padding-left: 2rem;
  padding-right: 2rem;
  
  @media (max-width: 768px) {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 15px;
    padding-bottom: 15px;
  }

  @media (max-width: 480px) {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    padding-top: 12px;
    padding-bottom: 12px;
  }
`;

const Logo = styled(Link)`
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  font-size: 15px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  position: relative;
  padding: 8px 0;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transition: width 0.3s ease;
  }

  &:hover {
    color: var(--primary-color);
    
    &::after {
      width: 100%;
    }
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 12px;
  border-radius: 50%;
  transition: all 0.3s ease;
  position: relative;
  color: var(--text-secondary);
  
  &:hover {
    background: var(--gray-100);
    color: var(--primary-color);
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    padding: 8px;
  }
`;

const CartBadge = styled(motion.span)`
  position: absolute;
  top: 4px;
  right: 4px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const UserButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.3s ease;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: var(--gray-100);
    color: var(--primary-color);
  }
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 1px solid var(--gray-200);
  padding: 8px;
  min-width: 200px;
  z-index: 1000;
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 12px 16px;
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 500;
  
  &:hover {
    background: var(--gray-100);
    color: var(--primary-color);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
  color: var(--text-secondary);
  
  &:hover {
    background: var(--gray-100);
    color: var(--primary-color);
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  z-index: 1001;
  padding: 2rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;

const MobileNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const MobileNavLink = styled(Link)`
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 16px 0;
  border-bottom: 1px solid var(--gray-200);
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
    padding-left: 1rem;
  }
`;

const SearchBar = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 1px solid var(--gray-200);
  padding: 1rem;
  width: 400px;
  z-index: 1000;
  
  @media (max-width: 768px) {
    width: 90%;
    left: 5%;
    transform: none;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--gray-200);
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getTotalItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowUserMenu(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  return (
    <HeaderContainer className={isScrolled ? 'scrolled' : ''}>
      <TopBar>
        🎉 Free shipping on orders over $100! Limited time offer.
      </TopBar>
      <MainHeader>
        <Logo to="/">FASHION</Logo>
        
        <Nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products?category=men">Men</NavLink>
          <NavLink to="/products?category=women">Women</NavLink>
          <NavLink to="/products?category=kids">Kids</NavLink>
          <NavLink to="/products?category=accessories">Accessories</NavLink>
          <NavLink to="/products?sale=true">Sale</NavLink>
        </Nav>

        <RightSection>
          <IconButton onClick={() => setShowSearch(!showSearch)}>
            <FiSearch size={20} />
          </IconButton>
          <IconButton>
            <FiHeart size={20} />
          </IconButton>
          <IconButton as={Link} to="/cart">
            <FiShoppingCart size={20} />
            <AnimatePresence>
              {getTotalItems() > 0 && (
                <CartBadge
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {getTotalItems()}
                </CartBadge>
              )}
            </AnimatePresence>
          </IconButton>
          
          {user ? (
            <UserMenu>
              <UserButton onClick={() => setShowUserMenu(!showUserMenu)}>
                <FiUser size={16} />
                {user.name}
              </UserButton>
              <AnimatePresence>
                {showUserMenu && (
                  <DropdownMenu
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {user.role === 'admin' && (
                      <DropdownItem to="/admin" onClick={() => setShowUserMenu(false)}>
                        <FiUser size={16} />
                        Admin Dashboard
                      </DropdownItem>
                    )}
                    <DropdownItem to="/profile" onClick={() => setShowUserMenu(false)}>
                      <FiUser size={16} />
                      Profile
                    </DropdownItem>
                    <DropdownItem as="button" onClick={handleLogout}>
                      <FiLogOut size={16} />
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                )}
              </AnimatePresence>
            </UserMenu>
          ) : (
            <Link to="/login" className="btn btn-ghost">
              Login
            </Link>
          )}

          <MobileMenuButton onClick={() => setIsMobileMenuOpen(true)}>
            <FiMenu size={24} />
          </MobileMenuButton>
        </RightSection>
      </MainHeader>

      <AnimatePresence>
        {showSearch && (
          <SearchBar
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <form onSubmit={handleSearch}>
              <SearchInput
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </form>
          </SearchBar>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <MobileMenuHeader>
              <Logo to="/">FASHION</Logo>
              <IconButton onClick={() => setIsMobileMenuOpen(false)}>
                <FiX size={24} />
              </IconButton>
            </MobileMenuHeader>
            
            <MobileNav>
              <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </MobileNavLink>
              <MobileNavLink to="/products?category=men" onClick={() => setIsMobileMenuOpen(false)}>
                Men
              </MobileNavLink>
              <MobileNavLink to="/products?category=women" onClick={() => setIsMobileMenuOpen(false)}>
                Women
              </MobileNavLink>
              <MobileNavLink to="/products?category=kids" onClick={() => setIsMobileMenuOpen(false)}>
                Kids
              </MobileNavLink>
              <MobileNavLink to="/products?category=accessories" onClick={() => setIsMobileMenuOpen(false)}>
                Accessories
              </MobileNavLink>
              <MobileNavLink to="/products?sale=true" onClick={() => setIsMobileMenuOpen(false)}>
                Sale
              </MobileNavLink>
            </MobileNav>
          </MobileMenu>
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
};

export default Header;
