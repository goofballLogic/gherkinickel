import { entries } from "./src/registry.js";
import { prepare } from "./index.js";

console.log(prepare);

prepare({ entries: entries() }).then(
    x => console.log(JSON.stringify(x, null, 3)),
    console.error.bind(console)
);