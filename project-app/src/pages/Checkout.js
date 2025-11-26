import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PaymentForm from '../components/PaymentForm';
import toast from 'react-hot-toast';

const CheckoutContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding: 40px 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const CheckoutHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const CheckoutTitle = styled.h1`
  font-size: 32px;
  font-weight: 800;
  color: #333;
  margin-bottom: 16px;
`;

const CheckoutSubtitle = styled.p`
  font-size: 16px;
  color: #666;
`;

const CheckoutContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const CheckoutForm = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const FormSection = styled.div`
  margin-bottom: 40px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #333;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
  }

  &.error {
    border-color: #ff4757;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  background: white;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ErrorMessage = styled.span`
  color: #ff4757;
  font-size: 14px;
  margin-top: 4px;
  display: block;
`;

const OrderSummary = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 100px;
`;

const OrderItem = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const OrderItemImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 6px;
  background: url(${props => props.bgImage}) center/cover;
  flex-shrink: 0;
`;

const OrderItemDetails = styled.div`
  flex: 1;
`;

const OrderItemName = styled.h4`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #333;
`;

const OrderItemPrice = styled.p`
  font-size: 14px;
  color: #666;
`;

const OrderItemQuantity = styled.p`
  font-size: 12px;
  color: #999;
`;

const OrderTotal = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #eee;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 16px;
`;

const TotalAmount = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #eee;
  font-size: 18px;
  font-weight: 700;
  color: #000;
`;

const Checkout = () => {
  const { items, getTotalPrice, getTotalItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const onSubmit = async (data) => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart after successful payment
      clearCart();
      
      toast.success('Pembayaran berhasil! Pesanan Anda sedang diproses.');
      navigate('/');
    } catch (error) {
      toast.error('Terjadi kesalahan saat memproses pembayaran');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <>
      <Header />
      <CheckoutContainer>
        <Container>
          <CheckoutHeader>
            <CheckoutTitle>Checkout</CheckoutTitle>
            <CheckoutSubtitle>Lengkapi informasi untuk menyelesaikan pesanan Anda</CheckoutSubtitle>
          </CheckoutHeader>

          <CheckoutContent>
            <CheckoutForm>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormSection>
                  <SectionTitle>Informasi Pengiriman</SectionTitle>
                  
                  <FormGroup>
                    <Label>Nama Lengkap *</Label>
                    <Input
                      type="text"
                      {...register('fullName', { required: 'Nama lengkap wajib diisi' })}
                      className={errors.fullName ? 'error' : ''}
                    />
                    {errors.fullName && <ErrorMessage>{errors.fullName.message}</ErrorMessage>}
                  </FormGroup>

                  <FormGroup>
                    <Label>Email *</Label>
                    <Input
                      type="email"
                      {...register('email', { 
                        required: 'Email wajib diisi',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Format email tidak valid'
                        }
                      })}
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                  </FormGroup>

                  <FormGroup>
                    <Label>Nomor Telepon *</Label>
                    <Input
                      type="tel"
                      {...register('phone', { required: 'Nomor telepon wajib diisi' })}
                      className={errors.phone ? 'error' : ''}
                    />
                    {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
                  </FormGroup>

                  <FormGroup>
                    <Label>Alamat Lengkap *</Label>
                    <Input
                      type="text"
                      {...register('address', { required: 'Alamat wajib diisi' })}
                      className={errors.address ? 'error' : ''}
                    />
                    {errors.address && <ErrorMessage>{errors.address.message}</ErrorMessage>}
                  </FormGroup>

                  <FormGroup>
                    <Label>Kota *</Label>
                    <Input
                      type="text"
                      {...register('city', { required: 'Kota wajib diisi' })}
                      className={errors.city ? 'error' : ''}
                    />
                    {errors.city && <ErrorMessage>{errors.city.message}</ErrorMessage>}
                  </FormGroup>

                  <FormGroup>
                    <Label>Kode Pos *</Label>
                    <Input
                      type="text"
                      {...register('postalCode', { required: 'Kode pos wajib diisi' })}
                      className={errors.postalCode ? 'error' : ''}
                    />
                    {errors.postalCode && <ErrorMessage>{errors.postalCode.message}</ErrorMessage>}
                  </FormGroup>
                </FormSection>

                <FormSection>
                  <SectionTitle>Metode Pembayaran</SectionTitle>
                  <PaymentForm />
                </FormSection>

                <motion.button
                  type="submit"
                  disabled={isProcessing}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '16px', fontSize: '16px' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isProcessing ? 'Memproses Pembayaran...' : `Bayar $${getTotalPrice().toFixed(2)}`}
                </motion.button>
              </form>
            </CheckoutForm>

            <OrderSummary>
              <SectionTitle>Ringkasan Pesanan</SectionTitle>
              
              {items.map(item => (
                <OrderItem key={item.id}>
                  <OrderItemImage bgImage={item.image} />
                  <OrderItemDetails>
                    <OrderItemName>{item.name}</OrderItemName>
                    <OrderItemPrice>${item.price}</OrderItemPrice>
                    <OrderItemQuantity>Qty: {item.quantity}</OrderItemQuantity>
                  </OrderItemDetails>
                </OrderItem>
              ))}

              <OrderTotal>
                <TotalRow>
                  <span>Subtotal ({getTotalItems()} item)</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </TotalRow>
                <TotalRow>
                  <span>Ongkos Kirim</span>
                  <span>Gratis</span>
                </TotalRow>
                <TotalRow>
                  <span>Pajak</span>
                  <span>$0.00</span>
                </TotalRow>
                <TotalAmount>
                  <span>Total</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </TotalAmount>
              </OrderTotal>
            </OrderSummary>
          </CheckoutContent>
        </Container>
      </CheckoutContainer>
      <Footer />
    </>
  );
};

export default Checkout;
