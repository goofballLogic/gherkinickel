import { IRegistry, IPrepareOptions, ISerializableFeature } from "./prepare-types";
export = prepare;
declare function prepare(registry: IRegistry, options?: IPrepareOptions): Promise<Array<ISerializableFeature>>;
