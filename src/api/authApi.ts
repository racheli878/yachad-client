import type LoginData from "../models/loginData";
import type UserAndToken from "../models/userAndToken";
import api from "./generalAxios";
import type RegisterData from "../models/registerData";
import type User from "../models/userModel";

export const loginApi = async (data: LoginData) => {
    const res = await api.post<UserAndToken>("/auth/login", data)
    return res.data
}

export const registerApi = async (data: RegisterData) => {
    const res = await api.post<UserAndToken>("/auth/register", data)
    return res.data
}

export const getMe=async () => {
    const res = await api.get<{ user: User }>("/auth/me")
    return res.data.user
}