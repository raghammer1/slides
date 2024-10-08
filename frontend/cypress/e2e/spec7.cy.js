describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io');
  });
});

describe('Edit Image Box', () => {
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

    // Adding a new image through url on the slide
    cy.get('[data-testid^="data-test-slide-"]').eq(1).click();
    cy.get('[data-testid="edit-btn"]').click();
    cy.get('[data-testid="add-image-box-btn"]').click();
    cy.get('input[type="radio"][value="url"]').click();
    cy.get('[data-testid="image-box-alt-test"]').type('Girl');
    cy.get('[data-testid="image-box-url-test"]').type(
      'https://images.pexels.com/photos/3238529/pexels-photo-3238529.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
    );
    cy.get('[data-testid="image-box-create-btn-test"]').click();

    cy.get('[data-testid^="image-box-element-test"]').click();
    cy.get('[data-testid^="image-box-element-test"]').click();

    cy.get('[data-testid="image-box-url-test-edit"]').clear();
    cy.get('[data-testid="image-box-url-test-edit"]').type(
      'https://images.pexels.com/photos/16946978/pexels-photo-16946978/free-photo-of-traditional-temple-by-the-square-in-tokyo.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
    );
    cy.get('[data-testid="edit-image-box-btn"]').click();
  });
});
