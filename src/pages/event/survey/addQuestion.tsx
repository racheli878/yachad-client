import { Link, useNavigate, useParams } from "react-router-dom"
import { addQuestion, getSurveyResults } from "../../../api/surveyApi"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Loading from "../../../components/loading"
import getApiError from "../../../utils/getApiError"
import NewEvent3 from "../../changeEvent/newEvent3"
import { FormProvider, useForm } from "react-hook-form"
import { type NewEventForm } from "../../../models/event"
import { ConvertQuestionForm } from "../../../utils/convertEventForm"
import { useState } from "react"

const AddQuestion = () => {
    const { eventId } = useParams()
    const id = Number(eventId)
    const { data, isError, error, isPending } = useQuery({
        queryKey: ["surveyOrganizer", id],
        queryFn: () => getSurveyResults(id)
    })
    const methods = useForm<Pick<NewEventForm, "questions">>({
        mode: "onTouched",
        defaultValues: {
            questions: [{ text: "", options: [{ text: "" }, { text: "" }] }]
        }
    })
    const { handleSubmit } = methods
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { mutateAsync, isError: isErrorSave, error: errorSave } = useMutation({
        mutationFn: addQuestion,

    })
    const [isSaving, setIsSaving] = useState(false)
    const onsubmit = async (form: Pick<NewEventForm, "questions">) => {
        if (form.questions.length === 0) {
            methods.setError("root", { message: "יש להוסיף לפחות שאלה אחת" })
            return
        }
        const newData = ConvertQuestionForm(form.questions)
        setIsSaving(true)
        let i = 0
        try {
            for (i = 0; i < newData.length; i++)
                await mutateAsync({ id, data: newData[i] })

            await Promise.all([queryClient.invalidateQueries({ queryKey: ["surveyOrganizer", id] }), queryClient.invalidateQueries({ queryKey: ["surveyParticipant", id] })])
            navigate(`/event/${id}/survey`, { state: { showRes: true } })
        }
        catch (e) {
            if (i > 0) {
                methods.setValue("questions", form.questions.slice(i))
                queryClient.invalidateQueries({ queryKey: ["surveyOrganizer", id] })
                queryClient.invalidateQueries({ queryKey: ["surveyParticipant", id] })
            }
        }
        finally {
            setIsSaving(false)
        }
    }
    if (isPending)
        return <Loading />
    if (isError)
        return <div className="alert alert-error survey-load-error">{getApiError(error).message}</div>

    return (
        <div className="addq-page">
            <div className="addq-main">
          
                <div className="addq-head">
                    <h1 className="addq-title">הוספת שאלות</h1>
                    <button className="addq-back" onClick={() => navigate(`/event/${id}/survey`, { state: { showRes: true } })}>חזרה לתוצאות</button>
                </div>
                <div>{data.isOpen ? <FormProvider {...methods}>
                    <form className="addq-form" onSubmit={handleSubmit(onsubmit)}>
                        <NewEvent3 numFrom={data.questions.length + 1} existingTexts={data.questions.map(q => q.text)} />
                        <div className="form-actions wiz-nav">
                            {isErrorSave && <div className="alert alert-error">{getApiError(errorSave).message}</div>}
                            <Link className="btn btn-ghost" to={`/event/${id}/survey`}>ביטול</Link>
                            <button className="btn btn-primary btn-lg" type="submit" disabled={isSaving}>{isSaving ? <>שומר...<Loading /></> : "שמירת השאלות"}</button>
                        </div>
                        {methods.formState.errors.root&&<div className="alert alert-error">{methods.formState.errors.root.message}</div>}
                    </form>
                </FormProvider> : <div className="alert alert-info addq-closed">המפגש כבר לא בתכנון ולכן אי אפשר להוסיף שאלות ולענות על הסקר</div>}
                </div>
            </div>
      <div className="addq-head">
                    <h1 className="addq-title">שאלות הסקר</h1>
                </div>
                <div className="addq-old-list">{
                    data.questions.map((q, i) => <div className="addq-old" key={q.id}>
                        <h3 className="addq-old-text">{i + 1}. {q.text}</h3>
                        <div className="addq-old-lock">{q.respondentsCount} ענו · נעול לעריכה</div>
                        <div className="addq-old-options">
                            {q.options.map(o => <span key={o.id}>{o.text}</span>)}
                        </div>
                    </div>)
                }
                </div>
            <div className="addq-aside">
                <div className="addq-tip addq-tip-info">
                    <h2>מה קורה אחרי ההוספה?</h2>
                    <p>השאלה מופיעה מיד בסוף הסקר אצל כל המשתתפים. מי שכבר ענה יראה אותה כשאלה שעוד לא ענה עליה, ויוכל להשלים.</p>
                </div>
                <div className="addq-tip">
                    <h2>למה אי אפשר לערוך שאלה קיימת?</h2>
                    <p>כבר יש עליה תשובות. שינוי הנוסח היה משבש את התוצאות, לכן אפשר רק להוסיף שאלות חדשות.</p>
                </div>
                <div className="addq-tip addq-tip-warm">
                    <h2>המפגש כבר "נקבע"?</h2>
                    <p>הוספת שאלות אפשרית רק כשהמפגש "בתכנון". כדי לפתוח את הסקר שוב, החזירו את הסטטוס ל"בתכנון" במסך העריכה.</p>
                    <Link to={`/event/${id}/edit`}>למסך העריכה</Link>
                </div>
            </div>
        </div>)
}

export default AddQuestion