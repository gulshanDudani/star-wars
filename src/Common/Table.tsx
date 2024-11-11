import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  PaginationState,
} from '@tanstack/react-table';
import React from 'react';
import './Table.css'; 

interface TableProps {
  columns:any,
  pagination:PaginationState,
  setPagination:React.Dispatch<React.SetStateAction<PaginationState>>,
  data:any}

function Table({ columns, pagination, setPagination, data }:TableProps) {
  const table = useReactTable({
    data: data?.rows ?? [],
    columns,
    rowCount: data?.rowCount, // Row count for pagination
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true, // We are doing manual "server-side" pagination
    debugTable: false,
  });

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="table-row">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="table-cell">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination-container">
        <button
          className="pagination-btn"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="pagination-btn prev-page"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="pagination-btn next-page"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="pagination-btn"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>

        {/* Page Info */}
        <span className="pagination-info">
          Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of{' '}
          <strong>{table.getPageCount()}</strong>
        </span>

        {/* Go to page */}
        <span className="go-to-page">
          | Go to page:
          <input
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="page-input"
          />
        </span>
      </div>

      {/* Row Info */}
      <div className="row-info">
        Showing {table.getRowModel().rows.length} of {data?.rowCount} Rows
      </div>
    </div>
  );
}

export default Table;
