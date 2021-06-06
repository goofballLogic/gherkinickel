import { entries } from "./src/registry.js";
import prepare from "./src/prepare.js";

console.log(prepare);

prepare({ entries: entries() }).then(
    console.log.bind(console),
    console.error.bind(console)
);