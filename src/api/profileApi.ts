import type { EditPass, EditProfile } from "../models/userModel"
import type User from "../models/userModel"
import api from "./generalAxios"

export const EditProfileDetails=async(data:EditProfile)=>{
    const res=await api.put<{user:User}>(`/users/me`,data)
    return res.data
}

export const EditPassword=async(data:EditPass)=>{
    const res=await api.put<{message:string}>(`/users/me/password`,data)
    return res.data
}
