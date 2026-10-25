import { useContext, useState } from "react"
import { CuserContext } from "../../../auth/cuserContext"
import type { Expense, LittleExpense } from "../../../models/expenses"
import firstLettersOfName from "../../../utils/firstLettersOfName"
import { FormProvider, useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addExpense } from "../../../api/expenses"
import Loading from "../../../components/loading"
import ExpenseFields from "./expenseFields"
import EditExpense from "./editExpens"
import getApiError from "../../../utils/getApiError"

const ExpensesDetails = ({ expenses, id }: { expenses: Expense[], id: number }) => {

    const  methods= useForm<LittleExpense>({ mode: "onBlur" })
    const { handleSubmit, reset }=methods
    const queryClient = useQueryClient()
    const { mutate, isPending,isError,error } = useMutation({
        mutationFn: addExpense,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["expenses", id] })
            reset()
        },
    })

    const onsubmit = (data: LittleExpense) => {
        mutate({ id, data })
    }

    const [edit,setEdit]=useState(-1)

    return <div>
        <h3>ההוצאות</h3>

        <FormProvider { ...methods}>
            <form onSubmit={handleSubmit(onsubmit)}>
                <ExpenseFields/>
            <button type="submit" disabled={isPending}>{isPending ? <>מוסיפים...<Loading /></> : "הוספה"}</button>
            {isError&&<div>{getApiError(error).message}</div>}
            </form>
        </FormProvider>

        <ul>
            {expenses.map(e => <li key={e.id}>
                <div>
                    <span>{firstLettersOfName(e.paidBy.fullName)}</span>
                    <div>
                        <p>{e.reason}</p>
                        <p>{e.paidBy.fullName} {e.isMine && " (אני) "}</p>
                    </div>
                </div>

                <div>
                    {e.id!=edit?<>
                    <p>{e.amount} ₪</p>
                    {e.isMine && <button onClick={()=>setEdit(e.id)}>edit</button>}
                    </>:<>
                    <EditExpense eventId={id} expense={e} finish={()=>setEdit(-1)}/>
                    </>}
                </div>
            </li>)}
        </ul>
    </div>
}

export default ExpensesDetails