
export default interface User {
    id: number,
    fullName: string,
    email: string,
    phone: string,
    createdAt: string
}

export interface UserForTransfer {
    id: number,
    fullName: string,
    phone: string
}

export interface PartUser {
    id: number,
    fullName: string
}

export interface UserAndToken {
    token: string,
    user: User
}

export interface EditProfile {
    fullName?: string,
    email?: string,
    phone?: string,
}

export interface EditPass{
    currentPassword:string,
    newPassword:string
}