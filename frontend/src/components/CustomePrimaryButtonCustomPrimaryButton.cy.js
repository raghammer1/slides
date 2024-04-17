import React from 'react';
import { mount } from '@cypress/react';
import CustomPrimaryButton from './CustomePrimaryButton';

// Start describing the test suite for CustomPrimaryButton
describe('<CustomPrimaryButton />', () => {
  // Test to check if the button renders with the correct label
  it('renders with the correct label', () => {
    const label = 'Click Me!';
    mount(<CustomPrimaryButton label={label} dataTestid="button-test" />);

    cy.get('[data-testid="button-test"]').should('contain', label);
  });

  // Test to verify the button's onClick event handling
  it('calls onClick handler when clicked', () => {
    const onClickSpy = cy.spy().as('onClickSpy');
    mount(
      <CustomPrimaryButton
        label="Click Me"
        onClick={onClickSpy}
        dataTestid="button-click-test"
      />
    );

    cy.get('[data-testid="button-click-test"]').click();
    cy.get('@onClickSpy').should('have.been.calledOnce');
  });

  // Test to ensure the button is disabled when the 'disabled' prop is true
  it('is disabled when the disabled prop is true', () => {
    mount(
      <CustomPrimaryButton
        label="Disabled Button"
        disabled={true}
        dataTestid="button-disabled-test"
      />
    );

    cy.get('[data-testid="button-disabled-test"]').should('be.disabled');
  });

  // Test to check the application of additional styles
  it('applies additional styles', () => {
    const additionalStyle = { backgroundColor: '#4caf50' };
    mount(
      <CustomPrimaryButton
        label="Styled Button"
        additionalStyle={additionalStyle}
        dataTestid="button-style-test"
      />
    );

    cy.get('[data-testid="button-style-test"]').should(
      'have.css',
      'background-color',
      'rgb(76, 175, 80)'
    );
  });

  // Test for button accessibility, ensuring it can receive focus
  it('is accessible with keyboard focus', () => {
    mount(
      <CustomPrimaryButton
        label="Accessible Button"
        dataTestid="button-accessible-test"
      />
    );

    cy.get('[data-testid="button-accessible-test"]').focus();
    cy.focused().should('have.text', 'Accessible Button');
  });
});
