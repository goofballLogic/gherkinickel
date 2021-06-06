const registry = require("./src/registry");
const prepare = require("./src/prepare");
prepare(registry).then(
    console.log.bind(console),
    console.error.bind(console)
);