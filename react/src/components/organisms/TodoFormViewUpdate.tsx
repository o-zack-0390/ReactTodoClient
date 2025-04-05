import React, { FormEvent, useEffect, useState } from "react";
import './css/TodoFormView.css';
import { FormSelectType } from "../../types/FormType";
import { FormSelect } from "../molecules/FormSelect";
import { FormCheckBox } from "../molecules/FormCheckBox";
import { Button } from "@mui/material";
import { AddTask} from "@mui/icons-material";
import {
    SubmitTodoCategoryOperationType,
    SubmitTodoType,
    TodoCellType
} from "../../types/TodoTypes";
import { convertSubmitTodoCategories } from "../../function/TodoFunction";

interface TodoFormViewUpdateProps {
    labelTodoTitle: string,
    labelTodoCategory: string,
    todoCells: TodoCellType[],
    optionsCategory: FormSelectType[],
    handleTodoUpdate: (submitTodo: SubmitTodoType) => Promise<TodoCellType>,
    updatePrintTodo: (updatePrintTodo: TodoCellType) => void,
    updateMappingCategory: (submitTodoCategories: SubmitTodoCategoryOperationType) => Promise<void>
}

/* Todo の更新フォームを描画する Organism コンポーネント */
export const TodoFormViewUpdate: React.FC<TodoFormViewUpdateProps> = ({
    labelTodoTitle,
    labelTodoCategory,
    todoCells,
    optionsCategory,
    handleTodoUpdate,
    updatePrintTodo,
    updateMappingCategory
}) => {

    // フォームの選択肢に表示する Todo 一覧
    const [optionsTodo, setOptionsTodo] = useState<FormSelectType[]>([]);

    // バックエンド側へ送信する Todo
    const [submitTodo, setSubmitTodo] = useState<FormSelectType>({id:-1, name: ''});

    // バックエンド側へ送信するカテゴリー
    const [submitCategories, setSubmitCategories] = useState<FormSelectType[]>([]);

    // タイトルの変更を処理するハンドラー
    const handleTitleChange = (value: FormSelectType) => {
        setSubmitTodo(value);
    };

    // カテゴリーの変更を処理するハンドラー
    const handleCategoriesChange = (selectedCategories: FormSelectType[]) => {
        setSubmitCategories(selectedCategories);
    };

    // フォーム送信時の処理
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        // 更新対象の Todo を取得
        const targetTodoCell = todoCells.find((todoCell) => todoCell.id === submitTodo.id);
        if (targetTodoCell === undefined)
            throw new Error(`存在すべき値${submitTodo.id}がありませんでした。管理者にお問い合わせください。`);

        // バックエンド側で Todo エンティティを更新
        const updatedTodoCell = await handleTodoUpdate(
            { id: -1, userId: 1, title: submitTodo.name, isCheck: false }
        );

        // バックエンド側で List<TodoCategory> エンティティを更新
        const submitTodoCategories: SubmitTodoCategoryOperationType = convertSubmitTodoCategories(updatedTodoCell, submitCategories);
        await updateMappingCategory(submitTodoCategories);

        // 該当の Todo を更新
        updatePrintTodo(updatedTodoCell);
    };

    // フォームの選択肢に表示する Todo 一覧を設定
    useEffect(() => {
        const updatedTodoTitle = todoCells.map((todoCell) => {
            return {id: todoCell.id, name: todoCell.title};
        })
        setOptionsTodo(updatedTodoTitle);
    }, [todoCells])

    return (
        <form onSubmit={handleSubmit} className="todo-form-view-container">
            <FormSelect
                label={labelTodoTitle}
                options={optionsTodo}
                handleSelectChange={handleTitleChange}
            />
            <FormCheckBox
                label={labelTodoCategory}
                options={optionsCategory}
                handleCheckChange={handleCategoriesChange}
            />
            <Button
                type="submit"
                variant="contained"
                endIcon={<AddTask />}>
                Update Todo
            </Button>
        </form>
    );
}
