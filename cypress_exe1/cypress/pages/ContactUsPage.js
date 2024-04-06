class ContactUsPage {
    constructor(){
        
    }
    static visit() {
      cy.visit('/contact'); 
    }
  
    static firstNameInput() {
      return cy.get('input[name="firstname"]');
    }
  
    static lastNameInput() {
      return cy.get('input[name="lastname"]');
    }
  
    static emailInput() {
      return cy.get('input[name="email"]');
    }
  
    static mobileNumberInput() {
      return cy.get('input[name="mobilephone"]');
    }
  
    static contactMethodDropdown() {
      return cy.get('select[name="how_did_you_hear_about_us_"]');
    }
  
    static messageInput() {
      return cy.get('textarea[name="message"]');
    }
  
    static submitButton() {
      return cy.get('input[type="submit"]').should('be.visible');
    }
  
    static fieldErrorMessage(type) {
      return cy.get(`div.hs_${type} > ul.hs-error-msgs label.hs-error-msg`);
    }

    static emailSuggestion(){
        return cy.get(`div.hs_email > ul.hs-error-msgs > li > label > a`);
    }

    // Method to fill the form with data (optional, can be customized)
    static fillForm(data) {
      this.firstNameInput.type(data.firstName);
      this.lastNameInput.type(data.lastName);
      this.emailInput.type(data.email);
      this.mobileNumberInput.type(data.mobileNumber);
      this.contactMethodDropdown.select(data.contactMethod);
      this.messageInput.type(data.message);
    }

    static acceptCookie() {
        cy.get('body').then($body => {
            if($body.find("button#hs-eu-confirmation-button").length > 0){
                cy.get("button#hs-eu-confirmation-button").click()
            }
        })
    }
  }
  
  export default ContactUsPage;
  