@error
Feature: View Error
  As a library cataloger
  I want to view a usable error message when something fails
  so that I can tell support what is wrong

  Background:
    Given I browse "http://localhost:8000/"
  
  Scenario: Unsuccessfully View Bib - Invalid Token
    When I am on "/bib/401"
    Then I should see "System Error" in the "div#content > h1" element
    And I should see "Status - 401" in the "div#error_content > p#status" element
    And I should see "Message - AccessToken {tk_12345} is invalid" in the "div#error_content > p#message" element
    And I should see "Authorization header: Bearer tk_12345" in the "div#error_content > p#detail" element

  Scenario: Unsuccessfully View Bib - Token Wrong Service
    When I am on "/bib/403"
    Then I should see "System Error" in the "div#content > h1" element
    And I should see "Status - 403" in the "div#error_content > p#status" element
    And I should see "Message - AccessToken {tk_12345} does not have access to service {WorldCatMetadataAPI}" in the "div#error_content > p#message" element
    And I should see "Authorization header: Bearer tk_12345" in the "div#error_content > p#detail" element  
    
  Scenario: Unsuccessfully View Bib - Unknown OCLC Number
    When I am on "/bib/404"
    Then I should see "System Error" in the "div#content > h1" element
    And I should see "Status - 404" in the "div#error_content > p#status" element
    And I should see "Unable to locate resource: 404." in the "div#error_content > p#message" element      