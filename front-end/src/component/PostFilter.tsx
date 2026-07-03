interface FilterPropTypes {
  field: string;
}

export default function PostFilter({ field }: FilterPropTypes) {
  return (
    <div>
      <label htmlFor={`filter-${field}`} title={`Filter by ${field}`}>
        {field}
        :&nbsp;
      </label>
      <input type="text" name={`filter-${field}`} id={`filter-${field}`} />
    </div>
  );
}
