import React from 'react';
import { styled } from '@mui/system';

const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '20px',
  marginTop: '20px',
});

const Label = styled('label')({
  fontSize: '16px',
  color: '#61dafb',
  fontWeight: 'bold',
  marginBottom: '8px',
});

const Select = styled('select')({
  padding: '10px 15px',
  fontSize: '16px',
  color: '#000',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  border: '2px solid #ccc',
  cursor: 'pointer',
  '&:focus': {
    borderColor: '#61dafb',
    outline: 'none',
    boxShadow: '0 0 0 2px rgba(97, 218, 251, 0.5)',
  },
  '&:hover': {
    borderColor: '#61dafb',
  },
});

const SelectWithLabel = ({ label, value, setValue, options }) => {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Select value={value} onChange={(e) => setValue(e.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </Wrapper>
  );
};

export default SelectWithLabel;
