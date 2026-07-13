import { FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Select } from "@mui/material";
import type { EventValueHandler } from "../types.ts";

interface SortingPropTypes {
  fields: string[];
  labels: string[];
  sortField: string;
  sortOrder: string;
  onFieldChanged: EventValueHandler<string>;
  onOrderChanged: EventValueHandler<string>;
}

export default function PostSorting({ fields = [], labels = [], sortField, sortOrder, onFieldChanged, onOrderChanged }: SortingPropTypes) {
  return (
    <div>
      <FormLabel htmlFor="sort-by">Sort By:</FormLabel>
      <Select id="sort-by" name="sortBy" value={sortField} onChange={e => onFieldChanged(e.target.value)}>
        {labels.map((label, index) => (
          <MenuItem key={index} value={fields[index]}>{label}</MenuItem>
        ))}
      </Select>
      {" / "}
      <FormLabel>Sort Order:</FormLabel>
      <RadioGroup name="sortOrder" id="sort-order" value={sortOrder} onChange={e => onOrderChanged(e.target.value)}>
        <FormControlLabel value="ascending" control={<Radio />} label="Ascending" />
        <FormControlLabel value="descending" control={<Radio />} label="Descending" />
      </RadioGroup>
    </div>
  );
}
