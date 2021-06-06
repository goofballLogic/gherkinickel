import { prepare } from "./index";
import { IPrepareOptions } from "./src/prepare-types";
import registry from "./src/registry";

(async function () {

    const o: IPrepareOptions = {
        featuresPath: "/features"
    };

    const output = await prepare(registry, o);
    output.forEach(x => {

        console.log(x.uri);
        console.log(x.feature);
        console.log(x.pickles);

    })

})();
