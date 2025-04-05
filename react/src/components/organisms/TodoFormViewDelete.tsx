import React, { FormEvent, useState } from "react";
import './css/TodoFormView.css';
import { FormSelectType } from "../../types/FormType";
import { FormSelect } from "../molecules/FormSelect";
import { Button } from "@mui/material";
import { AddTask } from "@mui/icons-material";
import { SubmitTodoType } from "../../types/TodoTypes";

interface TodoFormViewDeleteProps {
    labelTodoTitle: string,
    optionsTodoTitle: FormSelectType[],
    handleTodoDelete: (submitTodo: SubmitTodoType) => Promise<void>,
    deletePrintTodo: (id: number) => void
}

/* Todo の削除フォームを描画する Organism コンポーネント */
export const TodoFormViewDelete: React.FC<TodoFormViewDeleteProps> = ({
    labelTodoTitle,
    optionsTodoTitle,
    handleTodoDelete,
    deletePrintTodo
}) => {

    // フォームの状態を管理するための state
    const [submitTodo, setSubmitTodo] = useState<FormSelectType>({id: -1, name: ''});

    // タイトルの変更を処理するハンドラー
    const handleTitleChange = (value: FormSelectType) => {
        setSubmitTodo(value);
    };

    // フォーム送信時の処理
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        // バックエンド側で Todo エンティティを削除
        await handleTodoDelete({ id: submitTodo.id, userId: 1, title: '', isCheck: false });

        // 該当の Todo を削除
        deletePrintTodo(submitTodo.id);
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form-view-container">
            <FormSelect
                label={labelTodoTitle}
                options={optionsTodoTitle}
                handleSelectChange={handleTitleChange}
            />
            <Button
                type="submit"
                variant="contained"
                endIcon={<AddTask />}>
                Delete Todo
            </Button>
        </form>
    );
}
