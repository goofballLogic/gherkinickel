import { entries } from "./src/registry.js";
import { prepare } from "./index.js";

console.log(prepare);

prepare({ entries: entries() }).then(
    console.log.bind(console),
    console.error.bind(console)
);