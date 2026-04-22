import { Filter } from "lucide-react";

function ExamActions({
  search,
  setSearch,
  searchParams,
  setSearchParams,
  onFilterOpen,
  isSortEnabled = true,
}) {
  return (
    <div
      className={`flex items-center ${isSortEnabled ? "gap-2 sm:gap-4" : "gap-2"} `}
    >
      <input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        type='search'
        className={`bg-surface-2 p-md text-text text-md ${isSortEnabled ? "w-6/12" : "w-10/12 flex-1"} rounded-md font-medium sm:w-9/12`}
        placeholder='Search By Title'
      />

      {isSortEnabled && (
        <div className='w-4/12 sm:w-2/12'>
          <select
            className='bg-surface-2 p-md text-text w-full rounded-md text-base font-medium'
            onChange={(e) => {
              e.target.value === "none"
                ? searchParams.delete("sortBy")
                : searchParams.set("sortBy", e.target.value);
              setSearchParams(searchParams);
            }}
          >
            <option value='none'>Sort By</option>
            <optgroup label='Date'>
              <option value='start_date-asc'>Ascending</option>
              <option value='start_date-desc'>Descending</option>
            </optgroup>
            <optgroup label='Duration'>
              <option value='duration-asc'>Ascending</option>
              <option value='duration-desc'>Descending</option>
            </optgroup>
          </select>
        </div>
      )}

      <button
        onClick={onFilterOpen}
        type='button'
        title='Filter By'
        className='bg-surface-2 p-md text-text text-md flex w-fit cursor-pointer items-center gap-2 rounded-md font-medium'
      >
        <Filter />
      </button>
    </div>
  );
}

export default ExamActions;
