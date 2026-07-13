import { FormLabel, TextField } from "@mui/material";
import type { EventValueHandler } from "../types.ts";

interface FilterPropTypes {
  label: string;
  value: string;
  onChange: EventValueHandler<string>;
}

export default function PostFilter({ label, value, onChange }: FilterPropTypes) {
  return (
    <div>
      <FormLabel htmlFor="filter-by">Filter By:</FormLabel>
      <TextField id="filter-by" name="filterBy" label={label} value={value} onChange={e => onChange(e.target.value)} />
    </div>
  );
}
