import faker from 'faker';

describe('Profile', () => {
  it('Visits the profile url', () => {
    cy.login('admin@admin.com');
    cy.visit('/profile');
    // url should be /profile
    cy.url().should('include', '/profile');
    cy.get('input[name=email]').should('have.value', 'admin@admin.com');
    // Logout
    cy.logout()
  });
  it('Checks input types', () => {
    cy.login('admin@admin.com');
    cy.visit('/profile');
    // Checks input type is email
    cy.get('input[name=email]')
      .invoke('attr', 'type')
      .should('contain', 'email');
    // Checks input email is disabled
    cy.get('input[name=email]')
      .invoke('attr', 'disabled')
      .should('contain', 'disabled');
    // Checks input type is text
    cy.get('input[name=name]').invoke('attr', 'type').should('contain', 'text');
    cy.get('input[name=city]').invoke('attr', 'type').should('contain', 'text');
    cy.get('input[name=country]')
      .invoke('attr', 'type')
      .should('contain', 'text');
    // Checks input type is url
    cy.get('input[name=urlTwitter]')
      .invoke('attr', 'type')
      .should('contain', 'url');
    cy.get('input[name=urlGitHub]')
      .invoke('attr', 'type')
      .should('contain', 'url');
    // Checks input type is tel
    cy.get('input[name=phone]').invoke('attr', 'type').should('contain', 'tel');
    // Logout
    cy.logout()
  });
  // eslint-disable-next-line max-statements
  it('Edits profile', () => {
    cy.login('admin@admin.com');
    cy.setLocaleToEN()
    cy.visit('/profile');

    const name = `${faker.name.firstName()} ${faker.name.lastName()}`
    const phone = faker.phone.phoneNumber()
    const country = faker.random.word()
    const urlTwitter = faker.internet.url()
    const urlGitHub = faker.internet.url()
    // name
    cy.get('input[name=name]').clear().type(name)
    // phone
    cy.get('input[name=phone]').clear().type(phone)
    // city
    cy.get('i.mdi-menu-down').should('have.class', 'mdi-menu-down').click()
    cy.get('div.v-list-item__title').contains('Cali').click()
    cy.get('#city').clear({ force: true })
    cy.get('i.mdi-menu-down').should('have.class', 'mdi-menu-down').click()
    cy.get('div.v-list-item__title').contains('Bucaramanga').click()
    // country
    cy.get('input[name=country]').clear().type(country)
    // Twitter
    cy.get('input[name=urlTwitter]').clear().type(urlTwitter)
    // GitHub
    cy.get('input[name=urlGitHub]').clear().type(urlGitHub)
    // Save button
    cy.get('button.btnSave').click()
    cy.get('div.success')
      .should('be.visible')
      .contains('Profile saved successfuly');
    // Confirm values
    cy.get('input[name=name]').should('have.value', name)
    cy.get('input[name=phone]').should('have.value', phone)
    cy.get('input[name=city]').should('have.value', 'Bucaramanga');
    cy.get('input[name=country]').should('have.value', country)
    cy.get('input[name=urlTwitter]').should('have.value', urlTwitter)
    cy.get('input[name=urlGitHub]').should('have.value', urlGitHub)
    // Logout
    cy.logout()
  });
  it('Checks input types for change password', () => {
    cy.login('admin@admin.com');
    cy.visit('/profile');
    cy.get('button.btnChangePassword').click()
    cy.get('div.v-dialog.v-dialog--active').should('be.visible');
    // Checks input type is password
    cy.get('input[name=oldPassword]')
      .invoke('attr', 'type')
      .should('contain', 'password');
    cy.get('input[name=newPassword]')
      .invoke('attr', 'type')
      .should('contain', 'password');
    cy.get('input[name=confirmPassword]')
      .invoke('attr', 'type')
      .should('contain', 'password');
  })
  it('Displays errors when current password is wrong', () => {
    cy.login('admin@admin.com');
    cy.setLocaleToEN()
    cy.visit('/profile');
    cy.get('button.btnChangePassword').click()
    cy.get('div.v-dialog.v-dialog--active').should('be.visible');
    cy.get('input[name=oldPassword]').clear().type('12345678');
    cy.get('input[name=newPassword]').clear().type('12345');
    cy.get('input[name=confirmPassword]').clear().type('12345');
    cy.get('#updatePassword').contains('Save').click({ force: true })
    cy.get('div.error').should('be.visible').contains('Wrong password');
  })
  it('Change password', () => {
    cy.login('admin@admin.com');
    cy.setLocaleToEN()
    cy.visit('/profile');
    cy.get('button.btnChangePassword').click()
    cy.get('div.v-dialog.v-dialog--active').should('be.visible');
    cy.get('input[name=oldPassword]').clear().type('12345');
    cy.get('input[name=newPassword]').clear().type('12345');
    cy.get('input[name=confirmPassword]').clear().type('12345');
    cy.get('#updatePassword').contains('Save').click({ force: true })
    cy.get('div.success')
      .should('be.visible')
      .contains('Password changed successfully');
    // Logout
    cy.logout()
  });
})
