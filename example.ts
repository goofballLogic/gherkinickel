import { prepare } from "./index";
import { IPrepareOptions, IRegistry } from "./src/prepare-types";
import { entries } from "./src/registry";

import "./features/step_definitions/given.js";
import "./features/step_definitions/when.js";
import "./features/step_definitions/then.js";

(async function () {

    const registry: IRegistry = {
        entries: entries()
    };
    const options: IPrepareOptions = {
        featuresPath: "/features"
    };

    const output = await prepare(registry, options);
    output.forEach(x => {

        console.log(x.uri);
        console.log(x.feature);
        console.log(x.pickles);

    })

})();
