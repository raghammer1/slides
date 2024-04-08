import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';

const BoxWrapper = styled('div')({
  width: '100%',
  height: '98vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#1864ab',
});

const AuthBox = (props) => {
  return (
    <BoxWrapper>
      <Box
        sx={{
          width: 700,
          // height: 300,
          bgcolor: '#222',
          borderRadius: '5px',
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '25px',
        }}
      >
        {props.children}
      </Box>
    </BoxWrapper>
  );
};
export default AuthBox;
