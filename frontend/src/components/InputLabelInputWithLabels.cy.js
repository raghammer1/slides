import React from 'react';
import InputWithLabels from './InputLabel';
import RegisterPageInputs from '../authPages/registerPage/RegisterPageInputs';

describe('<InputWithLabels />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    const setValueSpy = cy.spy().as('setValueSpy');

    // Mount the component with the spy as the setValue prop
    cy.mount(
      <InputWithLabels
        value=""
        setValue={setValueSpy}
        label="lol"
        placeholder="Kill"
        dataTestId="input-test"
      />
    );

    // Simulate typing into the input
    cy.get('[data-testid="input-test"]').type('h');

    // Assert that setValue was called correctly
    cy.get('@setValueSpy').should('have.been.calledWith', 'h');
  });

  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    const setValueSpy = cy.spy().as('setValueSpy');

    // Mount the component with the spy as the setValue prop
    cy.mount(
      <InputWithLabels
        value="hihi"
        setValue={setValueSpy}
        label="lol"
        placeholder="Kill"
        dataTestId="input-test"
        type="password"
      />
    );

    cy.get('[data-testid="input-test-label"]').should('have.text', 'lol');
    cy.get('[data-testid="input-test"]').should('have.value', 'hihi');
    cy.get('[data-testid="input-test"]').should(
      'have.attr',
      'placeholder',
      'Kill'
    );
    cy.get('[data-testid="input-test"]').should(
      'have.attr',
      'type',
      'password'
    );
  });
  it('adjusts style for small screens', () => {
    cy.viewport(320, 480);
    cy.mount(
      <InputWithLabels
        value=""
        setValue={() => {}}
        label="Responsive"
        placeholder="Resize me"
        dataTestId="responsive-input"
      />
    );

    // Conceptual: you would need a specific assertion here based on what changes
  });

  it('renders with fake values', () => {
    // Mount component with fake values and spies
    cy.mount(
      <RegisterPageInputs
        mail="fake@mail.com"
        username="fakeUser"
        password="fakePassword"
        checkPassword="fakePassword"
      />
    );

    // Example assertions
    // Assert the initial value of an input field, assuming your component correctly sets these values.
    // This depends on the implementation details of your RegisterPageInputs component.
    cy.get('[data-testid="Email-address-data"]').should(
      'have.value',
      'fake@mail.com'
    );
    cy.get('[data-testid="Username-data"]').should('have.value', 'fakeUser');
    cy.get('[data-testid="Enter-Password-data"]').should(
      'have.value',
      'fakePassword'
    );
    cy.get('[data-testid="Re-Enter-Password-data"]').should(
      'have.value',
      'fakePassword'
    );

    // Similar actions and assertions can be made for the other inputs and their corresponding set functions.
  });
  it('renders with fake values', () => {
    // Mock set functions
    const setMailSpy = cy.spy().as('setMailSpy');
    const setUsernameSpy = cy.spy().as('setUsernameSpy');
    const setPasswordSpy = cy.spy().as('setPasswordSpy');
    const setCheckPasswordSpy = cy.spy().as('setCheckPasswordSpy');

    // Mount component with fake values and spies
    cy.mount(
      <RegisterPageInputs
        mail=""
        setMail={setMailSpy}
        username=""
        setUsername={setUsernameSpy}
        password=""
        setPassword={setPasswordSpy}
        checkPassword=""
        setCheckPassword={setCheckPasswordSpy}
      />
    );

    cy.get('[data-testid="Email-address-data"]').clear().type('s');
    cy.get('@setMailSpy').should('have.been.calledWith', 's');

    cy.get('[data-testid="Username-data"]').clear().type('s');
    cy.get('@setUsernameSpy').should('have.been.calledWith', 's');

    cy.get('[data-testid="Enter-Password-data"]').clear().type('s');
    cy.get('@setPasswordSpy').should('have.been.calledWith', 's');

    cy.get('[data-testid="Re-Enter-Password-data"]').clear().type('s');
    cy.get('@setCheckPasswordSpy').should('have.been.calledWith', 's');
  });
});
