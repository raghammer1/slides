import React from 'react';
import { mount } from '@cypress/react';
import AuthBox from './AuthBox';

describe('<AuthBox />', () => {
  it('renders', () => {
    // Mount the AuthBox component
    mount(<AuthBox />);

    // Assertions
    // Ensure the BoxWrapper div is rendered
    cy.get('[data-testid="box-wrapper"]').should('exist');
    // Ensure the Box div is rendered
    cy.get('[data-testid="box"]').should('exist');

    // Check CSS properties
    cy.get('[data-testid="box-wrapper"]').should(
      'have.css',
      'background-color',
      'rgb(24, 100, 171)'
    );
    cy.get('[data-testid="box"]').should(
      'have.css',
      'background-color',
      'rgb(34, 34, 34)'
    );
    cy.get('[data-testid="box"]').should('have.css', 'width', '434px'); // Updated width
    cy.get('[data-testid="box"]').should('have.css', 'border-radius', '5px');
    cy.get('[data-testid="box"]').should(
      'have.css',
      'box-shadow',
      'rgba(0, 0, 0, 0.2) 0px 2px 10px 0px'
    );
    cy.get('[data-testid="box"]').should('have.css', 'display', 'flex');
    cy.get('[data-testid="box"]').should(
      'have.css',
      'justify-content',
      'center'
    );
    cy.get('[data-testid="box"]').should(
      'have.css',
      'flex-direction',
      'column'
    );
    cy.get('[data-testid="box"]').should('have.css', 'padding', '25px');
  });
});
