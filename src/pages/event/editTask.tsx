import { useForm } from "react-hook-form";
import type { Task } from "../../models/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editTask } from "../../api/event";
import Loading from "../../components/loading";
import { useState } from "react";
import getApiError from "../../utils/getApiError";

const EditTask = ({ eventId, task, finishEdit }: { eventId: number, task: Task, finishEdit: () => void }) => {

    const [err, setErr] = useState("")
    const { register, handleSubmit, formState: { errors } } = useForm<{ description: string }>({ mode: "onBlur" })
    const queryClient = useQueryClient()
    const { mutate, isPending: isEditting } = useMutation({
        mutationFn: editTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["event", eventId] })
            finishEdit()
        },
        onError: (e) => {
            setErr(getApiError(e).message)
            queryClient.invalidateQueries({ queryKey: ["event", eventId] })
        }
    })

    const onsubmit = (description: { description: string }) => {
        mutate({ eventId: eventId, taskId: task.id, data: description })
    }


    return <>
        <form onSubmit={handleSubmit(onsubmit)}>

            <input {...register("description", {
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
            {errors.description && <div>{errors.description.message}</div>}

            <button type="submit" disabled={isEditting}>{isEditting ? <>מעדכן...<Loading /></> : "אישור"}</button>
            <button type="button" onClick={finishEdit}>ביטול</button>
        </form>

        {err && <div>{err}</div>}
    </>
}

export default EditTask