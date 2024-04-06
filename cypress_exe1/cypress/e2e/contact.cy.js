import ContactUsPage from "../pages/ContactUsPage"

describe('Contact Page Validating', () => {
  before(() => {
  })

  beforeEach(() => {
    ContactUsPage.visit()
    ContactUsPage.acceptCookie()
  })

  it('verifies form elements are present and visible', () => {
    //Ensures all form elements (name fields, email, mobile number, dropdown, message, submit button) are present and visible.

    ContactUsPage.firstNameInput().should('be.visible');
    ContactUsPage.lastNameInput().should('be.visible');
    ContactUsPage.emailInput().should('be.visible');
    ContactUsPage.mobileNumberInput().should('be.visible');
    ContactUsPage.contactMethodDropdown().should('be.visible'); 
    ContactUsPage.messageInput().should('be.visible');
    ContactUsPage.submitButton().should('be.visible'); 

  })
  it('shows error messages for empty fields', () => {

    ContactUsPage.submitButton().click();
    ContactUsPage.firstNameInput().scrollIntoView()
    ContactUsPage.fieldErrorMessage('firstname').should('have.text', "Please complete this required field.");
    ContactUsPage.fieldErrorMessage('lastname').should('have.text', "Please complete this required field.");
    ContactUsPage.fieldErrorMessage('email').should('have.text', "Please complete this required field.");
    ContactUsPage.fieldErrorMessage('mobilephone').should('have.text', "Please complete this required field.");
    ContactUsPage.fieldErrorMessage('message').should('have.text', "Please complete this required field."); 
    cy.get('div.hs_error_rollup > ul.hs-error-msgs label.hs-main-font-element').should('have.text', "Please complete all required fields.")
  });


  it('verify email and mobile number with invalid values', () => {
    const data = {
      invalidemail: 'test@test',
      validFormat: 'test@gamil.com',
      invalidNumber: '23456',
      randomtext: '123bbbb',
    };
    // Enter email in incorrect format
    ContactUsPage.emailInput().type(data.invalidemail);
    ContactUsPage.fieldErrorMessage('email').should('have.text', "Email must be formatted correctly.");

    // Enter email in invalid format
    ContactUsPage.emailInput().clear().type(data.validFormat).blur();
    ContactUsPage.fieldErrorMessage('email').should('have.text', "Please enter a valid email address.");
    ContactUsPage.emailSuggestion().should('have.text', "Did you mean test@gmail.com?");

    //click on it and verify value change  in input
    ContactUsPage.emailSuggestion().click()
    ContactUsPage.emailInput().should('have.value','test@gmail.com')

    //enter invalid phone number
    ContactUsPage.mobileNumberInput().type(data.invalidNumber).blur();
    ContactUsPage.fieldErrorMessage('mobilephone').should('have.text', "The number you entered is not in range.");

    //enter phone number with text
    ContactUsPage.mobileNumberInput().clear().type(data.randomtext).blur();
    ContactUsPage.fieldErrorMessage('mobilephone').should('have.text', "A valid phone number may only contain numbers, +()-. or x");
  });


  it('submits form with valid data', () => {
    const data = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      mobileNumber: '1234567890',
      contactMethod: 'Article', 
      message: 'This is a test message.'
    };
    
    ContactUsPage.firstNameInput().type(data.firstName);
    ContactUsPage.lastNameInput().type(data.lastName);
    ContactUsPage.emailInput().type(data.email);
    ContactUsPage.mobileNumberInput().type(data.mobileNumber);
    ContactUsPage.contactMethodDropdown().select(data.contactMethod);
    ContactUsPage.messageInput().type(data.message);
    ContactUsPage.submitButton().scrollIntoView().click();
    //cy.get('div.hs_error_rollup > ul.hs-error-msgs label.hs-main-font-element').should('have.text', "Failed to validate Captcha. Please try again.")
  });
})