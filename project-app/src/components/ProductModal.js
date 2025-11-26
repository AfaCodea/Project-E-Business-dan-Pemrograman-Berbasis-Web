import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiX, FiUpload } from 'react-icons/fi';
import { useForm } from 'react-hook-form';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 30px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  
  h2 {
    font-size: 24px;
    font-weight: 700;
    color: #333;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.3s ease;
  
  &:hover {
    background: #f5f5f5;
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

const TextArea = styled.textarea`
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  min-height: 100px;
  resize: vertical;
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

const ImageUpload = styled.div`
  border: 2px dashed #e9ecef;
  border-radius: 8px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #667eea;
    background: #f8f9ff;
  }
`;

const ImagePreview = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  background: url(${props => props.bgImage}) center/cover;
  margin-bottom: 16px;
`;

const UploadText = styled.div`
  color: #666;
  font-size: 14px;
  
  p {
    margin-bottom: 8px;
  }
  
  span {
    color: #667eea;
    font-weight: 500;
  }
`;

const ErrorMessage = styled.span`
  color: #ff4757;
  font-size: 12px;
  margin-top: 4px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const Button = styled.button`
  flex: 1;
  padding: 16px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &.primary {
    background: #000;
    color: white;
    
    &:hover {
      background: #333;
      transform: translateY(-2px);
    }
  }

  &.secondary {
    background: #f8f9fa;
    color: #333;
    border: 2px solid #e9ecef;
    
    &:hover {
      background: #e9ecef;
    }
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const ProductModal = ({ product, onSave, onClose }) => {
  const [imagePreview, setImagePreview] = useState(product?.image || '');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    defaultValues: {
      name: product?.name || '',
      price: product?.price || '',
      category: product?.category || 'shoes',
      stock: product?.stock || '',
      description: product?.description || '',
      image: product?.image || ''
    }
  });

  const watchedImage = watch('image');

  useEffect(() => {
    if (watchedImage) {
      setImagePreview(watchedImage);
    }
  }, [watchedImage]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSave({
        ...data,
        price: parseFloat(data.price),
        stock: parseInt(data.stock)
      });
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setValue('image', e.target.result);
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const categories = [
    { value: 'shoes', label: 'Sepatu' },
    { value: 'clothing', label: 'Pakaian' },
    { value: 'accessories', label: 'Aksesoris' },
    { value: 'bags', label: 'Tas' },
    { value: 'jewelry', label: 'Perhiasan' }
  ];

  return (
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <ModalContent
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader>
          <h2>{product ? 'Edit Produk' : 'Tambah Produk Baru'}</h2>
          <CloseButton onClick={onClose}>
            <FiX size={24} />
          </CloseButton>
        </ModalHeader>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label>Nama Produk *</Label>
            <Input
              type="text"
              {...register('name', { required: 'Nama produk wajib diisi' })}
              className={errors.name ? 'error' : ''}
              placeholder="Masukkan nama produk"
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Harga *</Label>
            <Input
              type="number"
              step="0.01"
              {...register('price', { 
                required: 'Harga wajib diisi',
                min: { value: 0, message: 'Harga harus lebih dari 0' }
              })}
              className={errors.price ? 'error' : ''}
              placeholder="0.00"
            />
            {errors.price && <ErrorMessage>{errors.price.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Kategori *</Label>
            <Select
              {...register('category', { required: 'Kategori wajib dipilih' })}
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </Select>
            {errors.category && <ErrorMessage>{errors.category.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Stok *</Label>
            <Input
              type="number"
              {...register('stock', { 
                required: 'Stok wajib diisi',
                min: { value: 0, message: 'Stok harus lebih dari atau sama dengan 0' }
              })}
              className={errors.stock ? 'error' : ''}
              placeholder="0"
            />
            {errors.stock && <ErrorMessage>{errors.stock.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Deskripsi</Label>
            <TextArea
              {...register('description')}
              placeholder="Masukkan deskripsi produk"
            />
          </FormGroup>

          <FormGroup>
            <Label>Gambar Produk *</Label>
            {imagePreview ? (
              <ImagePreview bgImage={imagePreview} />
            ) : (
              <ImageUpload onClick={() => document.getElementById('image-upload').click()}>
                <FiUpload size={32} style={{ marginBottom: '16px', color: '#667eea' }} />
                <UploadText>
                  <p>Klik untuk mengupload gambar</p>
                  <span>atau drag & drop file di sini</span>
                </UploadText>
              </ImageUpload>
            )}
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <Input
              type="url"
              {...register('image', { required: 'Gambar produk wajib diisi' })}
              className={errors.image ? 'error' : ''}
              placeholder="atau masukkan URL gambar"
              style={{ marginTop: '10px' }}
            />
            {errors.image && <ErrorMessage>{errors.image.message}</ErrorMessage>}
          </FormGroup>

          <ButtonGroup>
            <Button type="button" className="secondary" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit" className="primary" disabled={isLoading}>
              {isLoading ? 'Menyimpan...' : (product ? 'Perbarui' : 'Simpan')}
            </Button>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ProductModal;
