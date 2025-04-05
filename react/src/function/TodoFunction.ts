import {
    CategoryType,
    SubmitTodoCategoriesType,
    SubmitTodoCategoryOperationType,
    TodoCellType
} from "../types/TodoTypes";

export const convertSubmitTodoCategories = (
    targetTodoCell: TodoCellType, // 更新前のカテゴリー
    categories: CategoryType[] // 更新後のカテゴリー
): SubmitTodoCategoryOperationType => {

    const submitCategories = categories.map(category => ({ id: null, category }));
    const originTodoCategories = targetTodoCell.todoCategories;
    const insertTodoCategories: SubmitTodoCategoriesType = [];
    const updateTodoCategories: SubmitTodoCategoriesType = [];
    const deleteTodoCategories: SubmitTodoCategoriesType = [];

    const minLength = Math.min(originTodoCategories.length, submitCategories.length);

    // 更新対象のカテゴリー
    for (let i = 0; i < minLength; i++) {
        updateTodoCategories.push({
            id: originTodoCategories[i].id,
            todoId: targetTodoCell.id,
            categoryId: submitCategories[i].category.id
        });
    }

    // 追加が必要なカテゴリー
    for (let i = minLength; i < submitCategories.length; i++) {
        insertTodoCategories.push({
            id: null,
            todoId: targetTodoCell.id,
            categoryId: submitCategories[i].category.id
        });
    }

    // 削除が必要なカテゴリー
    for (let i = minLength; i < originTodoCategories.length; i++) {
        deleteTodoCategories.push({
            id: originTodoCategories[i].id,
            todoId: targetTodoCell.id,
            categoryId: originTodoCategories[i].category.id
        });
    }

    return {
        insertTodoCategories,
        updateTodoCategories,
        deleteTodoCategories
    };
};
