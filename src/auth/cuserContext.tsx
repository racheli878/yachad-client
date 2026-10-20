import { createContext, useEffect, useState, type ReactNode } from "react";
import type LoginData from "../models/loginData";
import type registerData from "../models/registerData";
import type User from "../models/userModel";
import { getMe, loginApi, registerApi } from "../api/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";


interface CuserContextType {
    cuser: User | null;
    loading: boolean;
    login: (data: LoginData) => Promise<void>;
    register: (data: registerData) => Promise<void>;
    logOut: () => void;
}

export const CuserContext = createContext<CuserContextType>({
    cuser: null,
    loading: false,
    login: async () => { },
    register: async () => { },
    logOut: () => { }
})

const CuserProvider = ({ children }: { children: ReactNode }) => {
    const [cuser, setCuser] = useState<User | null>(null)
    const [loading, setLoading] = useState(!!localStorage.getItem("token"))

    const login = async (data: LoginData) => {
        const res = await loginApi(data)
        localStorage.setItem("token", res.token)
        setCuser(res.user)
    }

    const register = async (data: registerData) => {
        const res = await registerApi(data)
        localStorage.setItem("token", res.token)
        setCuser(res.user)
    }

    const logOut = () => {
        const queryClient=useQueryClient()
        localStorage.removeItem("token")
        queryClient.clear()
        setCuser(null)
    }

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem("token")
            if (token) {
                try {
                    const me=await getMe()
                    setCuser(me)
                }
                catch {
                    localStorage.removeItem("token")
                }
                finally {
                    setLoading(false)
                }
            }
        }
        checkUser()
    }, [])



    return <CuserContext.Provider value={{ cuser, loading, login, register, logOut }}>
        {children}
    </CuserContext.Provider>
}

export default CuserProvider