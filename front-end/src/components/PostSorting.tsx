import { FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Select } from "@mui/material";

interface SortingPropTypes {
  fields: string[];
}

export default function PostSorting({ fields = [] }: SortingPropTypes) {
  return (
    <div>
      <FormLabel htmlFor="sort-by">Sort By:</FormLabel>
      <Select id="sort-by" name="sortBy">
        {fields.map(field => (
          <MenuItem key={field} value={field}>{field}</MenuItem>
        ))}
      </Select>
      {" / "}
      <FormLabel>Sort Order:</FormLabel>
      <RadioGroup name="sortOrder" id="sort-order">
        <FormControlLabel value="ascending" control={<Radio />} label="ascending" />
        <FormControlLabel value="descending" control={<Radio />} label="descending" />
      </RadioGroup>
    </div>
  );
}
