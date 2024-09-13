Feature: Create Automation tests for the application "ClickUp"

Scenario: Validate CreateSpace functionality
    Given the API token and team information
    When space is created through API call
    Then verify through UI that space is created

Scenario: Validate CreateTask via web application
    Given user logs into ClickUp
    When user creates a task under previous space created
    Then task can be verified via API

Scenario: Validate Create Task via API
    Given user creates a task via API
    When user logs into application
    Then user verifies the task was created