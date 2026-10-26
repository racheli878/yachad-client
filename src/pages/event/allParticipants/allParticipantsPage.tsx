import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Participants from "../tasks and participants/participants"
import { Link, useParams } from "react-router-dom"
import { getEvent } from "../../../api/eventsApi"
import Loading from "../../../components/loading"
import getApiError from "../../../utils/getApiError"
import { FormProvider, useForm } from "react-hook-form"
import { type InviteesForm } from "../../../models/event"
import NewEvent2 from "../../changeEvent/newEvent2"
import { addInvitation } from "../../../api/invitationsApi"
import { convertInvitees } from "../../../utils/convertEventForm"
import { useState } from "react"
import type { AddInvitationsResponse } from "../../../models/invitation"
import InvitationList from "./invitationList"

const AllParticipantsPage = () => {
    const { eventId } = useParams()
    const id = Number(eventId)

    const [summaryAdd,setSummaryAdd]=useState<AddInvitationsResponse | null>(null)
    const { data, isError, error, isPending } = useQuery({
        queryKey: ["event", id],
        queryFn: () => getEvent(id)
    })
    const methods = useForm<InviteesForm>({
        defaultValues: { invitees: [{ contact: "" }] }
    })
const queryClient=useQueryClient()
    const { mutate, isError: isErrorAdd, error: errorAdd, isPending: isPendingAdd } = useMutation({
        mutationFn: addInvitation,
        onSuccess:(res)=>{
            queryClient.invalidateQueries({queryKey:["invitations",id]})
            methods.reset()
            setSummaryAdd(res)
        }
    })

    const onsubmit = (data: InviteesForm) => {
        mutate({id,invitees:convertInvitees(data.invitees)})
    }
    if (isPending)
        return <Loading />

    if (isError)
        return <div className="page-error">
            <p className="page-error-msg">{getApiError(error).message}</p>
            <Link className="btn btn-ghost" to="/allEvents">חזרה לכל האירועים</Link>
        </div>




    return <div className="container page event-body parts-page">
        <div className="parts-section">
            <FormProvider {...methods}>
                <form className="card parts-invite" onSubmit={methods.handleSubmit(onsubmit)}>
                    <NewEvent2 />
                    <button className="btn btn-primary parts-send" disabled={isPendingAdd} type="submit">{isPendingAdd ? <>שולח...<Loading /></> : "שליחת הזמנות"}</button>
                    {summaryAdd!=null&&<div className={summaryAdd.skippedCount>0?"parts-summary parts-summary-warn":"parts-summary"}>נשלחו {summaryAdd.createdCount} הזמנות {summaryAdd.skippedCount>0&&<span className="parts-skipped"> · דולגו {summaryAdd.skippedCount}: {
                        summaryAdd.skipped.map((s,i)=><span className="parts-skip-item" key={i}>{s.email?s.email:s.phone} - {s.message}</span>)
                        }</span>}
                        </div>}
                    {isErrorAdd && <div className="alert alert-error parts-error">{getApiError(errorAdd).message}</div>}
                </form>
            </FormProvider>
            <InvitationList/>
        </div>
        <Participants participants={data.participants} organizer={true} />
    </div>
}

export default AllParticipantsPage