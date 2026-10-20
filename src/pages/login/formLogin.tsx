import { useForm } from "react-hook-form"
import { useContext } from "react";
import { CuserContext } from "../../auth/cuserContext";
import type LoginData from "../../models/loginData";
import getApiError from "../../utils/getApiError";
import Loading from "../../components/loading";

const FormLogin = () => {

    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<LoginData>({ mode: "onBlur" });
    const { login } = useContext(CuserContext)

    const onSubmit = async (data: LoginData) => {
        try {
            await login(data)
        }
        catch (e) {
            const error = getApiError(e)
            setError("root", { message: error.message })
        }
    }

    return <form onSubmit={handleSubmit(onSubmit)}>

        <div>
            <input type="email"
                placeholder="מייל"
                {...register("email", { required: "יש להזין מייל" })}
            />
            {errors.email && <div>{errors.email.message}</div>}
        </div>
        <div>
            <input type="password"
                placeholder="סיסמה"
                {...register("password", { required: "יש להזין סיסמה" })}
            />
            {errors.password && <div>{errors.password.message}</div>}
        </div>

        {errors.root && <div>{errors.root.message}</div>}
        <button type="submit" disabled={isSubmitting}>{isSubmitting?"מתחברים...":"התחברות"}{isSubmitting&&<Loading/>}</button>
    </form>


}

export default FormLogin