import { useFieldArray, useFormContext, useWatch } from "react-hook-form"
import { checkContactTypes } from "../../utils/contactTypes"
import { contactLabels } from "../../utils/labels"
import type { InviteesForm } from "../../models/event"

const NewEvent2 = () => {

    const { register, formState: { errors } } = useFormContext<InviteesForm>()

    const { fields, append, remove } = useFieldArray<InviteesForm>({ name: "invitees" });

    const invitees = useWatch<InviteesForm, "invitees">({name: "invitees"});

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


    </>
}

export default NewEvent2