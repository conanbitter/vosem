export interface GlobalDataType {
    username: string
    setUsername?: (newName: string) => void,
    tasks?: TasksData
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

export interface TasksQuery {
    page: number,
}

export interface TaskListItem {
    id: number,
    state: 'active' | 'finished' | 'canceled',
    title: string
}

export interface TasksData {
    list: TaskListItem[],
    pages: number
}

export type TasksResponse = {
    error: false,
} & TasksData | ErrorResponse;