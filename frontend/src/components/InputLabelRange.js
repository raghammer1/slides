import React from 'react';
import { styled } from '@mui/system';

const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  width: '100%',
  marginTop: '30px',
});

const SliderLabel = styled('label')({
  color: '#a5d8ff',
  textTransform: 'uppercase',
  fontWeight: '600',
  fontSize: '16px',
  margin: '0',
});

const SliderInput = styled('input')({
  width: '100%',
  cursor: 'pointer',
  margin: '0',
});

const SliderValue = styled('span')({
  color: '#dcddde',
  fontSize: '16px',
  margin: '0',
});

const InputLabelRange = ({
  customeStyle,
  sign,
  min,
  max,
  label,
  value,
  setValue,
}) => {
  return (
    <Wrapper style={customeStyle}>
      <SliderLabel>{label}</SliderLabel>
      <SliderInput
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <SliderValue>
        {value}
        {sign}
      </SliderValue>
    </Wrapper>
  );
};

export default InputLabelRange;
