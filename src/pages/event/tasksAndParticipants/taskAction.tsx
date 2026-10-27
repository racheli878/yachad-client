import { useMutation, useQueryClient } from "@tanstack/react-query"
import getApiError from "../../../utils/getApiError"
import Loading from "../../../components/loading"
import { useState } from "react"
import ConfirmModal from "../../../components/confirmModal"

const TaskAction = ({ eventId, taskId, text, func }: { eventId: number, taskId: number, text: string, func: (data: { eventId: number, taskId: number }) => Promise<unknown> }) => {


    const queryClient = useQueryClient()
    const { mutate, isError, error, isPending } = useMutation({
        mutationFn: func,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["event", eventId] })
        },
        onError: () => {
            queryClient.invalidateQueries({ queryKey: ["event", eventId] })
        }
    })
    const [askDelete,setAskDelete]=useState(false)

    const action = () => {
        if (text == "מחיקה") {
            setAskDelete(true)
        }
        else
            mutate({ eventId: eventId, taskId: taskId })
    }

    return <>
        <button className="btn task-btn" disabled={isPending} onClick={action}>{isPending && <Loading />}{text}</button>
        {askDelete&&<ConfirmModal onConfirm={()=>{mutate({ eventId: eventId, taskId: taskId }); setAskDelete(false)}} onCancel={()=>setAskDelete(false)}
            confirmText="מחיקה" text="למחוק את התפקיד?" title="מחיקת תפקיד"/>}
        {isError && <div className="alert alert-error task-error">{getApiError(error).message}</div>}
    </>

}

export default TaskAction