import { prepare } from "./index";
import { IPrepareOptions, IRegistry } from "./src/prepare-types";
import { entries } from "./src/registry";

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
