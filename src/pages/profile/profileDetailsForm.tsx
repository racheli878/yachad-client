import { useForm } from "react-hook-form"
import type User from "../../models/userModel"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { EditProfileDetails } from "../../api/profileApi"
import { getChangedFields } from "../../utils/convertTypes"
import Loading from "../../components/loading"
import type { EditProfile } from "../../models/userModel"
import getApiError from "../../utils/getApiError"
import { useContext } from "react"
import { CuserContext } from "../../auth/cuserContext"

const ProfileDetailsForm = ({ user }: { user: User }) => {

    const { edit } = useContext(CuserContext)
    const { register, handleSubmit, formState: { errors, dirtyFields, isDirty }, reset, setError } = useForm<EditProfile>({
        mode: "onTouched",
        defaultValues: user
    })

    const queryClient = useQueryClient()
    const { mutate, isPending, isSuccess } = useMutation({
        mutationFn: EditProfileDetails,
        onSuccess: (newProfile) => {
            queryClient.invalidateQueries({ queryKey: ["me"] })
            if (dirtyFields.email || dirtyFields.phone)
                queryClient.invalidateQueries({ queryKey: ["invitations"] })
            edit(newProfile.user)
            reset(newProfile.user)
        },
        onError: (e) => {
            if (e) {
                const error = getApiError(e)
                if (error.details && error.details?.length > 0)
                    error.details?.forEach(f => setError(f.field as keyof EditProfile, { message: f.message }))
                else if (error.code == "EMAIL_TAKEN")
                    setError("email", { message: error.message })
                else if (error.code == "PHONE_TAKEN")
                    setError("phone", { message: error.message })
                else
                    setError("root", { message: error.message })
            }
        }
    })

    const onsubmit = (data: EditProfile) => {
        const changed = getChangedFields(data, dirtyFields)
        mutate(changed)
    }

    return <div className="card profile-card">
        <div className="profile-card-head">
            <h2>פרטים אישיים</h2>
            <p className="muted">השם והטלפון מוצגים למשתתפים במפגשים שלך. המייל נשאר פרטי.</p>
        </div>
        <form className="profile-form" onSubmit={handleSubmit(onsubmit)}>
            <div>
                <label className="field">שם מלא
                    <input className="input" {...register("fullName", {
                        required: "יש להזין שם מלא",
                        minLength: { value: 2, message: "שם חייב לכלול לפחות 2 תוים" },
                        maxLength: { value: 80, message: "שם לא יכול לכלול מעל 80 תוים" }
                    })} />
                    {errors.fullName && <div className="field-error">{errors.fullName.message}</div>}
                </label>
            </div>
            <div>
                <label className="field">טלפון
                    <p className="field-hint">גלוי למשתתפים</p>
                    <input className="input" dir="ltr" type="tel" {...register("phone", {
                        required: "יש להזין מספר טלפון",
                        pattern: {
                            value: /^(?:0[0-9]{1,2}|(?:\+972)[0-9]{1,2})-?[0-9]{3}-?[0-9]{4}$/,
                            message: "מספר הטלפון אינו תקין"
                        }
                    })} />
                    {errors.phone && <div className="field-error">{errors.phone.message}</div>}
                </label>
            </div>
            <div>
                <label className="field">מייל
                    <p className="field-hint">פרטי</p>
                    <input className="input" dir="ltr" type="email"{...register("email", {
                        required: "יש להזין מייל",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "כתובת המייל אינה תקינה"
                        }
                    })} />
                    {errors.email && <div className="field-error">{errors.email.message}</div>}
                </label>
            </div>
            {isSuccess && !isDirty && <div className="profile-saved">✓ הפרטים נשמרו</div>}
            <button className="btn btn-primary profile-save" type="submit" disabled={isPending}>{isPending ? <>טוען...<Loading /></> : "שמירת פרטים"}</button>
            {errors.root && <div className="alert alert-error profile-error">{errors.root.message}</div>}
        </form>
        <div className="alert alert-info profile-note">שינוי מייל או טלפון: ההזמנות שיוצגו ב"ההזמנות שלי" יותאמו לפרטים החדשים.</div>
    </div>
}

export default ProfileDetailsForm