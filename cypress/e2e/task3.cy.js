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

        let bookTitile = 'Understanding ECMAScript 6'
        cy
            .contains(bookTitile)
            .click()

        cy
            .get('#title-wrapper')
            // .find('#title-label')
            .should('have.text', 'Title : ' + bookTitile)

        let bookAuthor = 'Nicholas C. Zakas'
        cy
            .get('#author-wrapper')
            .should('have.text', 'Author : ' + bookAuthor)

        let bookPublisher = 'No Starch Press'
        cy
            .get('#publisher-wrapper')
            .should('have.text', 'Publisher : ' + bookPublisher)

        /*
                I tried to use cy.wait('@bookStore').then((response)=>{ }) and access the response body from there. 
                But the test failed due to response.body being returned as an html instead of a JSON or array
                response.body would return "<!doctype html><html><head><meta name="viewport" c…>\x3Cscript src="/bundle.js">\x3C/script></body></html>"
                If it were returning a JSON or array, I would have easily grabbed the body object (isbn, title, etc) easily and verify
                As an alternative, Im calling the same GET request again and verifying the components. 
        */
        cy
            .request({
                method: 'GET',
                url: 'https://demoqa.com/BookStore/v1/Book?ISBN=9781593277574'
            })
            .then((response) => {
                expect(response.body.isbn).to.eq('9781593277574')
                expect(response.body.title).to.eq('Understanding ECMAScript 6')
                expect(response.body.subTitle).to.eq('The Definitive Guide for JavaScript Developers')
                expect(response.body.author).to.eq('Nicholas C. Zakas')
                expect(response.body.publish_date).to.eq('2016-09-03T00:00:00.000Z')
                expect(response.body.publisher).to.eq('No Starch Press')
                expect(response.body.pages).to.eq(352)
                expect(response.body.description).to.eq('ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that E')
                expect(response.body.website).to.eq('https://leanpub.com/understandinges6/read')
            })

        /*                response = JSON.stringify(response)
                        var jsonData = JSON.parse(response.body)
                        console.log(jsonData)
                        console.log(`The printed response body is: ${resBody}`)
                        expect(response.body[0]).to.eq('Nicholas C. Zakas')
                    })
        */
        /*
                            cy
                                .wait('@bookStore')
                                .its('response.body.title').should('eq', 'Understanding ECMAScript 6')
                            cy
                                .wait('@bookStore')
                                .its('response.body.subTitle').should('eq', 'The Definitive Guide for JavaScript Developers')
                            cy
                                .wait('@bookStore')
                                .its('response.body.publish_date').should('eq', '2016-09-03T00:00:00.000Z')
                            cy
                                .wait('@bookStore')
                                .its('response.body.publisher').should('eq', 'No Starch Press')
                            cy
                                .wait('@bookStore')
                                .its('response.body.pages').should('eq', 352)
                */
    })
})