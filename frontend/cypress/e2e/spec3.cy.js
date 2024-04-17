describe('Login Functionality Error test user not registered', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
    cy.viewport(1500, 1000);
    cy.intercept('POST', '**/auth/login', {
      statusCode: 400,
      body: {
        error: 'Invalid credentials',
      },
    }).as('loginRequest');
  });

  it('displays an error message on unsuccessful login', () => {
    cy.get('[data-testid="email-login-data"]').type('lol@gmail.com');
    cy.get('[data-testid="password-login-data"]').type('wrongpass');
    cy.get('[data-testid="login-button"]').click();

    cy.wait('@loginRequest');
    cy.contains('Invalid credentials').should('be.visible');
  });
});
