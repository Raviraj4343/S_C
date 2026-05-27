import { FiTrash2 } from "react-icons/fi";

const DataTable = ({ columns, rows, loading, onDelete, emptyText }) => {
  return (
    <div className="overflow-x-auto rounded-2xl border border-edge bg-card">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-100/70 text-left text-slate-600 dark:bg-slate-800/60 dark:text-slate-300">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-4 py-3 font-semibold">{column.label}</th>
            ))}
            <th className="px-4 py-3 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {!loading && rows.length === 0 ? (
            <tr><td className="px-4 py-5 text-slate-500" colSpan={columns.length + 1}>{emptyText}</td></tr>
          ) : null}
          {rows.map((row) => (
            <tr key={row._id} className="border-t border-edge/70">
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-3 text-foreground">{column.render ? column.render(row[column.key], row) : row[column.key]}</td>
              ))}
              <td className="px-4 py-3">
                <button onClick={() => onDelete(row._id)} className="inline-flex items-center gap-1 rounded-lg border border-rose-300 px-3 py-1 text-rose-600 transition hover:bg-rose-50 dark:border-rose-700 dark:hover:bg-rose-950/40">
                  <FiTrash2 /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
