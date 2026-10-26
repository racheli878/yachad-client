import { FormProvider, useForm, type FieldPath } from "react-hook-form"
import { ButtonForStep, CancelForStep, CheckValidationFields, SentecesForStep, TitlesForStep } from "../../utils/stepsHelp"
import type { NewEventForm, NewEventRequest } from "../../models/event"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createEvent } from "../../api/eventsApi"
import { useState } from "react"
import { Link } from "react-router-dom"
import getApiError from "../../utils/getApiError"
import CreatedEvent from "./CreatedEvent"
import type { InvitationSummary } from "../../models/invitation"
import { convertEventForm, convertInvitees, ConvertQuestionForm } from "../../utils/convertEventForm"
import NewEvent1 from "./newEvent1"
import NewEvent2 from "./newEvent2"
import NewEvent3 from "./newEvent3"
import Loading from "../../components/loading"

const NewEventPage = () => {

    const [step, setStep] = useState<0 | 1 | 2>(0)

    const methods = useForm<NewEventForm>({
        mode: "onBlur",
        defaultValues: {
            invitees: [{ contact: "" }],
            category: "OTHER",
            activityType: "OTHER",
            questions: []
        }
    })
    const { handleSubmit, trigger, formState: { errors }, setError } = methods
    const [invitationSummary, setInvitationSummary] = useState<InvitationSummary | null>(null)
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
            if (e.details) {
                e.details.forEach(d => setError(d.field as FieldPath<NewEventForm>, { message: d.message }))
                if (e.details[0].field.startsWith("invitees"))
                    setStep(1)
                else if (e.details[0].field.startsWith("questions"))
                    setStep(2)
                else setStep(0)
            }

            else
                setError("root", { message: e.message || "אירעה שגיאה ביצירת האירוע" })
        }
    })

    const goNextStep = async () => {
        if (await trigger(CheckValidationFields[step]))
            setStep(step == 0 ? 1 : 2)
    }

    const onsubmit = (data: NewEventForm) => {
        if (step < 2) {
            goNextStep()
            return
        }
        const dataToSend: NewEventRequest = {
            ...convertEventForm(data),
            invitees: convertInvitees(data.invitees),
            questions: ConvertQuestionForm(data.questions)
        }
        mutate(dataToSend)
    }

    if (invitationSummary)
        return <CreatedEvent invitationSummary={invitationSummary} />


    return <>
        <div className="wiz-steps">
            <span className={step > 0 ? "wiz-num is-done" : "wiz-num is-current"}>{step > 0 ? "V" : "1"}</span>
            <p>פרטים</p>
            <div className={step > 0 ? "wiz-line is-done" : "wiz-line"}></div>
            <span className={step > 1 ? "wiz-num is-done" : step == 1 ? "wiz-num is-current" : "wiz-num"}>{step > 1 ? "V" : "2"}</span>
            <p>משתתפים</p>
            <div className={step > 1 ? "wiz-line is-done" : "wiz-line"}></div>
            <span className={step == 2 ? "wiz-num is-current" : "wiz-num"}>3</span>
            <p>שאלות הסקר</p>
        </div>

        <div className="page-head wiz-head">
            <h1>{TitlesForStep[step]}</h1>
            <p className="page-title-sub">{SentecesForStep[step]}</p>
        </div>

        <FormProvider {...methods}>
            <form className="new-event" onSubmit={handleSubmit(onsubmit)}>

                {step == 0 ? <NewEvent1 /> : step == 1 ? <NewEvent2 /> : <NewEvent3 />}

                {step == 1 && <div className="wiz-note">ההזמנות יישלחו רק בסיום האשף. אפשר להוסיף מוזמנים גם אחר כך, מדף המפגש.</div>}

                <div className="form-actions wiz-nav">

                    {errors.root && <div className="alert alert-error">{errors.root.message}</div>}
                    {step == 0 ? <Link to="/allEvents" className="btn btn-ghost">{CancelForStep[step]}</Link> :
                        <button type="button" onClick={() => { setStep(step == 2 ? 1 : 0) }} className="btn btn-ghost">{CancelForStep[step]}</button>}
                    {step == 2 ? <button key={"submit"} className="btn btn-primary btn-lg" type="submit" disabled={isPending}>{isPending ? <>יוצר... <Loading /></> : ButtonForStep[step]}</button> :
                        <button key={"goNext"} className="btn btn-primary btn-lg" type="button" onClick={goNextStep}>{ButtonForStep[step]}</button>}
                </div>
            </form>
        </FormProvider>
    </>

}

export default NewEventPage