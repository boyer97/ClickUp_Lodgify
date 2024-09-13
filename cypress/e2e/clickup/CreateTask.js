// Importing the pre-requisites
import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';

const API_TOKEN = 'pk_108011877_L9VNETT3ADPCVOBDSD4101Z5CHUAPF69'
const SPACE_NAME = 'Lodgify Challenge'
const EMAIL = 'bbaranzabal@gmail.com'
const PWD = 'Lodgify_101'
const LogInURL= 'https://app.clickup.com/login'
const TASK_NAME = 'Lodgify Task'

Given('user logs into ClickUp', ()=>{
    // Go into the log in page
    cy.visit(LogInURL)
    cy.url().should('eq', LogInURL)
    cy.get('[class="login-page-new__main-form-title ng-star-inserted"]').should('include.text', 'Welcome back!')
  
    // Input the necessary info
    cy.get('[id="login-email-input"]').type(EMAIL)
    cy.get('[id="login-password-input"]').type(PWD)
    cy.get('button[type="submit"]').click()
})

When('user creates a task under previous space created', ()=>{
    // Create Folder
    cy.get('[data-test="project-row__name__Lodgify Challenge"]').should('have.text', SPACE_NAME)
    cy.get('[xmlns="http://www.w3.org/2000/svg"]').click()
    cy.get('[data-test="dropdown-list-item__Folder"]').click()
    cy.get('[class="cu-create-category__title ng-star-inserted"]').should('include.text', 'Create Folder')
    cy.get('[id="cu-create-category__name-input"]').type('Scenario 2')
    cy.get('button[class="ng-star-inserted"]').click()
    
    // Create the task
    cy.get('[placeholder="Task Name"]').type(TASK_NAME)
})

Then('task can be verified via API', async function(){
    cy.url().then((url) => {
        const ListID = url.split('/').pop();
        expect(Number(ListID)).to.be.a('number');
        cy.wrap(ListID).as('ListID');
    });
    cy.request({
        method: 'GET',
        url: 'https://api.clickup.com/api/v2/list/${ListID}/task',
        headers: {
            Authorization: API_TOKEN
        }
        }
    );then((response) => {
        expect(response.status).to.eq(200);
    });
})