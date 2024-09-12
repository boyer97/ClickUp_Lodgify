Feature: Create Automation tests for the application "ClickUp"

Scenario: Validate CreateSpace functionality
    Given the API token and team information
    When space is created through API call
    Then verify through UI that space is created
    