class SSOPage {

    clickSignIn() {
        // Click on the Sign in button
        cy.contains('button.sso-nav__button', 'Sign in')
            .should('be.visible')
            .click();
        //the --login modifier helps selecting the specific link from multiple links within the sso-nav__list-item-link block
        cy.contains('.sso-nav__list-item-link--login', 'Sign in')
            .should('be.visible')//best for hidden elements
            .click();

        cy.url().should('include', 'https://sso.wtatennis.com/auth/realms/wta/protocol/openid-connect/auth');


    }

    clickJoinForFree() {
        // Click on the Sign in button
        cy.contains('.sso-nav__button', 'Sign in')
            .should('be.visible')
            .click();

        cy.contains('.sso-nav__list-item-link--register', 'Join for free')
            .should('be.visible')//best for hidden elements
            .click();

        cy.url().should('include', 'https://sso.wtatennis.com/auth/realms/wta/protocol/openid-connect/registrations');


    }



    fillForm(...args) {
        if (args.length === 1 && typeof args[0] === 'object') {
            // Assume args[0] is an object containing user information
            this.fillSignUpForm(args[0]);
        } else if (args.length === 2 && typeof args[0] === 'string' && typeof args[1] === 'string') {
            // Assume args[0] is an email and args[1] is a password
            this.fillSignInForm(args[0], args[1]);
        } else {
            throw new Error('Invalid arguments provided to fillForm method');
        }
    }

    fillSignUpForm(user) {
        cy.get('#firstName').type(user.name);
        cy.get('#lastName').type(user.name);
        cy.get('#email').type(user.email);
        cy.get('#password').type(user.password);
        cy.get('#password-confirm').type(user.password);
        cy.get('#termsAccepted').check();
    }

    fillSignInForm(email, password) {
        cy.get('#username').type(email);
        cy.get('#password').type(password);

    }
}

export default SSOPage;