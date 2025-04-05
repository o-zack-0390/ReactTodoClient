import React, { useState, FormEvent } from "react";
import './css/TodoFormView.css';
import {
    FormCheckBoxType,
    FormSelectType
} from "../../types/FormType";
import { FormCheckBox } from "../molecules/FormCheckBox";
import { FormInput } from "../molecules/FormInput";
import { Button } from "@mui/material";
import { AddTask } from "@mui/icons-material";
import {
    SubmitTodoCategoryOperationType,
    SubmitTodoType,
    TodoCellType
} from "../../types/TodoTypes";
import { convertSubmitTodoCategories } from "../../function/TodoFunction";

interface TodoFormViewAddProps {
    labelTodoTitle: string,
    labelTodoCategory: string,
    optionsCategory: FormCheckBoxType[],
    handleTodoInsert: (submitTodo: SubmitTodoType) => Promise<TodoCellType>,
    addPrintTodo: (addPrintTodo: TodoCellType) => void,
    updateMappingCategory: (submitTodoCategories: SubmitTodoCategoryOperationType) => Promise<void>
}

/* Todo の追加フォームを描画する Organism コンポーネント */
export const TodoFormViewAdd: React.FC<TodoFormViewAddProps> = ({
    labelTodoTitle, 
    labelTodoCategory,
    optionsCategory,
    handleTodoInsert,
    addPrintTodo,
    updateMappingCategory
}) => {

    // バックエンド側へ送信する Todo
    const [submitTodotitle, setTitle] = useState('');

    // バックエンド側へ送信するカテゴリー
    const [submitCategories, setSubmitCategories] = useState<FormCheckBoxType[]>([]);

    // カテゴリーの変更を処理するハンドラー
    const handleCategoriesChange = (selectedCategories: FormSelectType[]) => {
        setSubmitCategories(selectedCategories);
    };

    // フォーム送信時の処理
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        // 空欄の場合はアラートを表示
        if (!submitTodotitle.trim()) return alert("タイトルを入力してください。");

        // バックエンド側で Todo エンティティを登録
        const createdTodoCell = await handleTodoInsert(
            { id: -1, userId: 1, title: submitTodotitle, isCheck: false }
        );

        // バックエンド側で List<TodoCategory> エンティティを登録
        const submitTodoCategories: SubmitTodoCategoryOperationType = convertSubmitTodoCategories(createdTodoCell, submitCategories);
        await updateMappingCategory(submitTodoCategories);
        
        // 該当の Todo を登録
        addPrintTodo(createdTodoCell);
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form-view-container">
            <FormInput
                label={labelTodoTitle}
                handleTextChange={setTitle}
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
                Add Todo
            </Button>
        </form>
    );
};
