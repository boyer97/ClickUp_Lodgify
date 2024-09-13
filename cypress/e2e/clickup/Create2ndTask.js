// Importing the pre-requisites
import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';

const API_TOKEN = 'pk_108011877_L9VNETT3ADPCVOBDSD4101Z5CHUAPF69'
const SPACE_NAME = 'Lodgify Challenge'
const EMAIL = 'bbaranzabal@gmail.com'
const PWD = 'Lodgify_101'
const LogInURL= 'https://app.clickup.com/login'
const TASK_NAME = 'Lodgify Task 2'

Given('user creates the task via API', ()=>{
    // Go into the log in page
    cy.visit(LogInURL)
    cy.url().should('eq', LogInURL)
    cy.get('[class="login-page-new__main-form-title ng-star-inserted"]').should('include.text', 'Welcome back!')
  
    // Input the necessary info
    cy.get('[id="login-email-input"]').type(EMAIL)
    cy.get('[id="login-password-input"]').type(PWD)
    cy.get('button[type="submit"]').click()

    cy.get('[data-test="project-row__name__Lodgify Challenge"]').should('have.text', SPACE_NAME)
    cy.get('[data-test="subcategory-row__Lodgify Challenge"]').click()
    
    // Get the List ID
    cy.url().then((url) , async function() {
        const ListID = url.split('/').pop();
        expect(Number(ListID)).to.be.a('number');
        cy.wrap(ListID).as('ListID');
        const query = new URLSearchParams({
            custom_task_ids: 'false'
          }).toString();
          
          const listId = ListID;
          const resp = await fetch(
            `https://api.clickup.com/api/v2/list/${listId}/task?${query}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: API_TOKEN
              },
              body: JSON.stringify({
                name: TASK_NAME,
                description: 'New Task Description',
                markdown_description: 'New Task Description',
                assignees: [183],
                archived: false,
                group_assignees: [
                  'dd01f92f-48ca-446d-88a1-0beb0e8f5f14'
                ],
                tags: ['tag name 1'],
                status: 'Open',
                priority: 3,
                due_date: 1508369194377,
                due_date_time: false,
                time_estimate: 8640000,
                start_date: 1567780450202,
                start_date_time: false,
                points: 3,
                notify_all: true,
                parent: null,
                links_to: null,
                check_required_custom_fields: true,
                custom_fields: [
                  {
                    id: '0a52c486-5f05-403b-b4fd-c512ff05131c',
                    value: 'This is a string of text added to a Custom Field.'
                  }
                ]
              })
            }
          );
          
          const data = await resp.json();
          console.log(data);
    });

    
})

When('user logs into application', ()=>{
    // Log into the application
    cy.visit(LogInURL)
    cy.url().should('eq', LogInURL)
    cy.get('[class="login-page-new__main-form-title ng-star-inserted"]').should('include.text', 'Welcome back!')
    
    // Input the necessary info
    cy.get('[id="login-email-input"]').type(EMAIL)
    cy.get('[id="login-password-input"]').type(PWD)
    cy.get('button[type="submit"]').click()
})

Then('user verifies the task was created', async function(){
    // Verify the task was created
    cy.get('[data-test="project-row__name__Lodgify Challenge"]').should('have.text', SPACE_NAME)
    cy.get('[data-test="subcategory-row__Lodgify Challenge"]').click()
    cy.get('[data-test="task-row-main__Lodgify Task 2"]').should('contain.text', TASK_NAME)
})