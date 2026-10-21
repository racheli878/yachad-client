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

    return <form className="stack my-auto" onSubmit={handleSubmit(onSubmit)}>

        <div className="field">
            <label htmlFor="email">מייל
            <input className="input" type="email"
                aria-invalid={!!errors.email}
                // placeholder="המייל שלי"
                {...register("email", { required: "יש להזין מייל" })}
            /></label>
            {errors.email && <div className="field-error">{errors.email.message}</div>}
        </div>
        <div className="field">
            <label htmlFor="password">סיסמה
            <input className="input" type="password"
                aria-invalid={!!errors.password}
                // placeholder="סיסמה"
                {...register("password", { required: "יש להזין סיסמה" })}
            /></label>
            {errors.password && <div className="field-error">{errors.password.message}</div>}
        </div>

        {errors.root && <div className="alert alert-error">{errors.root.message}</div>}
        <button className="btn btn-primary btn-lg btn-block" type="submit" disabled={isSubmitting}>{isSubmitting ? "מתחברים..." : "התחברות"}{isSubmitting && <Loading />}</button>
    </form>


}

export default FormLogin