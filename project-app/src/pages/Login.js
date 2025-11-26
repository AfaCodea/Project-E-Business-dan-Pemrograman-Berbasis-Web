import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const LoginContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const LoginCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 40px;
  
  h1 {
    font-size: 32px;
    font-weight: 800;
    color: #333;
    margin-bottom: 8px;
    letter-spacing: 2px;
  }
  
  p {
    color: #666;
    font-size: 16px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
  font-size: 14px;
`;

const Input = styled.input`
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

const ErrorMessage = styled.span`
  color: #ff4757;
  font-size: 12px;
  margin-top: 4px;
`;

const LoginButton = styled.button`
  background: #000;
  color: white;
  border: none;
  padding: 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;

  &:hover {
    background: #333;
    transform: translateY(-2px);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e9ecef;
  }
  
  span {
    padding: 0 20px;
    color: #666;
    font-size: 14px;
  }
`;

const AdminLogin = styled.button`
  background: transparent;
  color: #667eea;
  border: 2px solid #667eea;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #667eea;
    color: white;
  }
`;

const RegisterLink = styled.div`
  text-align: center;
  margin-top: 30px;
  
  p {
    color: #666;
    font-size: 14px;
  }
  
  a {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData = {
        id: 1,
        name: data.email.split('@')[0],
        email: data.email,
        role: data.email.includes('admin') ? 'admin' : 'user'
      };
      
      login(userData);
      toast.success('Login berhasil!');
      navigate('/');
    } catch (error) {
      toast.error('Login gagal. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminLogin = () => {
    const adminData = {
      id: 1,
      name: 'Admin',
      email: 'admin@ecommerce.com',
      role: 'admin'
    };
    
    login(adminData);
    toast.success('Login sebagai admin berhasil!');
    navigate('/admin');
  };

  return (
    <LoginContainer>
      <LoginCard
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Logo>
          <h1>ECOMMERCE</h1>
          <p>Masuk ke akun Anda</p>
        </Logo>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label>Email</Label>
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
              placeholder="nama@email.com"
            />
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              {...register('password', { 
                required: 'Password wajib diisi',
                minLength: {
                  value: 6,
                  message: 'Password minimal 6 karakter'
                }
              })}
              className={errors.password ? 'error' : ''}
              placeholder="Masukkan password"
            />
            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          </FormGroup>

          <LoginButton type="submit" disabled={isLoading}>
            {isLoading ? 'Memproses...' : 'Masuk'}
          </LoginButton>
        </Form>

        <Divider>
          <span>atau</span>
        </Divider>

        <AdminLogin onClick={handleAdminLogin}>
          Login sebagai Admin
        </AdminLogin>

        <RegisterLink>
          <p>Belum punya akun? <Link to="/register">Daftar sekarang</Link></p>
        </RegisterLink>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
