import { Element } from "@prisma/client"
import { DataTable } from "./data-table";
import { columns } from "./Colums";
import { FC } from "react";

export type TableDataProps = {
    elements: Element[];
}

const TableData: FC<TableDataProps> = ({ elements }) => {
    return (
        <div className="py-10">
            <DataTable columns={columns} data={elements} />
        </div>
    )
}

export default TableData;