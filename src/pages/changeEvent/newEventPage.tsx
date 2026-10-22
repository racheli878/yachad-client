import { FormProvider, useFieldArray, useForm, type FieldPath } from "react-hook-form"
import { contactLabels } from "../../utils/labels"
import type { NewEventForm, NewEventRequest } from "../../models/event"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createEvent } from "../../api/eventsApi"
import { useState } from "react"
import { Link } from "react-router-dom"
import getApiError from "../../utils/getApiError"
import { checkContactTypes } from "../../utils/contactTypes"
import CreatedEvent from "./CreatedEvent"
import type { InvitationSummary } from "../../models/invitation"
import FormEvent from "./formEvent"
import { convertEventForm } from "../../utils/convertEventForm"

const NewEventPage = () => {
    const methods = useForm<NewEventForm>({
        mode: "onBlur",
        defaultValues: {
            invitees: [{ contact: "" }],
            category: "OTHER",
            activityType: "OTHER"
        }
    })
    const { register, handleSubmit, formState: { errors }, setError, control, watch } = methods
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
        const dataToSend:NewEventRequest = {
            ...convertEventForm(data),
            invitees: data.invitees.map(f => ({ contact: f.contact.trim() })).filter(f => f.contact != ""),
            questions:[]
    }
    mutate(dataToSend)
}

if (invitationSummary)
    return <CreatedEvent invitationSummary={invitationSummary} />


return <FormProvider {...methods}> <form className="new-event" onSubmit={handleSubmit(onsubmit)}>
    <div className="page-head">
        <h1>על מה המפגש?</h1>
        <p className="page-title-sub">רק השם חובה. את שאר הנתונים אפשר להשאיר ריקים ולקבוע אחר כך.</p>
    </div>
    <FormEvent />
    {/* part 2 of the form: */}
    <div className="form-card invitees">
        <div className="section-head">
            <h2> את מי תרצו להזמין?</h2>
            <p>מייל או טלפון בכל שורה. גם מי שעוד לא רשום יראה את ההזמנה ברגע שיירשם עם אותם פרטים.</p>
        </div>
        {fields.map((f, i) => {
            const contactType = checkContactTypes(watch(`invitees.${i}.contact`))
            return <div className="invitee-row" key={f.id}>
                <p className="invitee-num">{i + 1}</p>
                <input className="input" {...register(`invitees.${i}.contact`, {
                    validate: (value) => {
                        if (checkContactTypes(value) == "tag-invalid")
                            return "יש להזין כתובת מייל או מספר טלפון תקין"
                        return true
                    }
                })} />
                {errors.invitees?.[i]?.contact && <div className="field-error invitee-error">{errors.invitees?.[i].contact?.message}</div>}
                {contactType != "" && <span className={`tag ${contactType}`}>{contactLabels[contactType]}</span>}
                <button className="icon-btn icon-remove" type="button" onClick={() => remove(i)}></button>
            </div>
        })}

        <button className="btn btn-dashed add-row" type="button" onClick={() => append({ contact: "" })}> +  הוספת משתתף</button>
    </div>
    {errors.root && <div className="alert alert-error">{errors.root.message}</div>}
    <div className="form-actions">
        <Link to="/allEvents" className="btn btn-ghost">ביטול</Link>
        <button className="btn btn-primary btn-lg" disabled={isPending} type="submit">{isPending ? "יוצרים..." : "יצירת אירוע"}</button>
    </div>
</form>
</FormProvider>

}

export default NewEventPage