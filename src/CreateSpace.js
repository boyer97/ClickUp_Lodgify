// Importing the pre-requisites
const {Given, When, Then } = require('cucumber/cucumber');
const fetch = require('node-fetch');

Given('the API token and team information', async function(){
    var API_TOKEN = 'pk_108011877_L9VNETT3ADPCVOBDSD4101Z5CHUAPF69';
    var TEAM_ID = '9011243745';
    var SPACE_NAME = 'Lodgify_Scenario1';
    
    const url = `https://api.clickup.com/api/v2/team/${TEAM_ID}/space`;
})

When('space is created through API call', async function(){
    const headers = {
        'Authorization': API_TOKEN,
        'Content-Type': 'application/json'
      };
      
      const body = JSON.stringify({
        name: SPACE_NAME,
        multiple_assignees: true,
        features: {
          due_dates: {
            enabled: true,
            start_date: false,
            remap_due_dates: true,
            remap_closed_due_date: false
          },
          time_tracking: {
            enabled: true
          },
          tags: {
            enabled: true
          },
          time_estimates: {
            enabled: true
          },
          checklists: {
            enabled: true
          },
          custom_fields: {
            enabled: true
          },
          remap_dependencies: {
            enabled: true
          },
          dependency_warning: {
            enabled: true
          }
        }
      });
      
      fetch(url, {
        method: 'POST',
        headers: headers,
        body: body
      })
      .then(response => response.json())
      .then(data => console.log('Success:', data))
      .catch(error => console.error('Error:', error));
})

Then()
