describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io');
  });
});

describe('Edit Text Box', () => {
  let uniqueEmail;

  beforeEach(() => {
    const timestamp = Date.now();
    uniqueEmail = `newUser${timestamp}@example.com`;
    // Going to the register route
    cy.visit('http://localhost:3000/register');
    cy.viewport(1500, 1000);

    // registering the new user using a unique email generated by current time
    cy.get('[data-testid="Email-address-data"]').type(`${uniqueEmail}`);
    cy.get('[data-testid="Username-data"]').type('userNew');
    cy.get('[data-testid="Enter-Password-data"]').type('yourpassword');
    cy.get('[data-testid="Re-Enter-Password-data"]').type('yourpassword');
    cy.get('[data-testid="register-button"]').click();
  });

  it('allows a user to navigate the whole app', () => {
    // User now taken to dashboard on successful register
    cy.url().should('include', '/dashboard');

    // Creating a new presentation
    cy.get('[data-testid="newPresentationButton"]').click();
    cy.get('[data-testid="create-presentation-name-test"]').type(
      'newPresentation'
    );
    cy.get('[data-testid="create-presentation-name-test-button"]').click();

    // Creating a second presentation
    cy.get('[data-testid="newPresentationButton"]').click();
    cy.get('[data-testid="create-presentation-name-test"]').type(
      'newPresentation2'
    );
    cy.get('[data-testid="create-presentation-name-test-button"]').click();

    // Opening the first presentation
    cy.get('[data-testid^="presentation-card-"]').first().click();
    cy.url().should('include', '/presentation');

    // Deleting the first presentation
    cy.get('[data-testid^="presentation-delete-"]').first().click();
    cy.get('[data-testid^="presentation-delete-modal-button-"]')
      .first()
      .click();

    // Opening the second presentation
    cy.get('[data-testid^="presentation-card-"]').first().click();
    cy.url().should('include', '/presentation');

    // Creating 4 new slides on the presentation
    cy.get('[data-testid="add-slide-button"]').click();
    cy.get('[data-testid="add-slide-button"]').click();
    cy.get('[data-testid="add-slide-button"]').click();
    cy.get('[data-testid="add-slide-button"]').click();

    // randomly clicking on the new slides to open them
    cy.get('[data-testid^="data-test-slide-"]').eq(1).click();
    cy.get('[data-testid^="data-test-slide-"]').eq(3).click();
    cy.get('[data-testid^="data-test-slide-"]').eq(2).click();
    cy.get('[data-testid^="data-test-slide-"]').eq(4).click();

    // Creating a new text box on the slide 5
    cy.get('[data-testid="edit-btn"]').click();
    cy.get('[data-testid="add-text-box-btn"]').click();
    cy.get('[data-testid="title-text-box-test"]').type('HI HELLO HOW ARE YOU');
    cy.get('[data-testid="create-new-text-box-btn"]').click();

    cy.get('[data-testid^="text-box-element-test"]').click();
    cy.get('[data-testid^="text-box-element-test"]').click();

    cy.get('[data-testid="title-text-box-test-edit"]').type(' EDITED');
    cy.get('[data-testid="edited-text-box-btn"]').click();
  });
});
