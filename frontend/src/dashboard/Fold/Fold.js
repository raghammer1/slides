import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CustomPrimaryButton from '../../components/CustomePrimaryButton';
import useCurrentUserStore from '../../zustandStore/useCurrentUserStore';
import usePresentationListStore from '../../zustandStore/usePresentationListStore';
import { useNavigate } from 'react-router-dom';

// Styled navigation wrapper with a gradient background.
const NavWrapper = styled('div')({
  height: '50px',
  backgroundColor: '#333',
  backgroundImage: 'linear-gradient(315deg, #333 0%, #0d7377 74%)',
  display: 'flex',
  flexDirection: 'row',
  gap: '10px',
  justifyContent: 'space-around',
  alignItems: 'center',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  padding: '0 20px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
});

// Wrapper for the search input within the navigation bar.
const InputWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '4px',
  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)',
  '@media (max-width: 650px)': {
    width: '150px',
  },
});

// Styled input field for search functionality.
const Input = styled('input')({
  padding: '8px 12px',
  border: 'none',
  outline: 'none',
  width: '200px',
  fontFamily: 'Arial, sans-serif',
  fontSize: '14px',
  backgroundColor: 'transparent',
});

// Media-query aware SearchIcon styling.
const SearchIconStyled = styled(SearchIcon)({
  '@media (max-width: 650px)': {
    marginLeft: '-90px',
  },
});

// Component that provides UI for searching and actions like logout.
const Fold = ({ handleOpen, setSearchInput, searchInput }) => {
  const [localInput, setLocalInput] = useState(searchInput);
  const { clearCurrentUser } = useCurrentUserStore();
  const { clearPresentations } = usePresentationListStore();
  const nav = useNavigate();

  // Function to log out the user, clearing stored user and presentation data.
  const LogoutUser = () => {
    localStorage.clear();
    clearCurrentUser();
    clearPresentations();
    nav('/login');
  };
  // Updates the search input state to trigger filter operations.
  const handleSearchClick = () => {
    setSearchInput(localInput);
  };

  // Dynamic label for 'New Presentation' button based on screen size.
  const [buttonLabel, setButtonLabel] = useState('New Presentation');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 550) {
        setButtonLabel('+');
      } else {
        setButtonLabel('New Presentation');
      }
    };

    // Set initial state based on window size
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <NavWrapper>
      <CustomPrimaryButton
        label={buttonLabel}
        additionalStyle={{ width: '170px', height: '35px' }}
        onClick={handleOpen}
        dataTestid="newPresentationButton"
      />
      <InputWrapper>
        <Input
          value={localInput}
          onChange={(e) => setLocalInput(e.target.value)}
          placeholder="Search..."
          data-testid="searchInput"
        />
        <IconButton
          onClick={handleSearchClick}
          style={{ color: 'gray', padding: '5px' }}>
          <SearchIconStyled />
        </IconButton>
      </InputWrapper>
      <CustomPrimaryButton
        label={'Logout'}
        additionalStyle={{ width: '170px', height: '35px' }}
        onClick={LogoutUser}
        dataTestid={'logout-btn'}
      />
    </NavWrapper>
  );
};

export default Fold;
