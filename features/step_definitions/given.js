import { Given } from "../../src/registry.js";

Given("something", () => {

    console.log("Given something");

});

Given("something {word}", () => {

    console.log("Given something {word}");

});