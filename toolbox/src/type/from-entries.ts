import type { Key } from "./dictionary";

export type fromEntries<E extends [Key, any][]> = E extends [[infer key, infer value], ...infer re]
  ? (key extends Key ? { [k in key]: value } : {}) & (re extends [Key, any][] ? fromEntries<re> : {})
  : // no entries left
    {};
