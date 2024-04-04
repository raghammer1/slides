import React from 'react';
import { styled } from '@mui/system';

const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  width: '100%',
});

const SliderLabel = styled('label')({
  color: '#a5d8ff',
  textTransform: 'uppercase',
  fontWeight: '600',
  fontSize: '16px',
});

const SliderInput = styled('input')({
  width: '100%', // Make the slider take up the full width of its container
  cursor: 'pointer',
});

const SliderValue = styled('span')({
  color: '#dcddde',
  fontSize: '16px',
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
