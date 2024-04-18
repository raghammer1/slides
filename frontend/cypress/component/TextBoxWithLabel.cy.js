import React from 'react';
import { mount } from 'cypress/react18';
import TextBoxWithLabel from '../../src/components/TextBoxWithLabel';

describe('<TextBoxWithLabel />', () => {
  it('updates the value when typing stops', () => {
    let value = '';
    const setValue = (newValue) => {
      value = newValue;
    };
    mount(
      <TextBoxWithLabel
        value={value}
        setValue={setValue}
        label="Test Label"
        type="text"
        placeholder="Test Placeholder"
        dataTestId="test-textbox"
      />
    );

    // Type text into textarea
    cy.get('textarea').type('Hello, World!', { delay: 100 });

    // Assert the value of the textarea
    const checkValue = () => value === 'Hello, World!';
    cy.wrap(value).should(checkValue);
  });

  it('renders with correct label and placeholder', () => {
    const label = 'Test Label';
    const placeholder = 'Test Placeholder';

    mount(
      <TextBoxWithLabel
        value=""
        setValue={() => {}}
        label={label}
        type="text"
        placeholder={placeholder}
        dataTestId="test-textbox"
      />
    );

    // Ensure the label exists
    cy.contains('p', label).should('exist');

    // Ensure the textarea has the correct placeholder
    cy.get('textarea').should('have.attr', 'placeholder', placeholder);
  });

  it('displays the correct initial value', () => {
    const initialValue = 'Initial Value';

    mount(
      <TextBoxWithLabel
        value={initialValue}
        setValue={() => {}}
        label="Test Label"
        type="text"
        placeholder="Test Placeholder"
        dataTestId="test-textbox"
      />
    );

    // Ensure the textarea displays the correct initial value
    cy.get('textarea').should('have.value', initialValue);
  });

  it('allows changing the value through user input', () => {
    const initialValue = 'Initial Value';
    const updatedValue = 'Updated Value';

    let value = initialValue;
    const setValue = (newValue) => {
      value = newValue;
    };

    mount(
      <TextBoxWithLabel
        value={value}
        setValue={setValue}
        label="Test Label"
        type="text"
        placeholder="Test Placeholder"
        dataTestId="test-textbox"
      />
    );

    cy.get('textarea').type(updatedValue);

    // Assert the value is updated correctly
    const checkValue = () => value === updatedValue;
    cy.wrap(value).should(checkValue);
  });
});
