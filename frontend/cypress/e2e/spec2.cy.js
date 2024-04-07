describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})


describe('Beautiful Testing 2', () => {
  
  let uniqueEmail;

  beforeEach(() => {
    const timestamp = Date.now();
    uniqueEmail = `newUser${timestamp}@example.com`;
  });

  it('allows a user to navigate the whole app', () => {
    // Going to the register route
    cy.visit('http://localhost:3000/register');

    // registering the new user using a unique email generated by current time
    cy.get('[data-testid="Email-address-data"]').type(`${uniqueEmail}`);
    cy.get('[data-testid="Username-data"]').type('userNew');
    cy.get('[data-testid="Enter-Password-data"]').type('yourpassword');
    cy.get('[data-testid="Re-Enter-Password-data"]').type('yourpassword');
    cy.get('[data-testid="register-button"]').click();

    // User now taken to dashboard on successful register
    cy.url().should('include', '/dashboard');

    // Creating a new presentation
    cy.get('[data-testid="newPresentationButton"]').click();
    cy.get('[data-testid="create-presentation-name-test"]').type('newPresentation');
    cy.get('[data-testid="create-presentation-name-test-button"]').click();

    // Creating a second presentation
    cy.get('[data-testid="newPresentationButton"]').click();
    cy.get('[data-testid="create-presentation-name-test"]').type('newPresentation2');
    cy.get('[data-testid="create-presentation-name-test-button"]').click();

    // Opening the first presentation
    cy.get('[data-testid^="presentation-card-"]').first().click();
    cy.url().should('include', '/presentation');

    // Deleting the first presentation
    cy.get('[data-testid^="presentation-delete-"]').first().click();
    cy.get('[data-testid^="presentation-delete-modal-button-"]').first().click();

    //!!!!!! To be changed after delete bug fix
    // Opening the second presentation
    cy.get('[data-testid^="presentation-card-"]').eq(1).click();
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

    // Moving the text box on the slide
    cy.get('[data-testid^="text-box-element-test"]').first().trigger('mousedown', {
      button: 0, // Left button
      clientX: 100,
      clientY: 100,
    });
    cy.get('[data-testid^="text-box-element-test"]').first().trigger('mousemove', {
      clientX: 400,
      clientY: 400,
    });
    cy.get('[data-testid^="text-box-element-test"]').first().trigger('mouseup', { force: true });

    // Re-sizing the text box on the slide
    cy.get('[data-testid^="text-box-element-test"]').first().trigger('mousedown', {
      which: 1,
      pageX: 600,
      pageY: 400,
    });
    cy.get('[data-testid^="text-box-element-test"]').first().trigger('mousemove', {
      pageX: 800, // Move right to increase width
      pageY: 600, // Move down to increase height
    });
    cy.get('[data-testid^="text-box-element-test"]').first().trigger('mouseup');

    // Adding a new image through url on the slide
    cy.get('[data-testid="edit-btn"]').click();
    cy.get('[data-testid="add-image-box-btn"]').click();
    cy.get('input[type="radio"][value="url"]').click();
    cy.get('[data-testid="image-box-alt-test"]').type('Girl');
    cy.get('[data-testid="image-box-url-test"]').type('https://images.pexels.com/photos/1202363/pexels-photo-1202363.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
    cy.get('[data-testid="image-box-create-btn-test"]').click();

    // Moving the image box on the slide
    cy.get('[data-testid^="image-box-element-test"]').first().trigger('mousedown', {
      button: 0, // Left button
      clientX: 100,
      clientY: 100,
    });
    cy.get('[data-testid^="image-box-element-test"]').first().trigger('mousemove', {
      clientX: 400,
      clientY: 400,
    });
    cy.get('[data-testid^="image-box-element-test"]').first().trigger('mouseup', { force: true });

    // Adding a new video through url on the slide
    cy.get('[data-testid="edit-btn"]').click();
    cy.get('[data-testid="add-video-box-btn"]').click();
    cy.get('[data-testid="title-video-url-box-test"]').type('https://www.youtube.com/watch?v=lK4EZiIpC14&ab_channel=AmericanMuseumofNaturalHistory');
    cy.get('[data-testid="autoplay-checkbox-btn"]').click()
    cy.get('[data-testid="create-new-video-box-btn"]').click();

    // Adding a new code on the slide 3
    cy.get('[data-testid^="data-test-slide-"]').eq(2).click();
    cy.get('[data-testid="edit-btn"]').click();
    cy.get('[data-testid="add-code-box-btn"]').click();
    cy.get('[data-testid="main-code-box-test"]').type('import fs from \'fs/promises\';\nconsole.log(data);');
    cy.get('[data-testid="main-code-box-font-size-test"]').type('.1');
    cy.wait(1000);
    cy.get('[data-testid="create-new-code-box-btn"]').click();

    // Adding a new code on the slide 4
    cy.get('[data-testid^="data-test-slide-"]').eq(3).click();
    cy.get('[data-testid="edit-btn"]').click();
    cy.get('[data-testid="add-code-box-btn"]').click();
    cy.get('[data-testid="main-code-box-test"]').type('import sys\nprint("Hello,World!")');
    cy.get('[data-testid="main-code-box-font-size-test"]').type('.1');
    cy.wait(1000);
    cy.get('[data-testid="create-new-code-box-btn"]').click();

    // Logging out
    cy.get('[data-testid^="presentation-go-back-"]').click();
    cy.get('[data-testid="logout-btn"]').click();

    // Logging back in to check everything saved in DB
    cy.get('[data-testid="email-login-data"]').type(`${uniqueEmail}`);
    cy.get('[data-testid="password-login-data"]').type('yourpassword');
    cy.get('[data-testid="login-button"]').click();

    // Opening the presentation again
    cy.get('[data-testid^="presentation-card-"]').first().click();
    cy.url().should('include', '/presentation');

    // Adding 4 more slides to the presentation
    cy.get('[data-testid="add-slide-button"]').click();
    cy.get('[data-testid="add-slide-button"]').click();
    cy.get('[data-testid="add-slide-button"]').click();
    cy.get('[data-testid="add-slide-button"]').click();

    // Again simulating moving between slides
    cy.get('[data-testid^="data-test-slide-"]').eq(1).click();
    cy.get('[data-testid^="data-test-slide-"]').eq(3).click();
    cy.get('[data-testid^="data-test-slide-"]').eq(2).click();
    cy.get('[data-testid^="data-test-slide-"]').eq(4).click();

    // Simulating moving between slides using the arrows on the botom of the page
    cy.get('[data-testid="btn-go-right"]').click()
    cy.get('[data-testid="btn-go-left"]').click()
    cy.get('[data-testid="btn-go-left"]').click()

    // Adding an image on the slide using upload option and deleting it using right click
    cy.get('[data-testid="edit-btn"]').click();
    cy.get('[data-testid="add-image-box-btn"]').click();
    cy.get('input[type="radio"][value="upload"]').click();
    cy.get('[data-testid="image-box-alt-test"]').type('Girl2');
    cy.get('[data-testid="image-box-upload-test-btn"]').click();
    cy.get('[data-testid="image-box-upload-test"]').attachFile('girl2.jpg');
    cy.get('[data-testid="image-box-create-btn-test"]').click();
    cy.get('[data-testid="image-box-element-test"]').first().rightclick();

    // Simulating different kind of delete slide behaviour to change the selected slide etc
    cy.get('[data-testid^="slide-delete-btn-test-"]').eq(1).click();
    cy.get('[data-testid^="slide-delete-btn-test-"]').first().click();
    cy.get('[data-testid="btn-go-left"]').click()
    cy.get('[data-testid^="slide-delete-btn-test-"]').eq(1).click();

    // Deleting all the slides to simulate last slide delete asks to delete the presentation
    cy.get('[data-testid^="slide-delete-btn-test-"]').first().click();
    cy.get('[data-testid^="slide-delete-btn-test-"]').first().click();
    cy.get('[data-testid^="slide-delete-btn-test-"]').first().click();
    cy.get('[data-testid^="slide-delete-btn-test-"]').first().click();
    cy.get('[data-testid^="slide-delete-btn-test-"]').first().click();
    cy.get('[data-testid^="slide-delete-btn-test-"]').first().click();

    // All presentations deleted
    cy.get('[data-testid="delete-presentation-delete-slide"]').click()

  });
});

