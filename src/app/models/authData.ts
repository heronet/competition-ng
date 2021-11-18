export interface AuthData {
    id: string;
    username: string;
    token: string;
    roles?: string[];
    claims?: string[];
}