import React from "react";
import { TodoCellType } from "../../types/TodoTypes";
import { Checkbox, TableCell, TableRow } from "@mui/material";

interface TodoTableHeaderProps {
    todoCell: TodoCellType
}

/* Todo 一覧の内容を描画する Molecule コンポーネント */
export const TodoTableBody: React.FC<TodoTableHeaderProps> = ({ todoCell }) => {

    const handleChange = () => {
        console.log(todoCell);
    }

    return (
        <TableRow key={todoCell.title}>
            <TableCell padding="checkbox">
                <Checkbox
                    id={`${todoCell.id}`}
                    color="primary"
                    defaultChecked={todoCell.isCheck}
                    onChange={handleChange}
                    inputProps={{
                        'aria-label': 'select all desserts',
                    }}
                />
            </TableCell>
            <TableCell component="th" scope="todoCell" align="center">
                {todoCell.title}
            </TableCell>
            <TableCell align="center">
                {todoCell.todoCategories.map((todoCategory, index) => (
                    `${todoCategory.category.name}${index < todoCell.todoCategories.length - 1 ? ' / ' : ''}`
                ))}
            </TableCell>
        </TableRow>
    );
}
