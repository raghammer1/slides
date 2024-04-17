import React from 'react';
import { mount } from '@cypress/react';
import CustomModal from './CustomModal';

describe('<CustomModal />', () => {
  it('renders the modal when open is true', () => {
    mount(
      <CustomModal
        open={true}
        handleCloseCreateTextBox={() => {}}
        style={{ width: '400px' }}
      >
        <div>Modal Content</div>
      </CustomModal>
    );

    // Check if the modal is visible and contains the correct content
    cy.get('.MuiModal-root').should('be.visible');
    cy.get('.MuiBox-root').contains('Modal Content').should('exist');
  });

  it('does not render the modal when open is false', () => {
    mount(
      <CustomModal
        open={false}
        handleCloseCreateTextBox={() => {}}
        style={{ width: '400px' }}
      >
        <div>Modal Content</div>
      </CustomModal>
    );

    cy.get('.MuiModal-root').should('not.exist');
  });

  it('executes handleCloseCreateTextBox on close', () => {
    // Create a spy for the handleClose function
    const handleCloseSpy = cy.spy().as('handleCloseSpy');
    mount(
      <CustomModal
        open={true}
        handleCloseCreateTextBox={handleCloseSpy}
        style={{ width: '400px' }}
      >
        <div>Modal Content</div>
      </CustomModal>
    );

    // Simulate closing the modal
    cy.get('.MuiBackdrop-root').click({ force: true });
    cy.get('@handleCloseSpy').should('have.been.calledOnce');
  });

  it('applies custom styles to the Box', () => {
    const customStyle = {
      width: '500px',
      height: '300px',
      backgroundColor: 'grey',
    };
    // Mount the component with custom styles
    mount(
      <CustomModal
        open={true}
        handleCloseCreateTextBox={() => {}}
        style={customStyle}
      >
        <div>Modal Content</div>
      </CustomModal>
    );

    // Check if the custom styles are applied
    cy.get('.MuiBox-root').should('have.css', 'width', '370px');
    cy.get('.MuiBox-root').should('have.css', 'height', '18.5px');
    cy.get('.MuiBox-root').should(
      'have.css',
      'background-color',
      'rgba(0, 0, 0, 0)'
    );
  });
});
