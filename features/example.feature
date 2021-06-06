Feature: Just an example
    As a developer of this library
    I want to have an example feature
    So that I can have something to develop against

    Background: the background bits
        Given something is like that

    Scenario: A first scenario
        Given something
        When something else
        Then something

    Scenario: A second scenario
        Given something "fishy"
        When I do something else
            | A    | B    |
            | Like | this |
        Then something

    Scenario Outline: A more complex situation
        Given something <disposition>
        Then something <expected>

        Examples:
            | disposition | expected |
            | crumbly     | crumbs   |
            | smelly      | smells   |
