import React from 'react';
import InputWithLabels from '../../src/components/InputLabel';
import RegisterPageInputs from '../../src/authPages/registerPage/RegisterPageInputs';

describe('<InputWithLabels />', () => {
  it('renders', () => {
    const setValueSpy = cy.spy().as('setValueSpy');

    cy.mount(
      <InputWithLabels
        value=""
        setValue={setValueSpy}
        label="lol"
        placeholder="Kill"
        dataTestId="input-test"
      />
    );

    cy.get('[data-testid="input-test"]').type('h');

    cy.get('@setValueSpy').should('have.been.calledWith', 'h');
  });

  it('renders', () => {
    const setValueSpy = cy.spy().as('setValueSpy');

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
  });

  it('renders with fake values', () => {
    cy.mount(
      <RegisterPageInputs
        mail="fake@mail.com"
        username="fakeUser"
        password="fakePassword"
        checkPassword="fakePassword"
      />
    );

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
  });
  it('renders with fake values', () => {
    const setMailSpy = cy.spy().as('setMailSpy');
    const setUsernameSpy = cy.spy().as('setUsernameSpy');
    const setPasswordSpy = cy.spy().as('setPasswordSpy');
    const setCheckPasswordSpy = cy.spy().as('setCheckPasswordSpy');

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

    cy.get('[data-testid="Email-address-data"]').clear();
    cy.get('[data-testid="Email-address-data"]').type('s');
    cy.get('@setMailSpy').should('have.been.calledWith', 's');

    cy.get('[data-testid="Username-data"]').clear();
    cy.get('[data-testid="Username-data"]').type('s');
    cy.get('@setUsernameSpy').should('have.been.calledWith', 's');

    cy.get('[data-testid="Enter-Password-data"]').clear();
    cy.get('[data-testid="Enter-Password-data"]').type('s');
    cy.get('@setPasswordSpy').should('have.been.calledWith', 's');

    cy.get('[data-testid="Re-Enter-Password-data"]').clear();
    cy.get('[data-testid="Re-Enter-Password-data"]').type('s');
    cy.get('@setCheckPasswordSpy').should('have.been.calledWith', 's');
  });
});
