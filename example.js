import { entries } from "./src/registry.js";
import { prepare } from "./index.js";

import "./features/step_definitions/given.js";
import "./features/step_definitions/when.js";
import "./features/step_definitions/then.js";

prepare({ entries: entries() }).then(
    //x => console.log(JSON.stringify(x, null, 3)),
    console.log.bind(console),
    console.error.bind(console)
);