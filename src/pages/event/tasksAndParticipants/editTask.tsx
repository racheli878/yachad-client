import { useForm } from "react-hook-form";
import type { Task } from "../../../models/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editTask } from "../../../api/tasks";
import Loading from "../../../components/loading";
import getApiError from "../../../utils/getApiError";

const EditTask = ({ eventId, task, finishEdit }: { eventId: number, task: Task, finishEdit: () => void }) => {

    const { register, handleSubmit, formState: { errors } } = useForm<{ description: string }>({ mode: "onTouched" })
    const queryClient = useQueryClient()
    const { mutate, isPending: isEditting,isError,error } = useMutation({
        mutationFn: editTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["event", eventId] })
            finishEdit()
        },
        onError: () => {
            queryClient.invalidateQueries({ queryKey: ["event", eventId] })
        }
    })

    const onsubmit = (description: { description: string }) => {
        mutate({ eventId: eventId, taskId: task.id, data: description })
    }


    return <>
        <form className="task-edit-form" onSubmit={handleSubmit(onsubmit)}>

            <input className="input task-input" {...register("description", {
                required: "יש להזין תיאור",
                minLength: {
                    value: 2, message: "תיאור התפקיד חייב לכלול לפחות 2 תוים"
                },
                maxLength: {
                    value: 200,
                    message: "תיאור התפקיד לא יכול לכלול מעל 200 תוים"
                }
            })}
                defaultValue={task.description}></input>
            {errors.description && <div className="field-error">{errors.description.message}</div>}

            <button className="btn btn-primary btn-sm" type="submit" disabled={isEditting}>{isEditting ? <>מעדכן...<Loading /></> : "אישור"}</button>
            <button className="btn btn-ghost btn-sm" type="button" onClick={finishEdit}>ביטול</button>
        </form>

        {isError && <div className="alert alert-error task-error">{getApiError(error).message}</div>}
    </>
}

export default EditTask