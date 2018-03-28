Feature: View Search Form
  As a library cataloger
  I want to view the search form
  so that search for an OCLC Number
  
  Background:
    Given I browse "http://localhost:8000/"
  
  Scenario: Successfully View Search form
    Given I am on homepage
    Then I should see "Search by OCLC Number" in the "h1" element
    And the "form" element should exist
    And the "input[name=oclcnumber]" element should exist
    And the "input[name=search]" element should exist
