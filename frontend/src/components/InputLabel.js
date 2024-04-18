/* eslint-disable no-unneeded-ternary */
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

const Input = styled('input')({
  flexGrow: 1,
  height: '40px',
  border: '1px solid black',
  borderRadius: '5px',
  color: '#dcddde',
  background: '#35393f',
  margin: 0,
  marginTop: '-10px',
  fontSize: '16px',
  padding: '0 5px',
});

const InputWithLabels = ({
  value,
  setValue,
  label,
  type,
  placeholder,
  dataTestId,
}) => {
  const handleValueChange = (event) => {
    event.stopPropagation();
    setValue(event.target.value);
  };

  return (
    <Wrapper>
      <Label data-testid={dataTestId ? `${dataTestId}-label` : `${label}-data`}>
        {label}
      </Label>
      <Input
        value={value ? value : ''}
        onChange={handleValueChange}
        placeholder={placeholder}
        type={type}
        data-testid={dataTestId ? dataTestId : `${label}-data`}
      />
    </Wrapper>
  );
};
export default InputWithLabels;
