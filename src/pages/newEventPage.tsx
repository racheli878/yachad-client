import { useFieldArray, useForm, type FieldPath } from "react-hook-form"
import { activityTypes, categories } from "../models/eventSelections"
import { activityTypeLabels, categoryLabels } from "../utils/labels"
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
    const { register, handleSubmit, formState: { errors }, setError, control } = useForm<NewEventForm>({
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
        onError:(error)=>{
            const e=getApiError(error)
            if(e.details)
                e.details.forEach(d=>setError(d.field as FieldPath<NewEventForm>,{message:d.message}))
            else
                setError("root",{message:e.message||"אירעה שגיאה ביצירת האירוע"})
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
    if (invitationSummary)
        return <>
            <div>
                <h2>המפגש נוצר!</h2>
                <h4>נשלחו <span>{invitationSummary.invitationSent}</span> הזמנות</h4>
            </div>
            {invitationSummary.skippedMessages.length!=0&&
            <div>
                <h4>לא נשלחו הזמנות ל:</h4>
                <ul>
                    {invitationSummary.skippedMessages.map((i,index) => <li key={index}>{i}</li>)}
                </ul>
            </div>}
            {invitationSummary.invitationSent==0&&<p>לא נשלחו הזמנות כלל</p>}
            <Link to={`/event/${invitationSummary.eventId}`}>לכניסה למפגש</Link>
        </>


    return <form onSubmit={handleSubmit(onsubmit)}>

        <div>
            <label>שם האירוע*
                <input type="text"
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
            {errors.title && <div>{errors.title.message}</div>}
        </div>
        <div>
            <label>תאריך ושעה
                <input type="datetime-local"
                    {...register("eventDate")} />
            </label>
        </div>
        <div>
            <label>מקום
                <input type="text"
                    {...register("location", { maxLength: { value: 200, message: "מיקום יכול לכלול עד 200 תווים" } })} />
            </label>
            {errors.location && <div>{errors.location.message}</div>}
        </div>
        <div>
            <label>מה אוכלים
                <input type="text"
                    {...register("food", { maxLength: { value: 500, message: "תאור האוכל לא יכול לכלול מעל 500 תווים" } })}
                /> </label>
            {errors.food && <div>{errors.food.message}</div>}
        </div>
        <div>
            <label>תקציב משוער
                <input type="number"
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
            {errors.budget && <div>{errors.budget.message}</div>}
        </div>
        <div>
            <label>קטגוריה
                <select {...register("category")}>
                    {categories.map(c => <option key={c} value={c}>{categoryLabels[c]}</option>)}
                </select>
            </label>
            {errors.category && <div>{errors.category.message}</div>}
        </div>
        <div>
            <label>פעילות
                <select {...register("activityType")}>
                    {activityTypes.map(a => <option key={a} value={a}>{activityTypeLabels[a]}</option>)}
                </select>
            </label>
            {errors.activityType && <div>{errors.activityType.message}</div>}
        </div>
        <div>
            <label>תיאור
                <textarea {...register("description", { maxLength: { value: 1000, message: "תיאור האירוע לא יכול לכלול מעל 1000 תווים" } })} />
            </label>
            {errors.description && <div>{errors.description.message}</div>}
        </div>
        {/* part 2 of the form: */}
        <div>
            <div>
                <h2> את מי תרצו להזמין?</h2>
                <p>מייל או טלפון בכל שורה. גם מי שעוד לא רשום יראה את ההזמנה ברגע שיירשם עם אותם פרטים.</p>
            </div>
            {fields.map((f, i) => <div key={f.id}>
                <p>{i + 1}</p>
                <input {...register(`invitees.${i}.contact`,{
                    validate:(value)=>{
                        if(!value.trim())
                            return true
                        return( /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())||/^0\d{8,9}$/.test(value.trim())||"יש להזין כתובת מייל או מספר טלפון תקין")
                    }})} />
                {errors.invitees?.[i]?.contact&&<div>{errors.invitees?.[i].contact?.message}</div>}
                <span>אמור להיות סמל</span>
                <button type="button" onClick={() => remove(i)}>אמור להיות אייקון מחיקה</button>
            </div>)}
            <button type="button" onClick={() => append({ contact: "" })}>הוספת משתתף</button>
        </div>
        {errors.root&&<div>{errors.root.message}</div>}
        <button disabled={isPending} type="submit">{isPending?"יוצרים...":"יצירת אירוע"}</button>
    </form>

}

export default NewEventPage