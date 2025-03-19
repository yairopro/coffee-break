import { fromEntries } from "./from-entries";
import { strictZip } from "./zip";

export type zipToObject<Ks extends string[], Vs extends any[]> = fromEntries<strictZip<Ks, Vs>>;
