// Importing the pre-requisites
import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';

const API_TOKEN = 'pk_108011877_L9VNETT3ADPCVOBDSD4101Z5CHUAPF69';
const TEAM_ID = '9011243745';
const SPACE_NAME = 'Lodgify Challenge';
const EMAIL = "bbaranzabal@gmail.com";
const PWD = "Lodgify_101"
const LogInURL= "https://app.clickup.com/login";

const URL = `https://api.clickup.com/api/v2/team/${TEAM_ID}/space`;

Given('the API token and team information', ()=>{
  cy.request({
    method: 'GET',
    url: 'https://api.clickup.com/api/v2/team',
    headers: {
      Authorization: API_TOKEN,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
})

When('space is created through API call', ()=>{
  cy.request({
    method: 'POST',
    url: URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: API_TOKEN,
    },
    body: JSON.stringify({
      name: SPACE_NAME,
      multiple_assignees: true,
      features: {
        due_dates: {
          enabled: true,
          start_date: false,
          remap_due_dates: true,
          remap_closed_due_date: false
        },
        time_tracking: {enabled: false},
        tags: {enabled: true},
        time_estimates: {enabled: true},
        checklists: {enabled: true},
        custom_fields: {enabled: true},
        remap_dependencies: {enabled: true},
        dependency_warning: {enabled: true},
        portfolios: {enabled: true}
      }
    })
  }).then((response) => {
    cy.wrap(response).as('apiResponse');
  });
})

Then('verify through UI that space is created', ()=>{
  // Go into Click Up login page
  cy.visit(LogInURL)
  cy.url().should('eq', LogInURL)
  cy.get('[class="login-page-new__main-form-title ng-star-inserted"]').should('include.text', 'Welcome back!')

  // Input the necessary info
  cy.get('[id="login-email-input"]').type(EMAIL)
  cy.get('[id="login-password-input"]').type(PWD)
  cy.get('button[type="submit"]').click()

  // Assert the space has been created
  cy.get('[data-test="project-row__name__Lodgify Challenge"]').should('have.text', SPACE_NAME)

})