import * as path from "path";
import gherkinRoot from "gherkin";
const gherkin = gherkinRoot.default;

import originalGlob from "glob";
import { CucumberExpression, ParameterTypeRegistry } from "cucumber-expressions";
import debugSomething from "debug";
const debug = debugSomething("ghl:prepare");

const glob = x =>
    new Promise((resolve, reject) =>
        originalGlob(x, (err, matches) =>
            err ? reject(err) : resolve(matches)));

Array.prototype.flatten = Array.prototype.flatten
    || function () {
        return this.reduce(
            (arr, xs) => xs
                ? Array.isArray(xs)
                    ? [...arr, ...xs]
                    : [...arr, xs]
                : arr,
            []
        );
    };

Array.prototype.mapFirst = Array.prototype.mapFirst
    || function (mapper) { for (var x of this) { const mapped = mapper(x); if (mapped) return mapped; } };

export default async function prepare(registry, options) {

    if (!registry) throw new Error("A registry exposing a property 'entries' is required");
    let featuresPath = resolveFeaturesPath(options);

    debug(`Resolved featuresPath: ${featuresPath}`);

    debug("Parsing features");
    const gherkinDocuments = await parseGherkin(featuresPath);

    debug("Converting registry entries to expressions");
    const entriesWithExpressions = registry.entries.map(decorateEntryWithExpression);

    const features = gherkinDocuments.map(x => x.gherkinDocument).filter(x => x);
    const stepIndex = Object.fromEntries(features
        .map(f => f.feature.children).flatten()
        .map(x => Object.values(x)).flatten()
        .map(x => x.steps).flatten()
        .map(x => [x.id, x])
    );
    const pickles = gherkinDocuments.map(x => x.pickle).filter(x => x);

    debug("Procesisng pickles");
    for (const pickle of pickles) {

        let keywordStage = "Given";
        if (pickle.uri) sanitizeUri(pickle);
        if (pickle.steps)
            for (const pickleStep of pickle.steps) {

                const documentStep = pickleStep.astNodeIds
                    .mapFirst(x => stepIndex[x]);
                const keyword = documentStep.keyword.trim();
                if (keyword !== "And") keywordStage = keyword;
                pickleStep.matchedTest = entriesWithExpressions
                    .mapFirst(test => matchResult(test, keywordStage, pickleStep.text));

            }

    }

    debug("Sanitizing URLs");
    features.filter(f => f.uri).forEach(sanitizeUri);

    const featuresWithPickles = features.map(f => ({
        ...f,
        pickles: pickles.filter(p => p.uri === f.uri)
    }));

    debug("Done");
    return featuresWithPickles;

};

function matchResult(test, keyword, text) {

    if (test.keyword !== keyword) return;
    const matched = test.expression.match(text);
    if (matched)
        return {
            keyword,
            args: matched.map(m => m.getValue()),
            text: test.text
        };

}

function sanitizeUri(x) {

    x.uri = x.uri.replace(process.env.PWD, "")

}

async function parseGherkin(featuresPath) {

    const found = await glob(`${featuresPath}/**/*.feature`);

    const gherkinOptions = {
        includeSource: false,
        includeGherkinDocument: true,
        includePickles: true,
    };
    if (found.length) {

        const parsed = gherkin.fromPaths(found, gherkinOptions);
        return await fromPathsAsJSON(parsed);

    } else {

        return [];

    }

}

function resolveFeaturesPath(options) {

    let featuresPath = (options && options.featuresPath) || "features";
    if (!path.isAbsolute(featuresPath))
        featuresPath = path.resolve(process.env.PWD, featuresPath);
    return featuresPath.replace(/\/$/, "");

}

function fromPathsAsJSON(stream) {

    const envelopes = [];
    if (stream.readableEnded) return envelopes;
    return new Promise((resolve, reject) => {

        stream.on("data", envelope => envelopes.push(envelope));
        stream.on("error", err => reject(err));
        stream.on("end", () => resolve(JSON.parse(JSON.stringify(envelopes))));

    });

}

function decorateEntryWithExpression(entry) {

    if (entry && entry.text)
        entry.expression = new CucumberExpression(entry.text, new ParameterTypeRegistry());
    return entry;

}