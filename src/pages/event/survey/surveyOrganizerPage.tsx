import { useQuery } from "@tanstack/react-query"
import { getSurveyResults } from "../../../api/surveyApi"
import { Link, useParams } from "react-router-dom"
import Loading from "../../../components/loading"
import getApiError from "../../../utils/getApiError"
import type React from "react"

const SurveyOrganizerPage = () => {
    const { eventId } = useParams()
    const id = Number(eventId)

    const { data, isError, error, isPending } = useQuery({
        queryKey: ["surveyOrganizer", id],
        queryFn: () => getSurveyResults(id)
    })
    if (isPending)
        return <Loading />
    if (isError)
        return <div className="alert alert-error survey-load-error">{getApiError(error).message}</div>

    return <>
    <div className="survey-res-actions">
        <Link to={`/event/${id}/survey/add`} className="btn btn-outline survey-add-q">+ הוספת שאלות</Link>
        <Link to={`/event/${id}/edit`} className="btn btn-primary survey-set-details">קביעת פרטים לפי הרוב</Link>
    </div>
        <div className="survey-res-top">
            <div className="card survey-rate">
                <span className="survey-rate-num" style={{"--pct":data.responseRate} as React.CSSProperties}>{data.responseRate}%</span>
                <h3 className="survey-rate-title">ענו {data.respondentsCount} מתוך {data.participantsCount}</h3>
                {data.notResponded.length != 0 && <p className="survey-rate-missing">עוד לא ענו: {data.notResponded.map(u => u.fullName).join(", ")}</p>}
            </div>
            <div className="survey-top">
                <h3 className="survey-top-title">מה הרוב מעדיף</h3>
                <ul className="survey-top-list">
                    {data.questions.map(q => {
                        const topOptions = q.options.filter(o => o.isTop)
                        if (topOptions.length === 0 || q.respondentsCount === 0)
                            return null
                        return <li className="survey-top-item" key={q.id}>
                            <span className="survey-top-chip">{q.text}: {topOptions.map(o => o.text).join(", ")} · {topOptions[0].percentage}%</span>
                        </li>
                    })}
                </ul>
            </div>
        </div>

        <div className="survey-res-grid">
            {data.questions.map(q => <div className="card survey-res-q" key={q.id}>
                <h3 className="survey-res-q-title">{q.text}</h3>
                <p className="survey-res-q-sub">{q.respondentsCount} ענו · אפשר לבחור כמה</p>
                <ul className="survey-res-options">
                    {q.options.map(o => <li className="survey-res-opt" key={o.id}>
                        <div className="survey-res-opt-head">
                            <h4 className="survey-res-opt-text">{o.text} {o.isTop && "★ מוביל"}</h4>
                            <p className="survey-res-opt-votes">{o.votes} קולות · {o.percentage}%</p>
                        </div>
                        {/* פס התקדמות */}
                        <div data-top={o.isTop} className="survey-res-fill" style={{width:`${o.percentage}%`}}></div>
                        {o.voters.length == 0 ? <p className="survey-res-voters">אף אחד עדיין</p> : <p className="survey-res-voters">{o.voters.map(u => u.fullName).join(", ")}</p>}
                    </li>)}
                </ul>
            </div>)}
        </div>

        <div className="card survey-table-card">
            <h3 className="survey-table-title">מי ענה מה</h3>
            <div className="survey-table-wrap">
                <table className="survey-table">
                    <thead>
                        <tr>
                            <th>שם</th>
                            {data.questions.map(q => <th key={q.id}>{q.text}</th>)}
                            <th>הערה למארגנים</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.responses.map(r => <tr key={r.user.id}>
                            <td>{r.user.fullName}</td>
                            {data.questions.map(q=>{
                                const answer=r.answers.find(a=>a.questionId==q.id);
                                return <td key={q.id}>
                                    {answer?.optionTexts.length?answer.optionTexts.join(", "):"—"}
                                </td>
                            })}
                            <td>{r.note ? r.note : "—"}</td>
                        </tr>)}
                        {data.notResponded.map(n => <tr key={n.id}>
                            <td>{n.fullName}</td>
                            <td colSpan={data.questions.length + 1}> עוד לא נענה</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    </>
}

export default SurveyOrganizerPage