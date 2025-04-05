import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { TodoCellType } from '../../types/TodoTypes';
import { TodoTableHeader } from '../molecules/TodoTableHeader';
import { TodoTableBody } from '../molecules/TodoTableBody';

interface TodoViewProps {
    todoCells: TodoCellType[]
}

/* Todo 一覧を描画する Organism コンポーネント */
export const TodoView: React.FC<TodoViewProps> = ({ todoCells }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 200 }} aria-label="simple table">
                <TodoTableHeader />
                <TableBody>
                    {todoCells.map((todoCell) => (
                        <TodoTableBody key={todoCell.id} todoCell={todoCell} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
