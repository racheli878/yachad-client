import { useFieldArray } from "react-hook-form";
import QusetionCard from "./questionCard";
import { useQuery } from "@tanstack/react-query";
import { InitQustions } from "../../api/surveyApi";
import Loading from "../../components/loading";
import getApiError from "../../utils/getApiError";
import type { NewQuestion, QuestionField } from "../../models/survey";
import { useState } from "react";


const NewEvent3 = ({ existingTexts,numFrom }: { existingTexts?: string[] ,numFrom?:number}) => {

    const [loaded, setLoaded] = useState(false)
    const { fields, append, remove } = useFieldArray({ name: "questions" });

    const { data, isError, error, refetch, isFetching } = useQuery({
        queryKey: ["initSurvey"],
        queryFn: InitQustions,
        enabled: existingTexts !== undefined
    })

    const getMissing = (questions: NewQuestion[]) =>
    questions.filter(q =>
        !existingTexts?.some(text => text.trim() === q.text.trim())
    );

    const init = async () => {
        const res = await refetch()
        if (!res.data)
            return
        const missing = getMissing(res.data.questions)

        const initial: QuestionField[] = missing.map(q => ({
            text: q.text, options: q.options.length > 0 ? q.options.map(o =>
                ({ text: o })) : [{ text: "" }, { text: "" }]
        }))
        if (initial.length > 0)
            append(initial)
        setLoaded(true)
    }
    return <>
        {!loaded&&(existingTexts===undefined||!data||getMissing(data.questions).length>0) && <button className="btn btn-outline wiz-q-load" type="button" onClick={init} disabled={isFetching}>{isFetching ? <>טוען... <Loading /></> : "טעינת שאלות מוכנות"}</button>}
        {isError && <div className="alert alert-error">{getApiError(error).message}</div>}

        {fields.map((f, i) => <QusetionCard key={f.id} index={i} funcDel={() => remove(i)} numFrom={numFrom} />)}

        <button className="btn btn-dashed wiz-q-add" onClick={() => append({ text: "", options: [{ text: "" }, { text: "" }] },
            { focusName: `questions.${fields.length}.text` })} type="button">+ הוספת שאלה</button>


    </>
}

export default NewEvent3