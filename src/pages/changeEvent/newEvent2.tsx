import { useFieldArray, useFormContext, useWatch } from "react-hook-form"
import { checkContactTypes } from "../../utils/contactTypes"
import { contactLabels } from "../../utils/labels"
import type { NewEventForm } from "../../models/event"

const NewEvent2 = () => {

    const { register, formState: { errors } } = useFormContext<NewEventForm>()

    const { fields, append, remove } = useFieldArray({ name: "invitees" });

    const invitees = useWatch({ name: "invitees" });

    return <>

        <div className="form-card invitees">
            {fields.map((f, i) => {
                const contactType = checkContactTypes(invitees[i]?.contact??"")
                return <div className="invitee-row" key={f.id}>
                    <p className="invitee-num">{i + 1}</p>
                    <input className="input" {...register(`invitees.${i}.contact`, {
                        validate: (value) => {
                            if (checkContactTypes(value) == "tag-invalid")
                                return "יש להזין כתובת מייל או מספר טלפון תקין"
                            return true
                        }
                    })} />
                    {errors.invitees?.[i]?.contact && <div className="field-error invitee-error">{errors.invitees?.[i].contact?.message}</div>}
                    {contactType != "" && <span className={`tag ${contactType}`}>{contactLabels[contactType]}</span>}
                    <button className="icon-btn icon-remove" type="button" onClick={() => remove(i)}></button>
                </div>
            })}

            <button className="btn btn-dashed add-row" type="button" onClick={() => append({ contact: "" })}> +  הוספת משתתף</button>
        </div>

        <div className="wiz-note">ההזמנות יישלחו רק בסיום האשף. אפשר להוסיף מוזמנים גם אחר כך, מדף המפגש.</div>

    </>
}

export default NewEvent2