export interface IRegistryEntry {
    keyword: string,
    text: string,
    strategy: () => void
}

export interface IRegistry {
    entries: Array<IRegistryEntry>
}

export interface IPrepareOptions {
    featuresPath?: string
}

export interface Location {
    line: number;
    column: number;
}

export interface Step {
    location: Location;
    keyword: string;
    text: string;
    id: string;
    dataTable?: DataTable,
}

export interface Background {
    location: Location;
    keyword: string;
    name: string;
    steps: Step[];
}

export interface Cell {
    location: Location;
    value: string;
}

export interface Row {
    location: Location;
    cells: Cell[];
    id: string;
}

export interface DataTable {
    location: Location;
    rows: Row[];
}

export interface TableHeader {
    location: Location;
    cells: Cell[];
    id: string;
}

export interface TableBody {
    location: Location;
    cells: Cell[];
    id: string;
}

export interface Example {
    location: Location;
    keyword: string;
    name: string;
    tableHeader: TableHeader;
    tableBody: TableBody[];
}

export interface Scenario {
    location: Location;
    keyword: string;
    name: string;
    steps: Step[];
    id: string;
    examples: Example[];
}

export interface Child {
    background: Background;
    scenario: Scenario;
}

export interface Feature {
    location: Location;
    language: string;
    keyword: string;
    name: string;
    description: string;
    children: Child[];
}

export interface MatchedTest {
    keyword: string;
    args: string[];
    text: string;
}

export interface Argument {
    dataTable: DataTable;
}

export interface PickleStep {
    text: string;
    id: string;
    astNodeIds: string[];
    matchedTest: MatchedTest;
    argument: Argument;
}

export interface Pickle {
    id: string;
    uri: string;
    name: string;
    language: string;
    steps: PickleStep[];
    astNodeIds: string[];
}

export interface ISerializableFeature {
    uri: string;
    feature: Feature;
    pickles: Pickle[];
}