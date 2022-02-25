import { QueryResult } from "@apollo/client";

export type QueryHook<T, R extends QueryResult> = (input: T) => R;
