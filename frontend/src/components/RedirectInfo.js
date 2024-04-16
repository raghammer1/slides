// import React from 'react';
// import { styled } from '@mui/system';
// import { Typography } from '@mui/material';

// const RedirectText = styled('span')({
//   color: '#00AFF4',
//   fontWeight: 500,
//   cursor: 'pointer',
// });

// const RedirectInfo = ({
//   text,
//   redirectText,
//   redirectHandler,
//   additionalStyles,
// }) => {
//   return (
//     <Typography
//       sx={{ color: '#72767d' }}
//       style={additionalStyles || {}}
//       variant="subtitle2"
//     >
//       {text}
//       <RedirectText onClick={redirectHandler}>{redirectText}</RedirectText>
//     </Typography>
//   );
// };
// export default RedirectInfo;
import React from 'react';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';

const RedirectText = styled('span')({
  color: '#00AFF4',
  fontWeight: 500,
  cursor: 'pointer',
});

const RedirectInfo = ({
  text,
  redirectText,
  redirectHandler,
  additionalStyles,
}) => {
  return (
    <Typography
      component="p" // Explicitly setting component to 'p' for consistency in rendering
      sx={{ color: '#72767d' }}
      style={additionalStyles || {}}
      variant="subtitle2"
      data-testid="typography-text">
      {text}
      <RedirectText onClick={redirectHandler}>{redirectText}</RedirectText>
    </Typography>
  );
};

export default RedirectInfo;
