describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
  })
})

describe('Register Page', () => {
  beforeEach(() => {
    cy.intercept('POST', '/', { statusCode: 200, body: { token: 'fakeToken' } }).as('registerRequest');
  });

  it('allows a user to register', () => {
    cy.visit('http://localhost:3000/register');

    cy.get('[data-testid="Email-address-data"]').type('newUser@example.com');
    cy.get('[data-testid="Username-data"]').type('newUser');
    cy.get('[data-testid="Enter-Password-data"]').type('yourpassword');
    cy.get('[data-testid="Re-Enter-Password-data"]').type('yourpassword');
    cy.get('[data-testid="register-button"]').click();
    // CHECK IF USER ALREADY REGISTERED IT LOGS USER IN INSTEAD AND THEN CONTINUEs

    cy.url().should('include', '/dashboard');

    cy.get('[data-testid="newPresentationButton"]').click();
    cy.get('[data-testid="create-presentation-name-test"]').type('newPresentation')
    cy.get('[data-testid="create-presentation-name-test-button"]').click()

    cy.get('[data-testid="newPresentationButton"]').click();
    cy.get('[data-testid="create-presentation-name-test"]').type('newPresentation2')
    cy.get('[data-testid="create-presentation-name-test-button"]').click()

    cy.get('[data-testid^="presentation-card-"]').first().click()
    cy.url().should('include', '/presentation');

    cy.get('[data-testid^="presentation-delete-"]').first().click()
    
    cy.get('[data-testid^="presentation-delete-modal-button-"]').first().click()

    // Change this after delete bug fix
    cy.get('[data-testid^="presentation-card-"]').eq(1).click()
    cy.url().should('include', '/presentation');

    cy.get('[data-testid="add-slide-button"]').click();
    cy.get('[data-testid="add-slide-button"]').click();
    cy.get('[data-testid="add-slide-button"]').click();
    cy.get('[data-testid="add-slide-button"]').click();

    cy.get('[data-testid^="data-test-slide-"]').eq(1).click()
    cy.get('[data-testid^="data-test-slide-"]').eq(3).click()
    cy.get('[data-testid^="data-test-slide-"]').eq(2).click()
    cy.get('[data-testid^="data-test-slide-"]').eq(4).click()

    cy.get('[data-testid^="presentation-go-back-"]').click();

    cy.get('[data-testid="logout-btn"]').click();

    cy.get('[data-testid="email-login-data"]').type('newUser@example.com');
    cy.get('[data-testid="password-login-data"]').type('yourpassword');
    cy.get('[data-testid="login-button"]').click();

  });

  // Additional tests for error handling, invalid input, etc.
});
