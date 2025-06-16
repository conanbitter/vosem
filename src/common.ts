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