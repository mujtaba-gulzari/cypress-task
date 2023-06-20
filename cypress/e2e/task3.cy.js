import t3Data from "../fixtures/task3Vars.json"
import t3BookData from "../fixtures/t3BookDetails.json"

describe('Cowlar Task3', () => {

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    })

    it('Tests for task3', () => {
        cy.visit('https://demoqa.com/');

        cy
            .get('header')
            .find('img')
            .should('have.attr', 'src', '/images/Toolsqa.jpg')

        cy
            .contains('Book Store Application')
            .click()

        cy
            .url()
            .should('include', '/books')

        cy
            .get('li')
            .contains('Book Store')
            .click()

        cy
            .intercept({
                method: 'GET',
                url: 'https://demoqa.com/BookStore/v1/Book?ISBN=9781593277574'
            })
            .as('bookStore')

        cy
            .get('.main-header')
            .should('have.text', 'Book Store')

        cy
            .contains(t3Data.bookTitile)
            .click()


        cy
            .get('#title-wrapper')
            .should('have.text', 'Title : ' + t3Data.bookTitile)

        cy
            .get('#author-wrapper')
            .should('have.text', 'Author : ' + t3Data.bookAuthor)

        cy
            .get('#publisher-wrapper')
            .should('have.text', 'Publisher : ' + t3Data.bookPublisher)

        /*
                I tried to use cy.wait('@bookStore').then((response)=>{ }) and access the response body from there. 
                But the test failed due to response.body being returned as an html instead of a JSON or array, 
                response.body would return "<!doctype html><html><head><meta name="viewport" c…>\x3Cscript src="/bundle.js">\x3C/script></body></html>"
                If it were returning a JSON or array, I would have easily grabbed the body object (isbn, title, etc) easily and verify.
                As an alternative, Im calling the same GET request again and verifying the components. 
        */
        cy
            .request({
                method: 'GET',
                url: 'https://demoqa.com/BookStore/v1/Book?ISBN=9781593277574'
            })
            .then((response) => {
                expect(response.body.isbn).to.eq(t3BookData.isbn)
                expect(response.body.title).to.eq(t3BookData.title)
                expect(response.body.subTitle).to.eq(t3BookData.subTitle)
                expect(response.body.author).to.eq(t3BookData.author)
                expect(response.body.publish_date).to.eq(t3BookData.publish_date)
                expect(response.body.publisher).to.eq(t3BookData.publisher)
                expect(response.body.pages).to.eq(t3BookData.pages)
                expect(response.body.description).to.eq(t3BookData.description)
                expect(response.body.website).to.eq(t3BookData.website)
            })

    })
})