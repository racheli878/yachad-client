import { useMutation, useQueryClient } from "@tanstack/react-query"
import getApiError from "../../../utils/getApiError"
import Loading from "../../../components/loading"

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

    const action = () => {
        if (text == "מחיקה") {
            if (confirm("למחוק את התפקיד?"))
                mutate({ eventId: eventId, taskId: taskId })
        }
        else
            mutate({ eventId: eventId, taskId: taskId })
    }

    return <>
        <button className="btn task-btn" disabled={isPending} onClick={action}>{isPending && <Loading />}{text}</button>
        {isError && <div className="alert alert-error task-error">{getApiError(error).message}</div>}
    </>

}

export default TaskAction