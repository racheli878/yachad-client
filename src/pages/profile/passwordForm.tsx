import { useForm } from "react-hook-form"
import { type EditPass } from "../../models/userModel"
import { useMutation } from "@tanstack/react-query"
import { EditPassword } from "../../api/profileApi"
import Loading from "../../components/loading"
import getApiError from "../../utils/getApiError"

const PasswordForm = () => {
    const { register, handleSubmit, formState: { errors }, reset,setError} = useForm<EditPass>({
        mode: "onTouched"
    })

    const { mutate, isPending, isSuccess,data } = useMutation({
        mutationFn: EditPassword,
        onSuccess: () => {
            reset()
        },
        onError: (e) => {
            const error = getApiError(e)
            if (error.details && error.details?.length > 0)
                error.details?.forEach(f => setError(f.field as keyof EditPass, { message: f.message }))
            else if (error.code == "WRONG_PASSWORD")
                setError("currentPassword", { message: error.message })
            else if (error.code == "VALIDATION_ERROR")
                setError("newPassword", { message: error.message })
            else
                setError("root", { message: error.message })
        }
    })

    const onsubmit = (data: EditPass) => {
        mutate(data)
    }
    return <div className="card profile-card">
        <h2>שינוי סיסמה</h2>
        <form className="profile-form" onSubmit={handleSubmit(onsubmit)}>
            <div>
                <label className="field">סיסמה נוכחית
                    <input className="input" type="password" {...register("currentPassword", {
                        required: "יש להזין סיסמה נוכחית"
                    })} />
                    {errors.currentPassword && <div className="field-error">{errors.currentPassword.message}</div>}
                </label>
            </div>
            <div>
                <label className="field">סיסמה חדשה
                    <input className="input" type="password"{...register("newPassword", {
                        required: "יש להזין סיסמה חדשה",
                        minLength: { value: 8, message: "סיסמה חייבת לכלול לפחות 8 תוים" },
                        maxLength: { value: 72, message: "סיסמה לא יכולה לכלול מעל 72 תוים" },
                        pattern: {
                            value: /^(?=.*[a-zA-Z])(?=.*\d).{8,72}$/,
                            message: "הסיסמה חייבת להכיל 8–72 תווים, לפחות אות באנגלית וספרה"
                        }
                    })} />
                </label>
                <p className="field-hint">8 תווים לפחות, אות באנגלית וספרה</p>
                {errors.newPassword && <div className="field-error">{errors.newPassword.message}</div>}
            </div>
            <button className="btn btn-outline profile-save" type="submit" disabled={isPending}>{isPending ? <>טוען...<Loading /></> : "עדכון סיסמה"}</button>
        </form>
        {isSuccess&&data && <div className="alert alert-success profile-note">{data.message}</div>}
        {errors.root&&<div className="alert alert-error profile-note">{errors.root.message}</div>}
    </div>
}

export default PasswordForm