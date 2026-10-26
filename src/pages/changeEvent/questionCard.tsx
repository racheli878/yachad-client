import { useFieldArray, useFormContext } from "react-hook-form"
import type { NewEventForm } from "../../models/event"
import { validateOptions } from "../../utils/contactTypes";

const QusetionCard = ({ index, funcDel }: { index: number, funcDel: () => void }) => {

    const { register, formState: { errors },control } = useFormContext<NewEventForm>()

    const { fields, append, remove } = useFieldArray({control, name: `questions.${index}.options`,rules:{validate:validateOptions} });


    return <div className="wiz-q">
        <div className="wiz-q-head">
            <span className="wiz-q-num">{index+1}</span>
            <input className="wiz-q-text" {...register(`questions.${index}.text`,{required:"יש להזין את נוסח השאלה"})} />
            {errors.questions?.[index]?.text&&<div className="field-error wiz-q-error">{errors.questions?.[index]?.text.message}</div>}
            <button className="icon-btn wiz-q-del" onClick={funcDel} type="button">delete</button>
        </div>
        {fields.map((o, i) => <div className="wiz-q-option" key={o.id}>
            <span className="wiz-q-box"></span>
            <input className="input" {...register(`questions.${index}.options.${i}.text`)} />
            <button className="icon-btn icon-remove" type="button" onClick={()=>remove(i)}>delete answer</button>
        </div>)}
        {errors.questions?.[index]?.options&&<div className="field-error wiz-q-error">{errors.questions?.[index].options.message}</div>}
        {errors.questions?.[index]?.options?.root&&<div className="field-error wiz-q-error">{errors.questions?.[index].options.root.message}</div>}
        <button className="wiz-q-add-option" type="button" onClick={()=>append({text:""})}>+ הוספת תשובה</button>
    </div>
}

export default QusetionCard
