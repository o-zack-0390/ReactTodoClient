import React from "react";
import { TableCell, TableHead, TableRow } from "@mui/material";

/* Todo 一覧のヘッダーを描画する Molecule コンポーネント */
export const TodoTableHeader = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell key="check" padding="checkbox" />
                <TableCell key="check1" align="center">Title</TableCell>
                <TableCell key="check2" align="center">Categories</TableCell>
            </TableRow>
        </TableHead>
    );
}
