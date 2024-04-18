import React from 'react';
import { mount } from '@cypress/react18';
import InputLabelRange from './InputLabelRange';

describe('<InputLabelRange />', () => {
  it('renders', () => {
    // Mount the InputLabelRange component
    mount(<InputLabelRange />);
    // Assertion to ensure the component is rendered
    cy.get('input[type="range"]').should('exist');
  });

  it('updates the value when slider changes', () => {
    // Mount the InputLabelRange component
    mount(<InputLabelRange />);

    // Simulate changing the slider value
    cy.get('input[type="range"]')
      .invoke('val', 70)
      .trigger('change', { force: true });

    // Assertion to ensure the slider value is updated
    cy.get('input[type="range"]').should('have.value', '70');
  });
});
