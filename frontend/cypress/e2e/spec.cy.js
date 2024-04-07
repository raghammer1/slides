describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
  })
})

describe('Beautiful Testing', () => {
  
  let uniqueEmail;

  beforeEach(() => {
    const timestamp = Date.now();
    uniqueEmail = `newUser${timestamp}@example.com`;
  });

  it('allows a user to register', () => {
    cy.visit('http://localhost:3000/register');

    cy.get('[data-testid="Email-address-data"]').type(`${uniqueEmail}`);
    cy.get('[data-testid="Username-data"]').type('userNew');
    cy.get('[data-testid="Enter-Password-data"]').type('yourpassword');
    cy.get('[data-testid="Re-Enter-Password-data"]').type('yourpassword');
    cy.get('[data-testid="register-button"]').click();

    // Note: Implement logic to handle "User already registered" scenario if applicable.

    cy.url().should('include', '/dashboard');

    cy.get('[data-testid="newPresentationButton"]').click();
    cy.get('[data-testid="create-presentation-name-test"]').type('newPresentation');
    cy.get('[data-testid="create-presentation-name-test-button"]').click();

    cy.get('[data-testid="newPresentationButton"]').click();
    cy.get('[data-testid="create-presentation-name-test"]').type('newPresentation2');
    cy.get('[data-testid="create-presentation-name-test-button"]').click();

    cy.get('[data-testid^="presentation-card-"]').first().click();
    cy.url().should('include', '/presentation');

    cy.get('[data-testid^="presentation-delete-"]').first().click();
    cy.get('[data-testid^="presentation-delete-modal-button-"]').first().click();

    // To be changed after delete bug fix
    cy.get('[data-testid^="presentation-card-"]').eq(1).click();
    cy.url().should('include', '/presentation');

    cy.get('[data-testid="add-slide-button"]').click();
    cy.get('[data-testid="add-slide-button"]').click();
    cy.get('[data-testid="add-slide-button"]').click();
    cy.get('[data-testid="add-slide-button"]').click();

    cy.get('[data-testid^="data-test-slide-"]').eq(1).click();
    cy.get('[data-testid^="data-test-slide-"]').eq(3).click();
    cy.get('[data-testid^="data-test-slide-"]').eq(2).click();
    cy.get('[data-testid^="data-test-slide-"]').eq(4).click();

    cy.get('[data-testid^="presentation-go-back-"]').click();

    cy.get('[data-testid="logout-btn"]').click();

    cy.get('[data-testid="email-login-data"]').type(`${uniqueEmail}`);
    cy.get('[data-testid="password-login-data"]').type('yourpassword');
    cy.get('[data-testid="login-button"]').click();

    cy.get('[data-testid^="presentation-card-"]').first().click();
    cy.url().should('include', '/presentation');

    cy.get('[data-testid="add-slide-button"]').click();
    cy.get('[data-testid="add-slide-button"]').click();
    cy.get('[data-testid="add-slide-button"]').click();
    cy.get('[data-testid="add-slide-button"]').click();

    cy.get('[data-testid^="data-test-slide-"]').eq(1).click();
    cy.get('[data-testid^="data-test-slide-"]').eq(3).click();
    cy.get('[data-testid^="data-test-slide-"]').eq(2).click();
    cy.get('[data-testid^="data-test-slide-"]').eq(4).click();
  });

  // after(() => {
  // // Retrieve the token from localStorage
  //   cy.window().then((win) => win.localStorage.getItem('token'))
  //     .then((token) => {
  //       // Once you have the token, use it in the cy.request()
  //       cy.request({
  //         method: 'PUT', // Adjust the method as necessary
  //         url: 'http://localhost:5005/store', // Replace with your actual API endpoint
  //         headers: {
  //           'Authorization': `Bearer ${token}`, // Use the token for authorization
  //         },
  //         body: { store: {} }, // Your request body as needed
  //       }).then((response) => {
  //         expect(response.status).to.eq(200);
  //         // Further actions based on the response
  //       });
  //     });
  // });
});
