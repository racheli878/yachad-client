
export default interface User {
    id: number,
    fullName: string,
    email: string,
    phone: string,
}

export interface UserForTransfer {
    id: number,
    fullName: string,
    phone: string
}

export interface PartUser{
    id:number,
    fullName:string
}