import React from 'react';
import styled, { keyframes } from 'styled-components';

const progressAnimation = keyframes`
  0% { width: 0%; }
  100% { width: var(--progress-width); }
`;

const ProgressContainer = styled.div`
  width: 100%;
  background: var(--gray-200);
  border-radius: 10px;
  overflow: hidden;
  height: 8px;
  position: relative;
`;

const ProgressBar = styled.div`
  height: 100%;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  border-radius: 10px;
  transition: width 0.5s ease-in-out;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    animation: ${progressAnimation} 2s ease-in-out infinite;
  }
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
`;

const ProgressText = styled.span`
  font-weight: 600;
  color: var(--text-primary);
`;

const ProgressPercentage = styled.span`
  font-weight: 700;
  color: var(--primary-color);
`;

const Progress = ({ 
  value = 0, 
  max = 100, 
  label = '', 
  showPercentage = true,
  animated = true 
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div>
      {label && (
        <ProgressLabel>
          <ProgressText>{label}</ProgressText>
          {showPercentage && (
            <ProgressPercentage>{Math.round(percentage)}%</ProgressPercentage>
          )}
        </ProgressLabel>
      )}
      <ProgressContainer>
        <ProgressBar 
          style={{ 
            width: `${percentage}%`,
            '--progress-width': `${percentage}%`
          }}
        />
      </ProgressContainer>
    </div>
  );
};

export default Progress;
