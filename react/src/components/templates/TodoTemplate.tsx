import React, { useState, useCallback } from "react";
import "./css/TodoTemplate.css";
import { SubmitTodoCategoryOperationType, SubmitTodoType, TodoCellType } from "../../types/TodoTypes";
import { MenuView } from "../organisms/MenuView";
import { PageNameType } from "../../types/AppTypes";
import { TodoView } from "../organisms/TodoView";
import { TodoFormViewAdd } from "../organisms/TodoFormViewAdd";
import { Pagination } from "@mui/material";
import { TodoFormViewUpdate } from "../organisms/TodoFormViewUpdate";
import { TodoFormViewDelete } from "../organisms/TodoFormViewDelete";
import { TodoFormNumberType } from "../../types/FormType";

interface TodoTemplateProps {
    todoCells: TodoCellType[],
    handlePageFlags: (selectedName: PageNameType) => void,
    handleTodoInsert: (submitTodo: SubmitTodoType) => Promise<TodoCellType>,
    handleTodoUpdate: (submitTodo: SubmitTodoType) => Promise<TodoCellType>,
    handleTodoDelete: (submitTodo: SubmitTodoType) => Promise<void>,
    addPrintTodo: (updatePrintTodo: TodoCellType) => void,
    updatePrintTodo: (updatePrintTodo: TodoCellType) => void,
    deletePrintTodo: (id: number) => void
    updateMappingCategory: (submitTodoCategories: SubmitTodoCategoryOperationType) => Promise<void>
}

/* Todo ページを描画する Template コンポーネント */
export const TodoTemplate: React.FC<TodoTemplateProps> = ({
    todoCells,
    handlePageFlags,
    handleTodoInsert,
    handleTodoUpdate,
    handleTodoDelete,
    addPrintTodo,
    updatePrintTodo,
    deletePrintTodo,
    updateMappingCategory
}) => {

    const [page, setPage] = useState<TodoFormNumberType>(1);

    const labelTodoTitle = "タイトル";
    const labelTodoCateory = "カテゴリー";

    const isTodoFormType = (value: number): value is TodoFormNumberType => {
        return Object.values(value).includes(value as TodoFormNumberType);
    };

    const handleFormModeChange = useCallback((
        event: React.ChangeEvent<unknown>, value: number
    ) => {
        if(isTodoFormType(value)) setPage(value);
        else throw new Error("１～３以外のフォーム番号が送信されました。\n管理者にお問い合わせください。");
    }, []);

    const getTodoCells = (): TodoCellType[] => {
        return todoCells;
    }

    const renderFormView = () => {
        switch (page) {
            case 1:
                return (
                    <TodoFormViewAdd
                        labelTodoTitle="タイトル"
                        labelTodoCategory="カテゴリー"
                        optionsCategory={[
                            { id: 1, name: "野草" },
                            { id: 2, name: "食材調達" },
                        ]}
                        handleTodoInsert={handleTodoInsert}
                        addPrintTodo={addPrintTodo}
                        updateMappingCategory={updateMappingCategory}
                    />
                );
            case 2:
                return (
                    <TodoFormViewUpdate
                        labelTodoTitle={labelTodoTitle}
                        labelTodoCategory={labelTodoCateory}
                        todoCells={getTodoCells()}
                        optionsCategory={[
                            { id: 1, name: "name1" },
                            { id: 2, name: "name2" },
                            { id: 3, name: "name3" },
                            { id: 4, name: "name4" },
                            { id: 5, name: "name5" }
                        ]}
                        handleTodoUpdate={handleTodoUpdate}
                        updatePrintTodo={updatePrintTodo}
                        updateMappingCategory={updateMappingCategory}
                    />
                );
            case 3:
                return (
                    <TodoFormViewDelete
                        labelTodoTitle={labelTodoTitle}
                        optionsTodoTitle={
                            todoCells.map( todoCells => ({
                                id: todoCells.id, name: todoCells.title
                            }))
                        }
                        handleTodoDelete={handleTodoDelete}
                        deletePrintTodo={deletePrintTodo}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="todo-template-container">
            <MenuView handlePageFlags={handlePageFlags} />
            <TodoView todoCells={todoCells} />
            {renderFormView()}
            <Pagination count={3} color="primary" onChange={handleFormModeChange} />
        </div>
    );
};
