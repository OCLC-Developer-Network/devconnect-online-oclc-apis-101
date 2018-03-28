Feature: Submit Search Form
  As a library cataloger
  I want submit a search for an OCLC Number
  so I can view the associated MARC record

  Background:
    Given I browse "http://localhost:8000/"
  
  Scenario: Successfully Submit Search
    Given I am on homepage
    And I fill in "input[name='oclcnumber']" with:
    """
    70775700
    """
    When I submit "form" form
    Then I should see "Dogs and cats" in the "div#content > h1" element
    And I should see "Raw MARC" in the "div#record > h4" element
    And the "div#raw_record pre" element should exist 