describe('Settings - Invites', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/');
    });

    it('Should invite user', () => {
        cy.findAllByTestId('settings-menu').click();
        cy.findByRole('menuitem', { name: 'Organization settings' }).click();

        cy.contains('User management').click();
        cy.contains('Add user').click();
        cy.findByLabelText('Enter user email address *').type(
            'demo+marygreen@lightdash.com',
        );
        cy.contains(/(Generate|Send) invite/).click();
        cy.get('#invite-link-input')
            .should('be.visible')
            .then(($input) => {
                const value = $input.val();
                if (typeof value === 'string') {
                    cy.logout();
                    cy.visit(value);
                }
            });
        cy.get('[data-cy="welcome-user"]').should('be.visible');
        cy.contains('Join your team').click();
        cy.findByLabelText('First name *').type('Mary');
        cy.findByLabelText('Last name *').type('Green');
        cy.findByLabelText('Email address *')
            .should('be.disabled')
            .should('have.value', 'demo+marygreen@lightdash.com');
        cy.findByLabelText('Password *').type('PasswordMary1');
        cy.contains('Sign up').click();
        cy.findByLabelText('One-time password *').type('000000');
        cy.contains('Submit').click();
        cy.contains('Continue').click();
        cy.findByTestId('user-avatar').should('contain', 'MG');
    });

    it('Should delete user', () => {
        cy.findAllByTestId('settings-menu').click();
        cy.findByRole('menuitem', { name: 'Organization settings' }).click();

        cy.contains('User management').click();
        cy.findByText('demo+marygreen@lightdash.com')
            .parents('.bp4-card')
            .find('[icon="delete"]')
            .click();
        cy.findByText('Are you sure you want to delete this user ?')
            .parents('.bp4-dialog')
            .findByRole('button', { name: 'Delete' })
            .click();
        cy.findByText('Success! User was deleted.').should('be.visible');
        cy.findByText('demo+marygreen@lightdash.com').should('not.exist');
    });
});
