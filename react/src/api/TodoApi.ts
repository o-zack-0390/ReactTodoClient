import {
    SubmitTodoCategoriesType,
    SubmitTodoType,
    TodoCellType
} from "../types/TodoTypes";

/* Todo データを取得する関数 */
export const getTodos = async (userId: number): Promise<TodoCellType[]> => {
    try {
        const response = await fetch(`http://localhost:8080/todo?userId=${userId}`, {
            method: "GET",
            credentials: "include"
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const datas = await response.json();
        return datas.map((data: any) => {
            return {
                id: data.id,
                title: data.title,
                isCheck: data.isCheck,
                todoCategories: data.todoCategories
            }
        });
    } catch (error) {
        console.error('Error getting todo:', error);
        throw error;
    }
}

/* Todo データを登録する関数 */
export const postTodo = async (req: SubmitTodoType): Promise<TodoCellType> => {
    try {
        const response = await fetch(`http://localhost:8080/todo`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: null,
                userId: req.userId,
                title: req.title,
                isCheck: req.isCheck
            })
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return {
            id: data.id,
            title: data.title,
            isCheck: data.isCheck,
            todoCategories: data.todoCategories
        };
    } catch (error) {
        console.error('Error posting todo:', error);
        throw error;
    }
}

/* Todo データを更新する関数 */
export const putTodo = async (req: SubmitTodoType): Promise<TodoCellType> => {
    try {
        const response = await fetch(`http://localhost:8080/todo/${req.id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req) // 更新するTODOデータ全体
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return {
            id: data.id,
            title: data.title,
            isCheck: data.isCheck,
            todoCategories: data.todoCategories
        };
    } catch (error) {
        console.error('Error updating todo:', error);
        throw error;
    }
}

/* Todo データを削除する関数 */
export const deleteTodo = async (req: number): Promise<void> => {
    try {
        const response = await fetch(`http://localhost:8080/todo/${req}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    } catch (error) {
        console.error('Error deleting todo:', error);
        throw error;
    }
}

/* TodoCategory データを登録する関数 */
export const postTodoCategories = async (req: SubmitTodoCategoriesType): Promise<TodoCellType> => {
    try {
        const response = await fetch(`http://localhost:8080/todocategory`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req)
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return {
            id: data.id,
            title: data.title,
            isCheck: data.isCheck,
            todoCategories: data.todoCategories
        };
    } catch (error) {
        console.error('Error posting todocategory:', error);
        throw error;
    }
}

/* TodoCategory データを更新する関数 */
export const putTodoCategories = async (req: SubmitTodoCategoriesType): Promise<TodoCellType> => {
    try {
        const response = await fetch(`http://localhost:8080/todocategory`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req)
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return {
            id: data.id,
            title: data.title,
            isCheck: data.isCheck,
            todoCategories: data.todoCategories
        };
    } catch (error) {
        console.error('Error putting todocategory:', error);
        throw error;
    }
}

/* TodoCategory データを削除する関数 */
export const deleteTodoCategories = async (req: any[]): Promise<void> => {
    try {
        const response = await fetch(`http://localhost:8080/todocategory/${req}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    } catch (error) {
        console.error('Error deleting todocategory:', error);
        throw error;
    }
}
