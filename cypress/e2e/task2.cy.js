describe('Cowlar Task2', () => {
  
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
      })

    it('Tests for task1', () => {
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

      for(let i=0; i<6; i++){
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
                      /*.get('.element-list')
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
      .trigger('mousemove', { clientX : 50, clientY : 50 })
      cy
      .get('@re-box1')
      .trigger('mouseup')


      cy
      .get('@re-box1')
      .trigger('mousedown')
      cy
      .get('@re-box1')
      .trigger('mousemove', { clientX : 800, clientY : 600 })
      cy
      .get('@re-box1')
      .trigger('mouseup', {force: true})


      cy
      .get('.react-resizable-handle')
      .eq(1)
      .as('re-box2')

      cy
      .get('@re-box2')
      .trigger('mousedown')
      cy
      .get('@re-box2')
      .trigger('mousemove', { clientX : 400, clientY : 400 })
      cy
      .get('@re-box2')
      .trigger('mouseup', {force: true})
    })

})