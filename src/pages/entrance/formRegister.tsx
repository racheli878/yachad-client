import { useContext } from "react"
import { useForm } from "react-hook-form"
import { CuserContext } from "../../auth/cuserContext"
import type RegisterData from "../../models/registerData"
import getApiError from "../../utils/getApiError"
import Loading from "../../components/loading"

const FormRegister = () => {

    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<RegisterData>({ mode: "onBlur" })
    const { register: registerFunc } = useContext(CuserContext)

    const onSubmit = async (data: RegisterData) => {
        try {
            await registerFunc(data)
        }
        catch (e) {
            const error = getApiError(e)
            if (error.details&&error.details?.length>0)
                error.details?.forEach(f => setError(f.field as keyof RegisterData, { message: f.message }))
            else if (error.code == "EMAIL_TAKEN")
                setError("email", { message: error.message })
            else if (error.code == "PHONE_TAKEN")
                setError("phone", { message: error.message })
            else
                setError("root", { message: error.message })
        }
    }


    return <form className="stack my-auto" onSubmit={handleSubmit(onSubmit)}>

        <div className="field">
            <label htmlFor="fullName">שם ומשפחה
            <input className="input" type="text"
                aria-invalid={!!errors.fullName}

                // placeholder="שם ומשפחה"
                {...register("fullName", {
                    required: "יש להזין שם מלא",
                    minLength: { value: 2, message: "שם חייב להיות לפחות באורך של 2 אותיות" },
                    maxLength: { value: 80, message: "שם לא יכול להכיל מעל 80 תוים" }
                })}
            /></label>
            {errors.fullName && <div className="field-error">{errors.fullName.message}</div>}
        </div>

        <div className="field">
            <label htmlFor="email">מייל
            <input className="input" type="email"
                aria-invalid={!!errors.email}

                // placeholder="מייל"
                {...register("email", {
                    required: "יש להזין מייל",
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "כתובת המייל אינה תקינה"
                    }
                })}
            /></label>
            {errors.email && <div className="field-error">{errors.email.message}</div>}
        </div>

        <div className="field">
            <label htmlFor="phone">טלפון
            <input className="input" type="tel"
                aria-invalid={!!errors.phone}

                // placeholder="טלפון"
                {...register("phone", {
                    required: "יש להזין מספר טלפון",
                    pattern: {
                        value: /^(?:0[0-9]{1,2}|(?:\+972)[0-9]{1,2})-?[0-9]{3}-?[0-9]{4}$/,
                        message: "מספר הטלפון אינו תקין"
                    }
                })}
            /></label>
            {errors.phone && <div className="field-error">{errors.phone.message}</div>}
        </div>

        <div className="field">
            <label htmlFor="password">סיסמה
            <input className="input" type="password"
                aria-invalid={!!errors.password}
                // placeholder="סיסמה"
                {...register("password", {
                    required: "יש להזין סיסמה",
                    pattern: {
                        value: /^(?=.*[a-zA-Z])(?=.*\d).{8,72}$/,
                        message: "הסיסמה חייבת להכיל 8–72 תווים, לפחות אות באנגלית וספרה"
                    },
                    minLength: {
                        value: 8,
                        message: "סיסמה חייבת לכלול לפחות 8 תוים"
                    },
                    maxLength: {
                        value: 72,
                        message: "סיסמה לא יכולה לכלול מעל 72 תוים"
                    }
                })}
            /></label>
            {errors.password && <div className="field-error">{errors.password.message}</div>}
        </div>
        {/* {errors.root.details&&} */}

        {errors.root && <div className="alert alert-error">{errors.root.message}</div>}

        <button className="btn btn-primary btn-lg btn-block" type="submit" disabled={isSubmitting}>{isSubmitting ? "טוען" : "הרשמה"}{isSubmitting && <Loading />}</button>

    </form>

}

export default FormRegister
