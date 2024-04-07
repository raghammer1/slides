import React from 'react';
import { styled } from '@mui/system';

const Wrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100%',
});

const Label = styled('p')({
  color: '#a5d8ff',
  textTransform: 'uppercase',
  fontWeight: '600',
  fontSize: '16px',
});

const Input = styled('textarea')({
  flexGrow: 1,
  height: '40px',
  border: '1px solid black',
  borderRadius: '5px',
  color: '#dcddde',
  background: '#35393f',
  margin: 0,
  fontSize: '16px',
  padding: '0 5px',
});

const TextBoxWithLabel = ({
  value,
  setValue,
  label,
  type,
  placeholder,
  dataTestId,
}) => {
  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Wrapper>
      <Label>{label}</Label>
      <Input
        value={value}
        onChange={handleValueChange}
        placeholder={placeholder}
        type={type}
        // eslint-disable-next-line no-unneeded-ternary
        data-testid={dataTestId ? dataTestId : ''}
      />
    </Wrapper>
  );
};
export default TextBoxWithLabel;
