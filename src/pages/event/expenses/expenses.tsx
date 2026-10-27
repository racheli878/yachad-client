import { useQuery } from "@tanstack/react-query"
import { getExpenses } from "../../../api/expenses"
import getApiError from "../../../utils/getApiError"
import Loading from "../../../components/loading"
import { useParams } from "react-router-dom"
import ExpensesDetails from "./expensesDetails"
import firstLettersOfName from "../../../utils/firstLettersOfName"
import Calculations from "./Calculations"

const Expenses = () => {

    const { eventId } = useParams()
    const id = Number(eventId)

    const { data, isError, error, isPending } = useQuery({
        queryKey: ["expenses", id],
        queryFn: () => getExpenses(id)
    })

    const denominator = data?.budget && !data.isOverBudget ? data.budget : data?.total ?? 1

    if (isPending)
        return <Loading />
    if (isError)
        return <div className="alert alert-error page-error-inline">{getApiError(error).message}</div>

    return <>
        {/* top part */}
        <div className="container page expenses-page">
            <p className="exp-sum-label">סך ההוצאות</p>
            <h2 className="exp-sum-total">{data.total} ₪</h2>
            {data.budget != null && <>
                <p className="exp-sum-budget">מתוך תקציב {data.budget} ₪</p>
                {data.isOverBudget ? <div className="exp-sum-side exp-over">שימו לב! חריגה מהתקציב</div> :
                    <div className="exp-sum-side">
                        <p className="exp-remaining">נשארו {data.remaining} ₪</p>
                        <p className="exp-percent">{data.percentUsed}% מהתקציב</p>
                    </div>}
            </>}
            <div className="bar exp-bar">
                {data.byParticipant.map(p => <div key={p.userId} className="bar-fill" style={{ width: `${p.total == 0 ? 0 : p.total / denominator * 100}%` }}></div>)}
            </div>
            {!data.expenses.length && <div className="exp-empty">עדיין אין הוצאות</div>}
            <div className="exp-legend">
                {data.byParticipant.map(p => <div className="exp-legend-item" key={p.userId}>
                    <span className="exp-legend-dot">{firstLettersOfName(p.fullName)}</span>
                    <p>{p.fullName} · {p.total} ₪</p>
                </div>)}
            </div>
            <ExpensesDetails expenses={data.expenses} id={id} />
            <Calculations />
        </div>
    </>
}
export default Expenses