import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit, FiTrash2, FiEye, FiLogOut, FiPackage, FiUsers, FiDollarSign, FiShoppingCart } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import ProductModal from '../components/ProductModal';
import toast from 'react-hot-toast';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
`;

const Sidebar = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 250px;
  height: 100vh;
  background: #1a1a1a;
  color: white;
  padding: 20px;
  z-index: 1000;

  @media (max-width: 768px) {
    transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
    transition: transform 0.3s ease;
  }
`;

const SidebarHeader = styled.div`
  margin-bottom: 40px;
  
  h1 {
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 8px;
    letter-spacing: 2px;
  }
  
  p {
    color: #ccc;
    font-size: 14px;
  }
`;

const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  margin-bottom: 10px;
`;

const MenuButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: ${props => props.active ? '#667eea' : 'transparent'};
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    background: ${props => props.active ? '#667eea' : '#333'};
  }
`;

const LogoutButton = styled.button`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #ff4757;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    background: #ff3742;
  }
`;

const MainContent = styled.div`
  margin-left: 250px;
  padding: 20px;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 10px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const HeaderTitle = styled.h2`
  font-size: 28px;
  font-weight: 800;
  color: #333;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;

  @media (max-width: 768px) {
    display: block;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled(motion.div)`
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 16px;
`;

const StatIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
`;

const StatContent = styled.div`
  flex: 1;
`;

const StatValue = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-bottom: 4px;
`;

const StatLabel = styled.p`
  color: #666;
  font-size: 14px;
`;

const ContentCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 24px;
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const ContentTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #333;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #000;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: #333;
    transform: translateY(-1px);
  }
`;

const ProductsTable = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 12px;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #eee;
  font-size: 14px;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #eee;
  
  &:hover {
    background: #f8f9fa;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  font-size: 14px;
  color: #333;
`;

const ProductImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 6px;
  background: url(${props => props.bgImage}) center/cover;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  padding: 6px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s ease;
  color: white;

  &.edit {
    background: #667eea;
    
    &:hover {
      background: #5a6fd8;
    }
  }

  &.delete {
    background: #ff4757;
    
    &:hover {
      background: #ff3742;
    }
  }

  &.view {
    background: #2ed573;
    
    &:hover {
      background: #26c965;
    }
  }
`;

const AdminDashboard = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Casual Shoe',
      price: 225,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      stock: 50,
      description: 'Comfortable casual shoes for everyday wear'
    },
    {
      id: 2,
      name: 'Skateboard Shoe',
      price: 125,
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'shoes',
      stock: 30,
      description: 'Durable skateboard shoes for active lifestyle'
    }
  ]);

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/');
      toast.error('Akses ditolak. Anda bukan admin.');
    }
  }, [isAdmin, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logout berhasil');
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      setProducts(products.filter(p => p.id !== productId));
      toast.success('Produk berhasil dihapus');
    }
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id ? { ...p, ...productData } : p
      ));
      toast.success('Produk berhasil diperbarui');
    } else {
      const newProduct = {
        ...productData,
        id: Date.now()
      };
      setProducts([...products, newProduct]);
      toast.success('Produk berhasil ditambahkan');
    }
    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  const stats = [
    {
      label: 'Total Produk',
      value: products.length,
      icon: <FiPackage />,
      color: '#667eea'
    },
    {
      label: 'Total Penjualan',
      value: '$12,450',
      icon: <FiDollarSign />,
      color: '#2ed573'
    },
    {
      label: 'Total Pesanan',
      value: '156',
      icon: <FiShoppingCart />,
      color: '#ffa502'
    },
    {
      label: 'Total Pelanggan',
      value: '89',
      icon: <FiUsers />,
      color: '#ff4757'
    }
  ];

  if (!isAdmin()) {
    return null;
  }

  return (
    <DashboardContainer>
      <Sidebar isOpen={isMobileMenuOpen}>
        <SidebarHeader>
          <h1>ECOMMERCE</h1>
          <p>Admin Dashboard</p>
        </SidebarHeader>

        <SidebarMenu>
          <MenuItem>
            <MenuButton 
              active={activeTab === 'products'} 
              onClick={() => setActiveTab('products')}
            >
              <FiPackage />
              Produk
            </MenuButton>
          </MenuItem>
          <MenuItem>
            <MenuButton 
              active={activeTab === 'orders'} 
              onClick={() => setActiveTab('orders')}
            >
              <FiShoppingCart />
              Pesanan
            </MenuButton>
          </MenuItem>
          <MenuItem>
            <MenuButton 
              active={activeTab === 'customers'} 
              onClick={() => setActiveTab('customers')}
            >
              <FiUsers />
              Pelanggan
            </MenuButton>
          </MenuItem>
        </SidebarMenu>

        <LogoutButton onClick={handleLogout}>
          <FiLogOut />
          Logout
        </LogoutButton>
      </Sidebar>

      <MainContent>
        <Header>
          <HeaderTitle>Dashboard Admin</HeaderTitle>
          <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            ☰
          </MobileMenuButton>
        </Header>

        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <StatIcon color={stat.color}>
                {stat.icon}
              </StatIcon>
              <StatContent>
                <StatValue>{stat.value}</StatValue>
                <StatLabel>{stat.label}</StatLabel>
              </StatContent>
            </StatCard>
          ))}
        </StatsGrid>

        <ContentCard>
          <ContentHeader>
            <ContentTitle>Daftar Produk</ContentTitle>
            <AddButton onClick={handleAddProduct}>
              <FiPlus />
              Tambah Produk
            </AddButton>
          </ContentHeader>

          <ProductsTable>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Gambar</TableHeader>
                  <TableHeader>Nama Produk</TableHeader>
                  <TableHeader>Kategori</TableHeader>
                  <TableHeader>Harga</TableHeader>
                  <TableHeader>Stok</TableHeader>
                  <TableHeader>Aksi</TableHeader>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <ProductImage bgImage={product.image} />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <ActionButtons>
                        <ActionButton 
                          className="view"
                          onClick={() => navigate(`/product/${product.id}`)}
                        >
                          <FiEye />
                        </ActionButton>
                        <ActionButton 
                          className="edit"
                          onClick={() => handleEditProduct(product)}
                        >
                          <FiEdit />
                        </ActionButton>
                        <ActionButton 
                          className="delete"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <FiTrash2 />
                        </ActionButton>
                      </ActionButtons>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </ProductsTable>
        </ContentCard>
      </MainContent>

      {isProductModalOpen && (
        <ProductModal
          product={editingProduct}
          onSave={handleSaveProduct}
          onClose={() => {
            setIsProductModalOpen(false);
            setEditingProduct(null);
          }}
        />
      )}
    </DashboardContainer>
  );
};

export default AdminDashboard;
