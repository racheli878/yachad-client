import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTask } from "../../../api/tasks"
import { useForm } from "react-hook-form"
import getApiError from "../../../utils/getApiError"
import Loading from "../../../components/loading"

const CreateTask = ({ id }: { id: number }) => {

    const { register, handleSubmit, formState: { errors }, setError, reset } = useForm<{ description: string }>({ mode: "onSubmit" })
    const queryClient = useQueryClient()
    const { mutate, isError, error, isPending } = useMutation({
        mutationFn: createTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["event", id] })
            reset()
        },
        onError: (error) => {
            setError("description", { message: getApiError(error).message })
            queryClient.invalidateQueries({ queryKey: ["event", id] })
        }
    })

    const onsubmit = ({ description }: { description: string }) => {
        mutate({ eventId: id, description: description })
    }

    return <div className="task-create">
        <form className="task-create-form" onSubmit={handleSubmit(onsubmit)}>

            <input className="input task-input" placeholder="תפקיד חדש, למשל: להביא רמקול" {...register("description", {
                required: "יש להזין תאור לתפקיד", minLength: {
                    value: 2,
                    message: "תיאור התפקיד חייב לכלול לפחות 2 תוים"
                },
                maxLength: {
                    value: 200,
                    message: "תיאור התפקיד לא יכול לכלול מעל 200 תוים"
                }
            })} />
            {errors.description && <div className="field-error">{errors.description.message}</div>}
            <button className="btn btn-dark task-create-btn" type="submit" disabled={isPending}>{isPending ? <>מוסיף...<Loading /></> : "הוספה"}</button>
        </form>
        {isError && <div className="alert alert-error">{getApiError(error).message}</div>}
    </div>
}

export default CreateTask