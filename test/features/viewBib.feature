@bib
Feature: View Bib Record
  As a library cataloger
  I want to view a bib record
  so that I can examine its properties
  
  Background:
    Given I browse "http://localhost:8000/"  
  
  Scenario: Successfully View Bib
    When I am on "/bib/70775700"
    Then I should see "Dogs and cats" in the "div#content > h1" element
    And I should see "Raw MARC" in the "div#record > h4" element 
    And the "div#raw_record pre" element should exist