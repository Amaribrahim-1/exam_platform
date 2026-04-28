import Empty from "./Empty";

function GenericTable({ columns, data }) {
  return (
    <div>
      {/* ===== Desktop: Table ===== */}
      <div className='border-border bg-surface hidden rounded-md border lg:block'>
        <div className='w-full overflow-x-auto'>
          <table className='w-full border-collapse table-auto'>
            {/* Header */}
            <thead className='bg-surface'>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className='border-border text-primary whitespace-nowrap border-b px-4 py-3 text-left text-[13px] font-bold tracking-wider uppercase'
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Rows */}
            <tbody>
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className='border-border hover:bg-surface-2 border-b transition-colors last:border-0'
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className='text-text px-4 py-3 text-[13px] align-middle'
                    >
                      {col.render ? col.render(row[col.key], row) : (
                        <span
                          className='block max-w-[200px] truncate'
                          title={typeof row[col.key] === 'string' ? row[col.key] : undefined}
                        >
                          {row[col.key]}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== Mobile: Cards ===== */}
      <div className='flex flex-col gap-3 lg:hidden'>
        {data.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className='border-border bg-surface rounded-md border p-4'
          >
            {columns.map((col) => (
              <div
                key={col.key}
                className='border-border flex items-start justify-between border-b py-2 text-sm last:border-0'
              >
                {/* Label على الشمال */}
                <span className='text-text-muted min-w-[6rem] shrink-0 font-medium'>{col.label}</span>

                {/* Value على اليمين */}
                <span className='text-text ml-2 break-words text-right'>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GenericTable;
