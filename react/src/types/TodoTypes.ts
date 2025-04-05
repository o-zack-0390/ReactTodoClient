export type CategoryType = {
    id: number,
    name: string
}

export type TodoCategoryType = {
    id: number | null,
    category: CategoryType
}

export type TodoCellType = {
    id: number,
    title: string,
    isCheck: boolean,
    todoCategories: TodoCategoryType[]
}

export type SubmitTodoType = {
    id: number,
    userId: number,
    title: string,
    isCheck: boolean
}

export type SubmitTodoCategoriesType = {
    id: number | null;
    todoId: number;
    categoryId: number;
}[]

export type SubmitTodoCategoryOperationType = {
    insertTodoCategories: SubmitTodoCategoriesType,
    updateTodoCategories: SubmitTodoCategoriesType,
    deleteTodoCategories: SubmitTodoCategoriesType
}
