# HOW TO RUN TESTING:

# step 1

Start Your Application: Ensure it's served with instrumentation by running:
npm start

# step 2

Open or Run Cypress:
To interactively open Cypress:
npm run cypress:open

# step 3

Or to run Cypress tests headlessly:
npm run cypress:run

# step 4

Generate the Coverage Report
After tests complete, generate your coverage report:
npm run test:coverage

# END HOW TO RUN TESTING

# Beautiful testing Route 2:

1. User goes to register page and registers
2. User creates 2 new presentations in the dashboard
3. User opens and deletes the first presentation for testing
4. User opens the second presentation and adds 4 new slides on the presentation
5. User randomly goes to different slides
6. User creates a text box and moves it on the slide
7. User then adds a new image using url functionality and then moves it
8. User now adds a new video on the slide and sets auto-play true
9. User then goes to a different slide and adds some python code
10. User again goes to a different slide and adds some js code
11. User logs out and then logs back in
12. Everything is loading fine as it was saved in the DB
13. User opens the presentation 2 again and adds 4 more slides
14. User now moves between slides using arrow click on the screen
15. User then adds another image in the presentation and deletes it using right click
16. User then deletes all the slides hence deleting the presentation
17. User back on the dashboard

# CREATED MORE E2E TESTING TO INCREASE COVERAGE TO (85%)+

# COMMENTS FOR COMPONENT TESTING

## `<AuthBox />` Component Testing

### Component Overview

The `<AuthBox />` component is responsible for user authentication, encompassing
both login and registration forms. It ensures visual consistency and
functionality through styled components.

### Test Description

#### Rendering Test

- **Objective:** Verify that `<AuthBox />` mounts with all essential elements
  and styles correctly applied.
- **Method:** Cypress’s `mount` function simulates rendering in a virtual DOM.
  Assertions check the presence and styling of elements identified by `data-testid`.

#### CSS Property Validation

- **Objective:** Confirm that the component adheres to specified CSS styles
  critical for layout and visual appeal.
- **Method:** The CSS properties of elements like background color, width,
  border-radius, and display properties are validated against expected values
  using Cypress's assertions.

## `<CustomPrimaryButton />` Component Testing

### Component Overview

The `<CustomPrimaryButton />` is a React component designed for flexibility and
accessibility, featuring customizable properties such as labels, onClick events,
and styling.

### Test Description

**Rendering Test** Verifies that the component renders with the correct label as
specified by the label prop.
**Event Handling Test**: Ensures that the button's onClick event is triggered
when clicked, with functionality verified using a spy.
**Disabled State Test**: Confirms the button is disabled when the disabled prop
is set, preventing user interactions.
**Styling Test: Assesses** the application of additional styles passed through
props, checking for correct implementation in the button’s appearance.
**Accessibility Test**: Tests the button's accessibility by ensuring it can
receive and show focus correctly when navigated via keyboard.

## `<CustomModal />` Component Testing

### Component Overview

The `<CustomModal />` is a React component designed to display modal dialogues,
offering properties such as dynamic visibility controlled by an open prop,
a handleClose function to manage closing actions, and customizable styles.

### Test Description

**Rendering Test** Verifies that the modal is visible and contains the correct
content when the open prop is set to true.

**Visibility Test** Ensures that the modal does not render when the open prop is
false, maintaining the UI clean from unused elements.

**Close Function Test** Confirms that the handleCloseCreateTextBox function is
executed when the modal is intended to be closed, verifying proper callback handling.

**Styling Test** Assesses the application of custom styles to the modal,
ensuring that the styles passed through props are correctly applied, reflecting
the correct dimensions and colors as expected.

## `<InputWithLabels />` Component Testing

### Component Overview

The `<InputWithLabels />` is a React component designed to encapsulate input
fields with labels, making them reusable and customizable with properties like
label, placeholder, type, and value management through a setValue function.

### Test Description

**Interaction Test** Confirms that typing into the input correctly triggers the
setValue function with the new input value as an argument.

**Label Rendering Test** Verifies that the component correctly renders with the
provided label text, ensuring label consistency and proper attribute handling
such as placeholder and type.

**Responsive Style Test** Assesses the component’s responsiveness by simulating a
small screen environment and ensuring it adjusts styles accordingly.

## `<InputLabelRange />` Component Testing

### Component Overview

The `<InputLabelRange />` component provides a slider input field with a label,
allowing users to select a value within a specified range.

### Test Description

**Rendering Test** Verifies that the component renders successfully, ensuring
the presence of the input range element.

**Value Update Test** Ensures the slider's value updates correctly when the user
interacts with it, validating that the change event triggers and updates the
value accordingly.

## `<RedirectInfo />` Component Testing

### Component Overview

The `<RedirectInfo />` component displays informational text along with a
clickable redirect option, typically used for guiding users to related pages or
actions.

### Test Description

**Rendering Test** Checks if the component renders with the provided text and
redirect text, ensuring text consistency and proper styling for the redirect option.

**Redirect Handler Test** Verifies that clicking on the redirect text invokes
the provided handler function, validating proper functionality and user interaction.

**Styling Test** Assesses the application of additional styles to the component,
ensuring that custom styles are correctly applied as specified.

## `<TextBoxWithLabel />` Component Testing

### Component Overview

The `<TextBoxWithLabel />` component combines a text input field with a
descriptive label, facilitating user input with visual guidance.

### Test Description

**Value Update Test** Ensures that the component updates its value correctly
when the user types into the input field, validating proper state management
and value propagation.

**Label and Placeholder Test** Verifies that the component renders with the
correct label and placeholder, ensuring proper labeling and input field guidance.

**Initial Value Test** Checks if the component displays the correct initial
value when mounted, ensuring proper initialization and state handling.

**User Input Test** Validates that the component allows users to change the
input value through user interactions, ensuring proper functionality and value
updating.
