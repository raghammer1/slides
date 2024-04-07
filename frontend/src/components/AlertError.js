import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Animation for the alert dropdown
const dropDown = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;

// Animation for the alert retract
const retractUp = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
`;

const AlertContainer = styled.div`
  animation: ${(props) => (props.show ? dropDown : retractUp)} 0.5s forwards;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${(props) => props.bgColor || 'lightblue'};
  color: white;
  text-align: center;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

const AlertError = ({
  message = 'This is an alert message!',
  bgColor,
  duration = 5000,
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
    }, duration);
    return () => clearTimeout(timer);
  }, [message, bgColor, duration]);

  return (
    <AlertContainer show={show} bgColor={bgColor}>
      {message}
    </AlertContainer>
  );
};

export default AlertError;
