import { useQuery } from "@tanstack/react-query"
import { getExpenses } from "../../../api/expenses"
import getApiError from "../../../utils/getApiError"
import Loading from "../../../components/loading"
import { useParams } from "react-router-dom"
import ExpensesDetails from "./expensesDetails"
import firstLettersOfName from "../../../utils/firstLettersOfName"

const Expenses = () => {

    const { eventId } = useParams()
    const id = Number(eventId)

    const { data, isError, error, isPending } = useQuery({
        queryKey: ["expenses", id],
        queryFn: () => getExpenses(id)
    })

    if (isPending)
        return <Loading />
    if (isError)
        return <div>{getApiError(error).message}</div>

    return <>
        {/* top part */}
        <div>
            <p>סך ההוצאות</p>
            <h2>{data.total} ₪</h2>
            {data.budget!=null && <>
                <p>מתוך תקציב {data.budget} ₪</p>
                {data.isOverBudget?<div>שימו לב! חריגה מהתקציב</div>:
                 <div>
                    <p>נשארו {data.remaining} ₪</p>
                    <p>{data.percentUsed}% מהתקציב</p>
                </div> }
            </>}
            {/* פס התקדמות */}
            <div></div>
            <div>
                {data.byParticipant.map(p => <div key={p.userId}>
                    <span>{firstLettersOfName(p.fullName)}</span>
                    <p>{p.fullName} · {p.total} ₪</p>
                </div>)}
            </div>
            {/* end top part */}

                    <ExpensesDetails expenses={data.expenses} id={id}/>

        </div>
    </>
}
export default Expenses