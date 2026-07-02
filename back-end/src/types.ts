export type SortOrder = "ascending" | "descending";
export type Nullable<T> = T | null | never;

export interface ListOptions {
  sortBy?: string;
  sortOrder?: SortOrder;
}
