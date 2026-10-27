import { useState } from "react"
import type { Expense, LittleExpense } from "../../../models/expenses"
import firstLettersOfName from "../../../utils/firstLettersOfName"
import { FormProvider, useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addExpense, deleteExpense } from "../../../api/expenses"
import Loading from "../../../components/loading"
import ExpenseFields from "./expenseFields"
import EditExpense from "./editExpens"
import getApiError from "../../../utils/getApiError"
import ConfirmModal from "../../../components/confirmModal"

const ExpensesDetails = ({ expenses, id }: { expenses: Expense[], id: number }) => {

    const methods = useForm<LittleExpense>({ mode: "onTouched" })
    const { handleSubmit, reset } = methods
    const queryClient = useQueryClient()
    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: addExpense,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["expenses", id] })
            queryClient.invalidateQueries({ queryKey: ["calculations", id] })
            reset()
        },
    })

    const { mutate: deleteExp, isPending: pendingDelExp, isError: isErrorDelExp, error: errorDelExp, variables } = useMutation({
        mutationFn: deleteExpense,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["expenses", id] })
            queryClient.invalidateQueries({ queryKey: ["calculations", id] })
        },
    })

    const onsubmit = (data: LittleExpense) => {
        mutate({ id, data })
    }
    const [askDelete,setAskDelete]=useState<number|null>(null)
   
    const [edit, setEdit] = useState(-1)

    return <div className="card exp-list-card">
        <h3 className="exp-list-title">ההוצאות</h3>

        <FormProvider {...methods}>
            <form className="exp-form" onSubmit={handleSubmit(onsubmit)}>
                <ExpenseFields />
                <button className="btn btn-dark exp-add-btn" type="submit" disabled={isPending}>{isPending ? <>מוסיפים...<Loading /></> : "הוספה"}</button>
                {isError && <div className="alert alert-error">{getApiError(error).message}</div>}
            </form>
        </FormProvider>

        <ul className="exp-list">
            {expenses.map(e => <li className="exp-row" key={e.id}>
                <div className="exp-row-main">
                    <span className="avatar exp-avatar">{firstLettersOfName(e.paidBy.fullName)}</span>
                    <div className="exp-row-text">
                        <p className="exp-reason">{e.reason}</p>
                        <p className="exp-who">{e.paidBy.fullName} {e.isMine && " (אני) "}</p>
                    </div>
                </div>
                <div className="exp-row-side">
                    {e.id != edit ? <>
                        <p className="exp-amount">{e.amount} ₪</p>
                        {e.isMine && <button className="icon-btn exp-edit-btn" aria-label="עריכת ההוצאה" onClick={() => setEdit(e.id)}>edit</button>}
                        {e.isMine && <button className="icon-btn exp-del-btn" aria-label="מחיקת ההוצאה" onClick={() => setAskDelete(e.id)} disabled={pendingDelExp}>{pendingDelExp && variables.expenseId == e.id ? <>מוחק...<Loading /></> : "מחיקה"}</button>}
                        
                        {isErrorDelExp && variables.expenseId == e.id && <div className="alert alert-error exp-row-error">{getApiError(errorDelExp).message}</div>}
                    </> : <>
                        <EditExpense eventId={id} expense={e} finish={() => setEdit(-1)} />
                    </>}
                </div>
            </li>)}
        </ul>
        {askDelete&&<ConfirmModal onConfirm={()=> {deleteExp({ eventId: id, expenseId: askDelete }); setAskDelete(null)}} onCancel={()=>setAskDelete(null)}
                           text="למחוק את ההוצאה?" confirmText="מחיקה" title="מחיקת הוצאה"/>}
    </div>
}

export default ExpensesDetails
