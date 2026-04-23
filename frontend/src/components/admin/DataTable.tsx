import { Pencil, Trash2 } from "lucide-react";

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  onEdit,
  onDelete,
}: DataTableProps<T>) {
  return (
    <div className="admin-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="text-left px-4 py-3 font-heading font-medium text-muted-foreground text-xs uppercase tracking-wider"
                >
                  {col.label}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="text-right px-4 py-3 font-heading font-medium text-muted-foreground text-xs uppercase tracking-wider w-16">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b border-border last:border-0 admin-table-row-hover">
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-3 text-foreground">
                    {col.render ? col.render(item) : String((item as any)[col.key] ?? "")}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-4 py-3 text-right space-x-2">
                    {onEdit && (
                      <button
                        type="button"
                        onClick={() => onEdit(item)}
                        className="inline-flex items-center px-2 py-1 text-xs rounded-md border border-border text-foreground hover:bg-muted transition-colors"
                      >
                        <Pencil className="mr-1 h-3 w-3" /> Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        type="button"
                        onClick={() => onDelete(item)}
                        className="inline-flex items-center px-2 py-1 text-xs rounded-md border border-destructive/40 text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <Trash2 className="mr-1 h-3 w-3" /> Delete
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.length === 0 && (
        <div className="py-12 text-center text-muted-foreground text-sm">No data found.</div>
      )}
    </div>
  );
}
