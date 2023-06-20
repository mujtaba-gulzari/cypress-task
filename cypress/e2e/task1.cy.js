import t1Data from '../fixtures/task1Vars.json'

describe('Cowlar Task1', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  })


  it('Tests for task1', () => {

    cy.visit('https://demoqa.com/');

    cy
      .contains('Forms')
      .click()

    cy
      .contains('Practice Form')
      .click()

    cy
      .get('#firstName')
      .type(t1Data.firstName)

    cy
      .get('#lastName')
      .type(t1Data.lastName)

    cy
      .get('#userEmail')
      .type(t1Data.userEmail)

    cy
      .contains('Male')
      .click()


    cy
      .get('#userNumber')
      .type(t1Data.userNumber)

    cy
      .get('#subjectsContainer')
      .click()

    cy
      .get('#subjectsInput')
      .type(t1Data.subject + '{Enter}')

    cy
      .contains('Music')
      .click()


    cy
      .get('#currentAddress')
      .type(t1Data.currentAddress)


    cy
      .get('#adplus-anchor')
      .as('ad')

    cy
      .get('@ad')
      .invoke('css', 'display', 'none')

    cy
      .contains('Select State')
      .click()
      .get('[tabindex="-1"]')
      .contains("NCR")
      .click()

    cy
      .contains('Select City')
      .click()
      .get('[tabindex="-1"]')
      .contains('Delhi')
      .click()

    cy
      .get('#submit')
      .click({ force: true })   //Submit button is covered by page footer. We can increase the resolution to fix this. Done in Task2
    //therefore for a quick fix, I used { force: true}

    //Please enter current date in array[4]
    let array = [t1Data.firstName + ' ' + t1Data.lastName, t1Data.userEmail, 'Male', t1Data.userNumber, '20 June,2023', t1Data.subject, 'Music', '', t1Data.currentAddress, 'NCR Delhi']

    //Removed the for loop. 
    cy
      .get('td')
      .eq(1)
      .should('have.text', array[0])

    cy
      .get('td')
      .eq(3)
      .should('have.text', array[1])

    cy
      .get('td')
      .eq(5)
      .should('have.text', array[2])

    cy
      .get('td')
      .eq(7)
      .should('have.text', array[3])

    cy
      .get('td')
      .eq(9)
      .should('have.text', array[4])

    cy
      .get('td')
      .eq(11)
      .should('have.text', array[5])

    cy
      .get('td')
      .eq(13)
      .should('have.text', array[6])

    cy
      .get('td')
      .eq(15)
      .should('have.text', array[7])

    cy
      .get('td')
      .eq(17)
      .should('have.text', array[8])

    cy
      .get('#closeLargeModal')
      .click()
  })
})