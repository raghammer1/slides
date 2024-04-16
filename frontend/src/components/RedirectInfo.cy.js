import React from 'react';
import { mount } from '@cypress/react';
import RedirectInfo from './RedirectInfo';

// Describe block defines the test suite for the RedirectInfo component
describe('<RedirectInfo />', () => {
  // Test to check if the component renders text and redirect text properly
  it('renders with text and redirect text', () => {
    // Defining test variables for text and handler
    const text = 'Already have an account?';
    const redirectText = 'Log in';
    const redirectHandler = cy.spy().as('redirectHandlerSpy'); // Create a spy for the click handler

    // Mount the component with props
    mount(
      <RedirectInfo
        text={text}
        redirectText={redirectText}
        redirectHandler={redirectHandler}
      />
    );
    // Check if main text is rendered and exists
    cy.get('[data-testid="typography-text"]').contains(text).should('exist');
    // Check if redirect text is rendered with correct styles
    cy.get('[data-testid="typography-text"]')
      .contains(redirectText)
      .should('exist')
      .and('have.css', 'color', 'rgb(0, 175, 244)');
    cy.get('[data-testid="typography-text"]')
      .contains(redirectText)
      .should('have.css', 'cursor', 'pointer');
  });

  // Test to verify that the click on redirect text calls the provided handler
  it('calls the redirect handler on click', () => {
    const redirectHandler = cy.spy().as('redirectHandlerSpy');
    mount(
      <RedirectInfo
        text="Need an account?"
        redirectText="Sign up"
        redirectHandler={redirectHandler}
      />
    );
    // Trigger click on the redirect text and check if the handler was called once
    cy.get('[data-testid="typography-text"]').contains('Sign up').click();
    cy.get('@redirectHandlerSpy').should('have.been.calledOnce');
  });

  // Test to check if additional styles are applied to the component
  it('applies additional styles', () => {
    const additionalStyles = { backgroundColor: 'rgb(242, 242, 242)' }; // Define additional styles to apply
    mount(
      <RedirectInfo
        text="Forgot your password?"
        redirectText="Reset here"
        redirectHandler={() => {}}
        additionalStyles={additionalStyles}
      />
    );
    // Verify that the additional styles are correctly applied to the Typography component
    cy.get('[data-testid="typography-text"]').should(
      'have.css',
      'background-color',
      'rgb(242, 242, 242)'
    );
  });
});
