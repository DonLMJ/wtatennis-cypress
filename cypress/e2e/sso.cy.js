import * as helpers from '../support/helpers'
import SSOPage from '../po/sso_page'

describe('sso test', () => {

    let ssoPage;

    beforeEach(function () {
        // Load the fixture data before each test and assign it to this.creds
        cy.fixture('credentials').as('creds').then((creds) => {
            this.creds = creds;
        });

        // Generate a new user and assign it to this.newUser
        this.newUser = helpers.user();
        ssoPage = new SSOPage();
        cy.visit('/');
    });

    it('Log in as an existing user', function () {
        //The userPreferences request is likely a key step in the application logic where user-specific preferences or data are fetched, and it serves as a good indicator that the user has been successfully authenticated and their session has been established
        cy.interceptRequest('userPreferences');

        ssoPage.clickSignIn();
        ssoPage.fillForm(this.creds.username, this.creds.password)
        cy.get('form').submit();

        cy.wait('@userPreferences').its('response.statusCode').should('eq', 200);
        cy.get('.sso-nav__button').contains(this.creds.firstname);
        cy.get('.benefits-promo__description--logged-in')
            .contains('Welcome back, you’ve unlocked the world of the WTA!')

    });

    it.skip('Attempt to login using invalid credentials', function () {
        ssoPage.clickSignIn();
        ssoPage.fillForm(this.creds.username, this.newUser.password)
        cy.get('form').submit();

        cy.get('#input-error').contains('Invalid username or password.');
    });

    it('Register a new user', function () {
        // Intercept the GET request for the login-actions page
        cy.interceptRequest('loginActions');

        ssoPage.clickJoinForFree();
        ssoPage.fillForm(this.newUser);

        // Submit the registration form
        cy.get('form').submit();

        // Wait for the intercepted request and validate its response
        cy.wait('@loginActions').its('response.statusCode').should('eq', 200);

        // Assert that the URL equals the expected redirection URL after registration
        cy.url().should('include', 'https://sso.wtatennis.com/auth/realms/wta/login-actions/required-action?execution=VERIFY_EMAIL');
        // Verify that the confirmation message is displayed
        cy.contains('To activate your account you need to verify your email address').should('be.visible');
        // Assert that the page contains a link with text 'Click here' and the correct href attribute
        cy.contains('Click here').should('have.attr', 'href').and('include', '/auth/realms/wta/login-actions/required-action');
    });

})