import axios from "axios"
import type ErrorProps from "../models/errorProps"

const getApiError=(error:unknown):ErrorProps=>{
    if(axios.isAxiosError<{error:ErrorProps}>(error)&&error.response?.data?.error)
        return error.response.data.error
    if(axios.isAxiosError(error))
        return {code:"NETWORK_ERROR",message:"אין חיבור לשרת, נסו שנית"}
    return {code:"UNKNOWN",message:"אירעה שגיאה, נסו שנית"}
}

export default getApiError

