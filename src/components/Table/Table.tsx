import { MdEdit, MdDelete } from "react-icons/md";
import "./Table.css";

export interface PaginationData {
  total: number;
  nextSkip: number;
}

export interface TableHeader {
  name: string;
  text: string;
}

interface Props {
  headers: TableHeader[];
  includeActions: boolean;
  data: Record<string, string | number>[];
  onDelete?: (rowData: any) => void;
  onEdit?: (rowData: any) => void;
}

function PaginationTable({
  data,
  onEdit,
  headers,
  onDelete,
  includeActions,
}: Props) {
  return (
    <div className="w-full overflow-y-auto table-container">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                className="border-2 border-black sticky top-0 z-10 bg-orange-400"
                key={`header-${header.name}`}
              >
                {header.text}
              </th>
            ))}
            {includeActions ? (
              <th
                className="border-2 border-black sticky top-0 z-10 bg-orange-400"
                key="header-actions"
              >
                Acciones
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={`row-${i + 1}`}>
              {headers.map((header) => (
                <td
                  className="border-2 border-black p-3"
                  key={`data-cell-${i + 1}-${header.name}`}
                >
                  {row[header.name] || ""}
                </td>
              ))}
              {includeActions ? (
                <td
                  className="border-b-2 border-r-2 border-black p-3 flex justify-evenly"
                  key={`data-cell-${i + 1}-actions`}
                >
                  <button
                    className="bg-orange-400"
                    title="Editar"
                    onClick={() => onEdit && onEdit(row)}
                  >
                    <MdEdit />
                  </button>
                  <button
                    className="bg-orange-400"
                    title="Eliminar"
                    onClick={() => onDelete && onDelete(row)}
                  >
                    <MdDelete />
                  </button>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaginationTable;
