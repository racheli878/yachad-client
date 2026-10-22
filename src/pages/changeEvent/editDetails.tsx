import { FormProvider, useForm, type FieldPath } from "react-hook-form"
import { type EditEventForm, type EventDetails } from "../../models/event"
import FormEvent from "./formEvent"
import ChangeStatus from "./changeStatus"
import { toDateTimeLocal } from "../../utils/formatDate"
import { convertEventForm } from "../../utils/convertEventForm"
import type { UpdateEventRequest } from "../../models/event"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateEvent } from "../../api/eventsApi"
import getApiError from "../../utils/getApiError"
import Loading from "../../components/loading"
import { Link, useNavigate } from "react-router-dom"

const EditDetails = ({ event }: { event: EventDetails }) => {
    const methods = useForm<EditEventForm>({
        mode: "onBlur",
        defaultValues: {
            activityType: event.activityType,
            budget: event.budget,
            category: event.category,
            description: event.description ? event.description : "",
            eventDate: toDateTimeLocal(event.eventDate),
            food: event.food ? event.food : "",
            location: event.location ? event.location : "",
            status: event.status,
            title: event.title
        }
    })
    const { handleSubmit, setError, formState: { dirtyFields, errors } } = methods
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { mutate, isPending } = useMutation({
        mutationFn: updateEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events", event.id] })
            queryClient.invalidateQueries({ queryKey: ["events"] })
            navigate(`/event/${event.id}`)
        },
        onError: (error) => {
            const e = getApiError(error)
            if (e.details)
                e.details.forEach(d => setError(d.field as FieldPath<EditEventForm>, { message: d.message }))
            else
                setError("root", { message: e.message || "אירעה שגיאה בעדכון האירוע" })
        }
    })
    const onsubmit = (data: EditEventForm) => {
        const dataToSend = {
            ...convertEventForm(data),
            status: data.status
        }
        const changedFields = Object.keys(dirtyFields) as (keyof EditEventForm)[]

        if (changedFields.length === 0) {
            setError("root", { message: "לא בוצעו שינויים" })
            return
        }
        const updateData = Object.fromEntries(changedFields.map(key => [key, dataToSend[key]])) as UpdateEventRequest

        mutate({ id: event.id, data: updateData })
    }

    return <>
        <FormProvider {...methods}>
            <form className="edit-form" onSubmit={handleSubmit(onsubmit)}>
                <ChangeStatus event={event} />
                <FormEvent />
                <Link to="/allEvents" className="btn btn-ghost">ביטול</Link>
                <button className="btn btn-primary btn-lg" type="submit" disabled={isPending}>{isPending ? <div>מעדכן... <Loading /></div> : <div>שמירת השינויים</div>}</button>
            </form>
        </FormProvider>
        {errors.root && <div className="alert alert-error">{errors.root.message}</div>}
    </>
}

export default EditDetails