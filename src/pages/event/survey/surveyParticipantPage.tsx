import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getMySurvey, saveSurveyParticipant } from "../../../api/surveyApi"
import Loading from "../../../components/loading"
import getApiError from "../../../utils/getApiError"
import { formatDate } from "../../../utils/formatDate"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import type { SurveyForm } from "../../../models/survey"

const SurveyParticipantPage = () => {

    const { eventId } = useParams()
    const id = Number(eventId)

    const { data, isError, error, isPending } = useQuery({
        queryKey: ["surveyParticipant", id],
        queryFn: () => getMySurvey(id)
    })
    const myOldAnswers=data?.questions.flatMap(q=>q.options.filter(o=>o.selectedByMe).map(o=>String(o.id)))


    const {register,handleSubmit,reset}=useForm<SurveyForm>({
        defaultValues:{
            selectedOptions:myOldAnswers,
            note:data?.myNote??""
        }
    })

    useEffect(() => {
    if (data) {
        reset({
            selectedOptions:myOldAnswers,
            note: data.myNote ?? ""
     });}}, [data, reset]);

     const queryClient=useQueryClient()
     const {mutate,isError:isErrorSave,isPending:isPendingSave,error:errorSave,isSuccess}=useMutation({
        mutationFn:saveSurveyParticipant,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["surveyParticipant",id]})
            queryClient.invalidateQueries({queryKey:["surveyOrganizer",id]})
        }
     })
     const onsubmit=(form:SurveyForm)=>{
        if(!data)
            return;
        mutate({id,data:{note:form.note,answers:data.questions.map(q=>({
            questionId:q.id,optionIds:q.options.filter(o=>form.selectedOptions.includes(String(o.id))).map(o=>o.id)
        }))}})
     }

    if (isPending)
        return <Loading />
    if (isError)
        return <div className="alert alert-error survey-load-error">{getApiError(error).message}</div>
    return <>
        <div className="survey-head">
            <div className="survey-intro">
                <h2 className="survey-title">עזרו לנו לתכנן</h2>
                <p className="survey-sub">אפשר לסמן כמה תשובות בכל שאלה, ולחזור ולשנות כל עוד הסקר פתוח.</p>
            </div>
            <div className="survey-status">
                {data.isOpen ? <span className="tag tag-solid survey-open">הסקר פתוח</span>:<span className="tag tag-solid survey-open">הסקר סגור</span>}
                {data.hasResponded&&data.mySubmittedAt && <div className="tag tag-scheduled survey-answered">ענית ב{formatDate(data.mySubmittedAt)} {data.isOpen && <span> · אפשר לעדכן </span>} </div>}
            </div>
        </div>

        <form className="survey-form" onSubmit={handleSubmit(onsubmit)}>
             <fieldset className="survey-fieldset" disabled={!data?.isOpen}>
            {data.questions.map(q=><div className="survey-q" key={q.id}>
                <h3 className="survey-q-title">{q.text}</h3>
                {q.options.map(o=>(
                    <label className="survey-option" key={o.id}>
                        <input className="survey-check" type="checkbox" value={String(o.id)}
                        {...register("selectedOptions")}/>
                        {o.text}
                    </label>
                ))}
            </div>)}
            <label className="survey-note">
                הערה למארגנים
                <p className="survey-note-hint">רק המארגנים יראו את ההערה. לא חובה</p>
            <textarea className="textarea survey-note-input" {...register("note")}/>
            </label>
</fieldset>
            {data.isOpen&&<button className="btn btn-primary survey-save" type="submit" disabled={isPendingSave}>{isPendingSave?<>שומר...<Loading/></>:"שמירת התשובות"}</button>}
            {isErrorSave&&<div className="alert alert-error survey-msg">{getApiError(errorSave).message}</div>}
            {isSuccess&&<div className="alert alert-success survey-msg">התשובות נשמרו בהצלחה!</div>}
        </form>
    </>
}

export default SurveyParticipantPage