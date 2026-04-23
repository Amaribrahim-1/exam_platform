import Empty from "./Empty";

function GenericTable({ columns, data }) {
  return (
    <div>
      {/* ===== Desktop: Table ===== */}
      <div className='border-border bg-surface hidden rounded-md border px-4 py-3 lg:block'>
        <table className='w-full border-collapse'>
          {/* Header */}
          <thead className='bg-surface'>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className='border-border text-primary border-b px-4 py-3 text-left text-[14px] font-bold tracking-wider uppercase'
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
                className='border-border hover:bg-surface border-b transition-colors last:border-0'
              >
                {columns.map((col) => (
                  <td key={col.key} className='text-text px-4 py-3 text-[13px]'>
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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
                className='border-border flex items-center justify-between border-b py-2 text-sm last:border-0'
              >
                {/* Label على الشمال */}
                <span className='text-muted min-w-25'>{col.label}</span>

                {/* Value على اليمين */}
                <span className='text-text text-right'>
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
