import React, { useState } from 'react';
import styled from 'styled-components';
import { FiCreditCard, FiSmartphone, FiShield } from 'react-icons/fi';

const PaymentContainer = styled.div`
  margin-top: 20px;
`;

const PaymentMethods = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PaymentMethod = styled.div`
  flex: 1;
  padding: 20px;
  border: 2px solid ${props => props.selected ? '#667eea' : '#e9ecef'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.selected ? '#f8f9ff' : 'white'};

  &:hover {
    border-color: #667eea;
  }
`;

const MethodIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.selected ? '#667eea' : '#f8f9fa'};
  color: ${props => props.selected ? 'white' : '#666'};
  margin-bottom: 12px;
  font-size: 24px;
`;

const MethodName = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #333;
`;

const MethodDescription = styled.p`
  font-size: 14px;
  color: #666;
`;

const PaymentDetails = styled.div`
  margin-top: 20px;
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
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 15px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SecurityInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 6px;
  font-size: 14px;
  color: #666;
`;

const PaymentForm = () => {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const paymentMethods = [
    {
      id: 'card',
      name: 'Kartu Kredit/Debit',
      description: 'Visa, Mastercard, JCB',
      icon: <FiCreditCard />
    },
    {
      id: 'ewallet',
      name: 'E-Wallet',
      description: 'GoPay, OVO, DANA, LinkAja',
      icon: <FiSmartphone />
    }
  ];

  return (
    <PaymentContainer>
      <PaymentMethods>
        {paymentMethods.map(method => (
          <PaymentMethod
            key={method.id}
            selected={selectedMethod === method.id}
            onClick={() => setSelectedMethod(method.id)}
          >
            <MethodIcon selected={selectedMethod === method.id}>
              {method.icon}
            </MethodIcon>
            <MethodName>{method.name}</MethodName>
            <MethodDescription>{method.description}</MethodDescription>
          </PaymentMethod>
        ))}
      </PaymentMethods>

      {selectedMethod === 'card' && (
        <PaymentDetails>
          <FormGroup>
            <Label>Nomor Kartu *</Label>
            <Input
              type="text"
              name="cardNumber"
              value={cardDetails.cardNumber}
              onChange={(e) => {
                const formatted = formatCardNumber(e.target.value);
                setCardDetails(prev => ({ ...prev, cardNumber: formatted }));
              }}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
            />
          </FormGroup>

          <FormGroup>
            <Label>Nama di Kartu *</Label>
            <Input
              type="text"
              name="cardName"
              value={cardDetails.cardName}
              onChange={handleCardInputChange}
              placeholder="John Doe"
            />
          </FormGroup>

          <InputRow>
            <FormGroup>
              <Label>Tanggal Kadaluarsa *</Label>
              <Input
                type="text"
                name="expiryDate"
                value={cardDetails.expiryDate}
                onChange={(e) => {
                  const formatted = formatExpiryDate(e.target.value);
                  setCardDetails(prev => ({ ...prev, expiryDate: formatted }));
                }}
                placeholder="MM/YY"
                maxLength="5"
              />
            </FormGroup>

            <FormGroup>
              <Label>CVV *</Label>
              <Input
                type="text"
                name="cvv"
                value={cardDetails.cvv}
                onChange={handleCardInputChange}
                placeholder="123"
                maxLength="4"
              />
            </FormGroup>
          </InputRow>
        </PaymentDetails>
      )}

      {selectedMethod === 'ewallet' && (
        <PaymentDetails>
          <FormGroup>
            <Label>Pilih E-Wallet *</Label>
            <select style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e9ecef',
              borderRadius: '8px',
              fontSize: '16px',
              background: 'white'
            }}>
              <option value="">Pilih metode pembayaran</option>
              <option value="gopay">GoPay</option>
              <option value="ovo">OVO</option>
              <option value="dana">DANA</option>
              <option value="linkaja">LinkAja</option>
            </select>
          </FormGroup>
        </PaymentDetails>
      )}

      <SecurityInfo>
        <FiShield size={16} />
        <span>Informasi pembayaran Anda aman dan terenkripsi</span>
      </SecurityInfo>
    </PaymentContainer>
  );
};

export default PaymentForm;
