# ClickUp_Lodgify
Cypress Testing scenarios for technical interview 

Bruno Boyer Aranzábal

BELOW CAN BE FOUND THE DOCUMENTATION FOR SET WORKFLOW:

- A user account was created in order to perform the testing, username is with my own email and password is a dummy one used for this workflow.
- A BDD style was followed in order to perform the tests, therefore the user needs to install a couple of things.

Environment Set up:
1. User needs to make sure to have an IDE such as VS Code
2. User needs to create a folder on their local when the tests will be ran/created
3. User needs to install nodejs from https://nodejs.org/en/download/package-manager and run "npm i"
4. User needs to install "cypress with "npm install cypress"
5. User needs to install "cypress-cucumber-preprocessor" for BDD to be functional
6. Following a same path structure as the one in this repo is recommended, specially for the cypress folder.
7. User needs to update cypress.config.js and jsconfig.json as the ones shared in this repo

BDD basics:
1. Behavior Driven Development needs two basic files in order to function, the feature file and the steps file. The first has the goal to set up a set of rules for the code to work following these actions, it is written in Gherkin language. The latter file will include all the code needed to fulfill these actions, it can be written in almost any language but for this case JavaScript was used.
2. There was only one feature file created under the name "clickup.feature" since this challenge can be seen as 1 Feature with 3 Scenarios
3. The steps files or step_definitions files can be found under the clickup folder, it is crutial for the feature file and the folder containing the steps to have the same name.

Things to stand out:
- Inside each step definition file there is some comments explaining what the code below does.
- This is a very basic framework, with more time there are more things that can be fixed and implemented as report creation.


If you have any question regarding this please use the email inside the code to let me know.

Hope you like the design!