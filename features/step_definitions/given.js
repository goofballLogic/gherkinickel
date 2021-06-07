import { Given } from "../../src/registry.js";

console.log("Loaded Given");

Given("something", () => {

    console.log("Given something");

});

Given("something {word}", () => {

    console.log("Given something {word}");

});