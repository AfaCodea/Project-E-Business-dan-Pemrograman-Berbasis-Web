import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiPlus, FiMinus, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';

const CartContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding: 40px 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const CartHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
`;

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #000;
  }
`;

const CartTitle = styled.h1`
  font-size: 32px;
  font-weight: 800;
  color: #333;
`;

const CartContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const CartItems = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const CartItem = styled(motion.div)`
  display: flex;
  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const ItemImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  background: url(${props => props.bgImage}) center/cover;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ItemName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
`;

const ItemPrice = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: #000;
  margin-bottom: 16px;
`;

const ItemControls = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f8f9fa;
  border-radius: 6px;
  padding: 8px 12px;
`;

const QuantityButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background: #e9ecef;
  }
`;

const Quantity = styled.span`
  font-weight: 600;
  min-width: 30px;
  text-align: center;
`;

const RemoveButton = styled.button`
  background: #ff4757;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background: #ff3742;
  }
`;

const CartSummary = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 100px;
`;

const SummaryTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #333;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 16px;
`;

const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #eee;
  font-size: 20px;
  font-weight: 700;
  color: #000;
`;

const CheckoutButton = styled(Link)`
  display: block;
  background: #000;
  color: white;
  text-align: center;
  padding: 16px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  margin-top: 20px;
  transition: all 0.3s ease;

  &:hover {
    background: #333;
    transform: translateY(-2px);
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 16px;
    color: #333;
  }

  p {
    font-size: 16px;
    color: #666;
    margin-bottom: 30px;
  }
`;

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      toast.success('Produk dihapus dari keranjang');
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
    toast.success('Produk dihapus dari keranjang');
  };

  if (items.length === 0) {
    return (
      <>
        <Header />
        <CartContainer>
          <Container>
            <CartHeader>
              <BackButton to="/">
                <FiArrowLeft size={20} />
                Kembali ke Beranda
              </BackButton>
              <CartTitle>Keranjang Belanja</CartTitle>
            </CartHeader>
            <EmptyCart>
              <h2>Keranjang Anda Kosong</h2>
              <p>Mulai berbelanja dan tambahkan produk favorit Anda ke keranjang</p>
              <Link to="/" className="btn btn-primary">
                Mulai Berbelanja
              </Link>
            </EmptyCart>
          </Container>
        </CartContainer>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <CartContainer>
        <Container>
          <CartHeader>
            <BackButton to="/">
              <FiArrowLeft size={20} />
              Kembali ke Beranda
            </BackButton>
            <CartTitle>Keranjang Belanja ({getTotalItems()} item)</CartTitle>
          </CartHeader>

          <CartContent>
            <CartItems>
              {items.map((item, index) => (
                <CartItem
                  key={item.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ItemImage bgImage={item.image} />
                  <ItemDetails>
                    <div>
                      <ItemName>{item.name}</ItemName>
                      <ItemPrice>${item.price}</ItemPrice>
                    </div>
                    <ItemControls>
                      <QuantityControl>
                        <QuantityButton onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                          <FiMinus size={16} />
                        </QuantityButton>
                        <Quantity>{item.quantity}</Quantity>
                        <QuantityButton onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                          <FiPlus size={16} />
                        </QuantityButton>
                      </QuantityControl>
                      <RemoveButton onClick={() => handleRemoveItem(item.id)}>
                        <FiTrash2 size={16} />
                      </RemoveButton>
                    </ItemControls>
                  </ItemDetails>
                </CartItem>
              ))}
            </CartItems>

            <CartSummary>
              <SummaryTitle>Ringkasan Pesanan</SummaryTitle>
              <SummaryRow>
                <span>Subtotal ({getTotalItems()} item)</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </SummaryRow>
              <SummaryRow>
                <span>Ongkos Kirim</span>
                <span>Gratis</span>
              </SummaryRow>
              <SummaryRow>
                <span>Pajak</span>
                <span>$0.00</span>
              </SummaryRow>
              <SummaryTotal>
                <span>Total</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </SummaryTotal>
              <CheckoutButton to="/checkout">
                Lanjut ke Checkout
              </CheckoutButton>
            </CartSummary>
          </CartContent>
        </Container>
      </CartContainer>
      <Footer />
    </>
  );
};

export default Cart;
