export interface GlobalDataType {
    username: string
    setUsername?: (newName: string) => void
}

export interface LoginQuery {
    login: string,
    password: string
}

interface ErrorResponse {
    error: true,
    message: string
}

export type LoginResponse = {
    error: false,
    username: string
} | ErrorResponse;

export interface TaskListItem {
    id: number,
    state: 'active' | 'finished' | 'canceled',
    title: string
}

export type TasksResponse = {
    error: false,
    list: TaskListItem[]
} | ErrorResponse;