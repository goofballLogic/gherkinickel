import { Given, When, Then } from "../../src/registry.js";

Given("something", () => {

    console.log("Given something");

});

Given("something {word}", () => {

    console.log("Given something {word}");

});

When("something else", () => {

    console.log("When something else");

});

Then("something", () => {

    console.log("Then something");

});