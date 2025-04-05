import React, { useEffect, useState } from "react";
import { deleteTodo, deleteTodoCategories, getTodos, postTodo, postTodoCategories, putTodo, putTodoCategories } from "../api/TodoApi";
import { SubmitTodoCategoryOperationType, SubmitTodoType, TodoCategoryType, TodoCellType } from "../types/TodoTypes";
import { TodoTemplate } from "../components/templates/TodoTemplate";
import { PageNameType } from "../types/AppTypes";

interface TodoPageProps {
    handlePageFlags: (selectedName: PageNameType) => void;
}

/* Todo ページを描画する Page コンポーネント */
export const TodoPage: React.FC<TodoPageProps> = ({
    handlePageFlags
}) => {

    const [printTodos, setPrintTodos] = useState<TodoCellType[]>([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                // バックエンド側から Todo 一覧を取得
                setPrintTodos(await getTodos(1));
            } catch (error) {
                throw error;
            }
        }
        fetchTodos();
        //setPrintTodos(todoCells);
    }, [])

    const handleTodoInsert = async (submitTodo: SubmitTodoType): Promise<TodoCellType> => {
        const createdTodo: TodoCellType = await postTodo(submitTodo);
        return createdTodo;
    };

    const handleTodoUpdate = async (submitTodo: SubmitTodoType): Promise<TodoCellType> => {
        const updatedTodo: TodoCellType = await putTodo(submitTodo);
        return updatedTodo;
    }

    const handleTodoDelete = async (submitTodo: SubmitTodoType): Promise<void> => {
        await deleteTodo(submitTodo.id);
    }

    const updateMappingCategory = async (
        submitTodoCategories: SubmitTodoCategoryOperationType
    ) => {
        const insertDatas = submitTodoCategories.insertTodoCategories;
        const updateDatas = submitTodoCategories.updateTodoCategories;
        const deleteDatas = submitTodoCategories.deleteTodoCategories;
        const deleteIds = deleteDatas
                            .map(deleteData => deleteData.id)
                            .filter(deleteId => deleteId !== null);

        if (insertDatas.length !== 0) await postTodoCategories(insertDatas);
        if (updateDatas.length !== 0) await putTodoCategories(updateDatas);
        if (deleteIds.length !== 0)   await deleteTodoCategories(deleteIds);
    }

    const addPrintTodo = (addPrintTodo: TodoCellType) => {
        const newPrintTodos: TodoCellType[] = printTodos;
        newPrintTodos.push(addPrintTodo);
        setPrintTodos(newPrintTodos);
    }

    const updatePrintTodo = (updatePrintTodo: TodoCellType) => {
        let newPrintTodos: TodoCellType[] = printTodos;
        newPrintTodos = newPrintTodos.map(originPrintTodo =>
            originPrintTodo.id === updatePrintTodo.id
            ?
            updatePrintTodo
            :
            originPrintTodo
        );
        setPrintTodos(newPrintTodos);
    }

    const deletePrintTodo = (id: number) => {
        let newPrintTodos: TodoCellType[] = printTodos;
        newPrintTodos = newPrintTodos.filter(originPrintTodo => originPrintTodo.id !== id);
        setPrintTodos(newPrintTodos);
    }

    return (
        <TodoTemplate
            todoCells={printTodos}
            handlePageFlags={handlePageFlags}
            handleTodoInsert={handleTodoInsert}
            handleTodoUpdate={handleTodoUpdate}
            handleTodoDelete={handleTodoDelete}
            addPrintTodo={addPrintTodo}
            updatePrintTodo={updatePrintTodo}
            deletePrintTodo={deletePrintTodo}
            updateMappingCategory={updateMappingCategory}
        />
    );

}

// Todoデータの作成関数
const createData = (
    id: number, title: string, isCheck: boolean, todoCategories: TodoCategoryType[]
): TodoCellType => ({
    id,
    title,
    isCheck,
    todoCategories,
});

// ダミーデータ
const todoCells: TodoCellType[] = [
    createData(
        1,
        "ヘルクレスのマット交換",
        true,
        [
            {
                id: 1,
                category: { id: 1, name: "カブトムシ" }
            },
            {
                id: 2,
                category: { id: 2, name: "昆虫マット" }
            },
            {
                id: 3,
                category: { id: 3, name: "昆虫ゼリー" }
            }
        ]
    ),
    createData(
        2,
        "ダクソでオフラインキャラのレベル上げる",
        false,
        [
            {
                id: 4,
                category: { id: 1, name: "ダークソウル" }
            },
            {
                id: 5,
                category: {id: 1, name: "周回系" }
            }
        ]
    ),
    createData(
        3,
        "秘境温泉を探す旅",
        false,
        [
            {
                id: 6,
                category: { id: 1, name: "温泉" }
            },
            {
                id: 7,
                category: {id: 2, name: "フロンティア系" }
            }
        ]
    ),
    createData(
        4,
        "アジを釣りに行く",
        false,
        [
            {
                id: 8,
                category: { id: 1, name: "食材調達" }
            },
            {
                id: 9,
                category: {id: 2, name: "フィッシング系" }
            }
    ]),
    createData(
        5,
        "イワシを釣りに行く",
        false,
        []
    ),
];
