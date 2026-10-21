import { useFieldArray, useForm, type FieldPath } from "react-hook-form"
import { activityTypes, categories } from "../models/eventSelections"
import { activityTypeLabels, categoryLabels, contactLabels } from "../utils/labels"
import type { NewEventForm, NewEventRequest } from "../models/event"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createEvent } from "../api/eventsApi"
import { useState } from "react"
import { Link } from "react-router-dom"
import getApiError from "../utils/getApiError"

interface InvitationSummary {
    eventId: number,
    invitationSent: number,
    skippedMessages: string[]
}

const NewEventPage = () => {
    const { register, handleSubmit, formState: { errors }, setError, control, watch } = useForm<NewEventForm>({
        mode: "onBlur",
        defaultValues: {
            invitees: [{ contact: "" }],
            category: "OTHER",
            activityType: "OTHER"
        }
    })
    const [invitationSummary, setInvitationSummary] = useState<InvitationSummary | null>(null)
    const { remove, fields, append } = useFieldArray({ control: control, name: "invitees" })
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: createEvent,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["events"] })
            setInvitationSummary({
                eventId: data.event.id,
                invitationSent: data.invitationsSummary.createdCount,
                skippedMessages: data.invitationsSummary.skipped.map(i => i.message)
            })
        },
        onError: (error) => {
            const e = getApiError(error)
            if (e.details)
                e.details.forEach(d => setError(d.field as FieldPath<NewEventForm>, { message: d.message }))
            else
                setError("root", { message: e.message || "אירעה שגיאה ביצירת האירוע" })
        }
    })

    const onsubmit = (data: NewEventForm) => {
        const dataToSend: NewEventRequest = {
            title: data.title,
            eventDate: !data.eventDate ? null : new Date(data.eventDate).toISOString(),
            location: data.location == "" ? null : data.location,
            food: data.food == "" ? null : data.food,
            budget: Number.isNaN(data.budget) ? null : data.budget,
            category: data.category,
            activityType: data.activityType,
            description: data.description == "" ? null : data.description,
            invitees: data.invitees.map(f => ({ contact: f.contact.trim() })).filter(f => f.contact != ""),
            questions: []
        }
        mutate(dataToSend)

    }

    const check = (value: string) => {
        if (!value.trim())
            return ""
        const cleanPhone = value.trim().replace(/[-\s]/g, "");
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
            return "tag-mail"
        if (/^0\d{8,9}$/.test(cleanPhone))
            return "tag-phone"
        return "tag-invalid"
    }



    if (invitationSummary)
        return <div className="new-event">
            <div className="card success-card">
                <h2>המפגש נוצר!</h2>
                {invitationSummary.invitationSent > 0 ? <h4>נשלחו <span>{invitationSummary.invitationSent}</span> הזמנות</h4> : <p>לא נשלחו הזמנות כלל</p>}
            </div>
            {invitationSummary.skippedMessages.length != 0 &&
                <div className="alert alert-warning skipped">
                    <h4>לא נשלחו הזמנות ל:</h4>
                    <ul className="skipped-list">
                        {invitationSummary.skippedMessages.map((i, index) => <li key={index}>{i}</li>)}
                    </ul>
                </div>}
            <Link className="btn btn-primary btn-lg" to={`/event/${invitationSummary.eventId}`}>לכניסה למפגש</Link>
        </div>


    return <form className="new-event" onSubmit={handleSubmit(onsubmit)}>
        <div className="page-head">
            <h1>על מה המפגש?</h1>
            <p className="page-title-sub">רק השם חובה. תאריך ומקום אפשר להשאיר ריקים ולקבוע אחר כך.</p>
        </div>
        <div className="form-card grid-form">
            <div className="full">
                <label className="field">שם האירוע*
                    <input className="input input-title" type="text"
                        {...register("title", {
                            required: "יש להזין שם אירוע",
                            minLength: {
                                value: 2,
                                message: "שם האירוע חייב לכלול לפחות 2 תוים"
                            },
                            maxLength: {
                                value: 100,
                                message: "שם האירוע לא יכול לכלול מעל 100 תוים"
                            }
                        })} />
                </label>
                {errors.title && <div className="field-error">{errors.title.message}</div>}
            </div>
            <div>
                <label className="field">קטגוריה
                    <select className="select" {...register("category")}>
                        {categories.map(c => <option key={c} value={c}>{categoryLabels[c]}</option>)}
                    </select>
                </label>
                {errors.category && <div className="field-error">{errors.category.message}</div>}
            </div>
            <div>
                <label className="field">פעילות
                    <select className="select" {...register("activityType")}>
                        {activityTypes.map(a => <option key={a} value={a}>{activityTypeLabels[a]}</option>)}
                    </select>
                </label>
                {errors.activityType && <div className="field-error">{errors.activityType.message}</div>}
            </div>
            <div>
                <label className="field">תאריך ושעה
                    <span className="field-hint">רשות, אפשר לקבוע אחר כך</span>
                    <input className="input optional" type="datetime-local"
                        {...register("eventDate")} />
                </label>
            </div>
            <div>
                <label className="field">מקום
                    <span className="field-hint">רשות, אפשר לקבוע אחר כך</span>
                    <input className="input optional" type="text"
                        {...register("location", { maxLength: { value: 200, message: "מיקום יכול לכלול עד 200 תווים" } })} />
                </label>
                {errors.location && <div className="field-error">{errors.location.message}</div>}
            </div>
            <div>
                <label className="field">מה אוכלים
                    <input className="input" type="text"
                        {...register("food", { maxLength: { value: 500, message: "תאור האוכל לא יכול לכלול מעל 500 תווים" } })}
                    /> </label>
                {errors.food && <div className="field-error">{errors.food.message}</div>}
            </div>
            <div>
                <label className="field">תקציב משוער(₪)
                    <input className="input" type="number"
                        {...register("budget", {
                            valueAsNumber: true,
                            min: {
                                value: 0,
                                message: "תקציב לא יכול להיות שלילי"
                            },
                            max: {
                                value: 1000000,
                                message: "התקציב לא יכול לחרוג ממליון שקלים"
                            }
                        })} />
                </label>
                {errors.budget && <div className="field-error">{errors.budget.message}</div>}
            </div>
            <div className="full">
                <label className="field">תיאור
                    <textarea className="textarea" {...register("description", { maxLength: { value: 1000, message: "תיאור האירוע לא יכול לכלול מעל 1000 תווים" } })} />
                </label>
                {errors.description && <div className="field-error">{errors.description.message}</div>}
            </div>
        </div>
        {/* part 2 of the form: */}
        <div className="form-card invitees">
            <div className="section-head">
                <h2> את מי תרצו להזמין?</h2>
                <p>מייל או טלפון בכל שורה. גם מי שעוד לא רשום יראה את ההזמנה ברגע שיירשם עם אותם פרטים.</p>
            </div>
            {fields.map((f, i) => {
                const contactType=check(watch(`invitees.${i}.contact`))
                return <div className="invitee-row" key={f.id}>
                <p className="invitee-num">{i + 1}</p>
                <input className="input" {...register(`invitees.${i}.contact`, {
                    validate: (value) => {
                        if (!value.trim())
                            return true
                        const cleanPhone = value.trim().replace(/[-\s]/g, "");
                        return (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) || /^0\d{8,9}$/.test(cleanPhone) || "יש להזין כתובת מייל או מספר טלפון תקין")
                    }
                })} />
                {errors.invitees?.[i]?.contact && <div className="field-error invitee-error">{errors.invitees?.[i].contact?.message}</div>}
                {contactType!=""&&<span className={`tag ${contactType}`}>{contactLabels[contactType]}</span>}
                <button className="icon-btn icon-remove" type="button" onClick={() => remove(i)}></button>
            </div>})}

            <button className="btn btn-dashed add-row" type="button" onClick={() => append({ contact: "" })}> +  הוספת משתתף</button>
        </div>
        {errors.root && <div className="alert alert-error">{errors.root.message}</div>}
        <div className="form-actions">
            <Link to="/allEvents" className="btn btn-ghost">ביטול</Link>
        </div>
        <button className="btn btn-primary btn-lg" disabled={isPending} type="submit">{isPending ? "יוצרים..." : "יצירת אירוע"}</button>
    </form>

}

export default NewEventPage