import React from 'react';
import styled from 'styled-components';
import { FiCheck, FiX, FiClock, FiAlertCircle } from 'react-icons/fi';

const BadgeContainer = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  
  &.success {
    background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
    color: #065f46;
    border: 1px solid #10b981;
  }
  
  &.error {
    background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
    color: #991b1b;
    border: 1px solid #ef4444;
  }
  
  &.warning {
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    color: #92400e;
    border: 1px solid #f59e0b;
  }
  
  &.info {
    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
    color: #1e40af;
    border: 1px solid #3b82f6;
  }
  
  &.pending {
    background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
    color: #374151;
    border: 1px solid #6b7280;
  }
`;

const StatusBadge = ({ status, children, showIcon = true }) => {
  const getIcon = () => {
    if (!showIcon) return null;
    
    switch (status) {
      case 'success':
        return <FiCheck size={12} />;
      case 'error':
        return <FiX size={12} />;
      case 'warning':
        return <FiAlertCircle size={12} />;
      case 'pending':
        return <FiClock size={12} />;
      default:
        return null;
    }
  };

  return (
    <BadgeContainer className={status}>
      {getIcon()}
      {children}
    </BadgeContainer>
  );
};

export default StatusBadge;
