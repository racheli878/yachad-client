import { useMutation, useQueryClient } from "@tanstack/react-query"
import { editExpense } from "../../../api/expenses"
import { FormProvider, useForm } from "react-hook-form"
import type { Expense, LittleExpense } from "../../../models/expenses"
import Loading from "../../../components/loading"
import getApiError from "../../../utils/getApiError"
import ExpenseFields from "./expenseFields"

const EditExpense = ({ eventId, expense,finish }: { eventId: number, expense: Expense,finish:()=>void }) => {

    const methods = useForm<LittleExpense>({
        mode: "onBlur",
        defaultValues: {
            amount: expense.amount,
            reason: expense.reason
        }
    })
    const { handleSubmit} = methods
    const queryClient = useQueryClient()
    const { mutate, isPending ,isError,error} = useMutation({
        mutationFn: editExpense,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["expenses",eventId] })
            finish()
        }
    })

    const onsubmit = (data: LittleExpense) => {
        mutate({eventId:eventId,expenseId:expense.id,data:data})
    }

    return <>
        <FormProvider {...methods}>
            <form className="exp-form exp-edit-form" onSubmit={handleSubmit(onsubmit)}>
                <ExpenseFields/>
                <button className="btn btn-primary btn-sm" disabled={isPending}>{isPending?<>מעדכן...<Loading/></>:"שמירה"}</button>
                <button className="btn btn-ghost btn-sm" type="button" onClick={finish}>ביטול</button>
                {isError&&<div className="alert alert-error">{getApiError(error).message}</div>}
            </form>
        </FormProvider>
    </>
}

export default EditExpense