describe('Cowlar Task2', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  })

  it('Test run at modified resolution', () => {
    cy.viewport(1400, 800);
    cy.visit('https://demoqa.com/');

    cy
      .get('header')
      .find('img')
      .should('have.attr', 'src', '/images/Toolsqa.jpg')

    cy
      .contains('Interactions')
      .click()

    cy
      .get('.main-header')
      .should('have.text', 'Interactions')

    for (let i = 0; i < 6; i++) {
      let array = ['Elements', 'Forms', 'Alerts, Frame & Windows', 'Widgets', 'Interactions', 'Book Store Application']
      cy
        .get('.element-group')
        .eq(i)
        .find('.header-text')
        .should('have.text', array[i])
    }

    cy
      .contains('Resizable')
      .click()
    /*
        .get('.element-list')
         .eq(4)
         .invoke('css', 'display', 'block')
         .then(() => {
           cy
           .contains('Resizable')
           .click()
         })
    */

    cy
      .get('.main-header')
      .should('have.text', 'Resizable')

    cy
      .get('#resizableBoxWithRestriction')
      .should('have.css', 'height')
      .and('eq', '200px')
    cy
      .get('#resizableBoxWithRestriction')
      .should('have.css', 'width')
      .and('eq', '200px')

    cy
      .get('#close-fixedban')
      .invoke('css', 'display', 'none')

    cy
      .get('.react-resizable-handle')
      .eq(0)
      .as('re-box1')
    cy
      .get('@re-box1')
      .trigger('mousedown')
    cy
      .get('@re-box1')
      .trigger('mousemove', { clientX: 50, clientY: 50 })
    cy
      .get('@re-box1')
      .trigger('mouseup')

    cy
      .get('#resizableBoxWithRestriction')
      .should('have.css', 'height')
      .and('eq', '150px')
    cy
      .get('#resizableBoxWithRestriction')
      .should('have.css', 'width')
      .and('eq', '150px')


    cy
      .get('@re-box1')
      .trigger('mousedown')
    cy
      .get('@re-box1')
      .trigger('mousemove', { clientX: 857, clientY: 600 })
    cy
      .get('@re-box1')
      .trigger('mouseup')    //here the resize handle gets covered by the ad element at default resolution

    cy
      .get('#resizableBoxWithRestriction')
      .should('have.css', 'height')
      .and('eq', '300px')
    cy
      .get('#resizableBoxWithRestriction')
      .should('have.css', 'width')
      .and('eq', '500px')

    cy
      .get('.react-resizable-handle')
      .eq(1)
      .as('re-box2')

    cy
      .get('@re-box2')
      .trigger('mousedown')
    cy
      .get('@re-box2')
      .trigger('mousemove', { clientX: 500, clientY: 500 })
    /*
      The second box is resizable only after changing the resolution of the browser application
      I used the cy.viewport() method to increase the resolution. Otherwise at default resolution
      the resize handle was hidden by the page footer.

      Even after resizing, the test fails if the resize handle is hidden when triggering 
      mouseup method. The handle has to be visible and interractable at all events for the box
      to be resizable.
    */
    cy
      .get('@re-box2')
      .trigger('mouseup')
  })

  it('Test run at default resolution', () => {
    cy.visit('https://demoqa.com/');

    cy
      .contains('Interactions')
      .click()

    cy
      .contains('Resizable')
      .click()


    cy
      .get('.react-resizable-handle')
      .eq(1)
      .as('re-box2')

    cy
      .get('@re-box2')
      .trigger('mousedown')
    cy
      .get('@re-box2')
      .trigger('mousemove', { clientX: 500, clientY: 500 })
    /*
      Here the test runs fails, since the handle does not have room and is covered by the page footer.
    */
    cy
      .get('@re-box2')
      .trigger('mouseup')
  })

})