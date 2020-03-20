Feature: Add/List

    Scenario: Receive a travel log
        Given A travel log is received
        When I ingest the travel log
        Then I should be able to list it
        