describe('Cowlar Task1', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  })


  it('Tests for task1', () => {
    // cy.viewport(1400, 1400)

    cy.visit('https://demoqa.com/');

    cy
      .contains('Forms')
      .click()

    cy
      .contains('Practice Form')
      .click()

    let firstName = 'Cowlar'
    cy
      .get('#firstName')
      .type(firstName)

    let lastName = 'Developer'
    cy
      .get('#lastName')
      .type(lastName)

    let userEmail = 'qaengineer@cowlar.com'
    cy
      .get('#userEmail')
      .type(userEmail)

    cy
      .contains('Male')
      .click()
    /*
            cy
            .get('[name="gender"]')
            .first()
            .check({ force: true })
    */


    let userNumber = '0123456789'
    cy
      .get('#userNumber')
      .type(userNumber)

    /*
        var dateOfBirth;
        cy
          .get('#dateOfBirthInput')
          .invoke('val')
          .as('dob')
        cy
          .get('@dob')
          .then((text) => {
            dateOfBirth = text;
          })
        cy.log(dateOfBirth)
    */
    let subject = 'Computer Science'
    cy
      .get('#subjectsContainer')
      .click()

    cy
      .get('#subjectsInput')
      .type(subject + '{Enter}')

    cy
      .contains('Music')
      .click()
    /*
        cy
          .get('[type="checkbox"]')
          .eq(2)
          .check({ force: true })
    */

    let currentAddress = 'Address 1'
    cy
      .get('#currentAddress')
      .type(currentAddress)


    cy
      .get('#adplus-anchor')
      .as('ad')

    cy
      .get('@ad')
      .invoke('css', 'display', 'none')

    cy
      .contains('Select State')
      .click()
      .get('#react-select-3-option-0')
      .click()

    cy
      .contains('Select City')
      .click()
      .get('#react-select-4-option-0')
      .click()

    cy
      .get('#submit')
      .click({ force: true })   //Submit button is covered by page footer. We can increase the resolution to fix this. Done in Task2
    //therefore for a quick fix, I used { force: true}

    //Please enter current date in array[4]
    let array = [firstName + ' ' + lastName, userEmail, 'Male', userNumber, '14 June,2023', subject, 'Music', '', currentAddress, 'NCR Delhi']
    let j = 0;
    for (let i = 1; i < 20; i += 2) {
      cy
        .get('td')
        .eq(i)
        .should('have.text', array[j]);
      j++;
    }

    cy
      .get('#closeLargeModal')
      .click()
  })
})