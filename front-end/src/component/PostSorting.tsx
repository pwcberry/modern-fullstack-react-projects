interface SortingPropTypes {
  fields: string[];
}

export default function PostSorting({ fields = [] }: SortingPropTypes) {
  return (
    <div>
      <label htmlFor="sortBy" id="sortBy">Sort By:</label>
      <select name="sortBy" id="sortBy">
        {fields.map(field => (
          <option key={field} value={field}>{field}</option>
        ))}
      </select>
      {" / "}
      <label>Sort Order:</label>
      <span>
        <label>
          <input type="radio" name="sortOrder" value="ascending" />
          &nbsp;ascending
        </label>
        <label>
          <input type="radio" name="sortOrder" value="descending" />
          &nbsp;descending
        </label>
      </span>
    </div>
  );
}
