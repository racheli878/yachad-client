import { useFieldArray } from "react-hook-form";
import QusetionCard from "./questionCard";
import { useQuery } from "@tanstack/react-query";
import { InitQustions } from "../../api/surveyApi";
import Loading from "../../components/loading";
import getApiError from "../../utils/getApiError";
import type { QuestionField } from "../../models/survey";


const NewEvent3 = () => {

    const { fields, append, remove } = useFieldArray({ name: "questions" });

    const { data, isError, error, refetch, isFetching } = useQuery({
        queryKey: ["initSurvey"],
        queryFn: InitQustions,
        enabled: false
    })
    const init=async()=>{
       const res=await refetch()
       if(!res.data)
        return
    const initial:QuestionField[]=res.data.questions.map(q=>({text:q.text,options:q.options.length>0?q.options.map(o=>
        ({text:o})):[{text:""},{text:""}]}))
        append(initial)
    }
    return <>
        <button className="btn btn-outline wiz-q-load" type="button" onClick={init} disabled={!!data}>{isFetching ? <>טוען... <Loading /></> : "טעינת שאלות מוכנות"}</button>
        {isError && <div className="alert alert-error">{getApiError(error).message}</div>}

        {fields.map((f, i) => <QusetionCard key={f.id} index={i} funcDel={() => remove(i)} />)}

        <button className="btn btn-dashed wiz-q-add" onClick={() => append({text: "",options: [{ text: "" }, { text: "" }]},
    {focusName: `questions.${fields.length}.text`})} type="button">+ הוספת שאלה</button>

    <div className="wiz-note wiz-note-warm">בסוף כל סקר יופיע שדה חופשי – כל משתתף יוכל לכתוב לך הערה. רק המארגנים רואים את ההערות.</div>

    </>
}

export default NewEvent3