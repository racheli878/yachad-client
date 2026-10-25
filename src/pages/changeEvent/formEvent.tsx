import { useFormContext } from "react-hook-form"
import type { EventForm } from "../../models/event"
import { activityTypes, categories } from "../../models/eventSelections"
import { activityTypeLabels, categoryLabels } from "../../utils/labels"

const FormEvent = () => {

    const { register, formState: { errors } } = useFormContext<EventForm>()
    return <div className="form-card grid-form">
        <div className="full">
            <label className="field">שם האירוע*
                <input className="input input-title" type="text"
                    {...register("title", {
                        required: "יש להזין שם אירוע",
                        minLength: {
                            value: 2,
                            message: "שם האירוע חייב לכלול לפחות 2 תוים"
                        },
                        maxLength: {
                            value: 100,
                            message: "שם האירוע לא יכול לכלול מעל 100 תוים"
                        }
                    })} />
            </label>
            {errors.title && <div className="field-error">{errors.title.message}</div>}
        </div>
        <div>
            <label className="field">קטגוריה
                <select className="select" {...register("category")}>
                    {categories.map(c => <option key={c} value={c}>{categoryLabels[c]}</option>)}
                </select>
            </label>
            {errors.category && <div className="field-error">{errors.category.message}</div>}
        </div>
        <div>
            <label className="field">פעילות
                <select className="select" {...register("activityType")}>
                    {activityTypes.map(a => <option key={a} value={a}>{activityTypeLabels[a]}</option>)}
                </select>
            </label>
            {errors.activityType && <div className="field-error">{errors.activityType.message}</div>}
        </div>
        <div>
            <label className="field">תאריך ושעה
                <span className="field-hint">רשות, אפשר לקבוע אחר כך</span>
                <input className="input optional" type="datetime-local"
                    {...register("eventDate")} />
            </label>
        </div>
        <div>
            <label className="field">מקום
                <span className="field-hint">רשות, אפשר לקבוע אחר כך</span>
                <input className="input optional" type="text"
                    {...register("location", { maxLength: { value: 200, message: "מיקום יכול לכלול עד 200 תווים" } })} />
            </label>
            {errors.location && <div className="field-error">{errors.location.message}</div>}
        </div>
        <div>
            <label className="field">מה אוכלים
                <input className="input" type="text"
                    {...register("food", { maxLength: { value: 500, message: "תאור האוכל לא יכול לכלול מעל 500 תווים" } })}
                /> </label>
            {errors.food && <div className="field-error">{errors.food.message}</div>}
        </div>
        <div>
            <label className="field">תקציב משוער(₪)
                <input className="input" type="number"
                    {...register("budget", {
                        setValueAs: value=>{value===""?undefined:Number(value)},
                        min: {
                            value: 0,
                            message: "תקציב לא יכול להיות שלילי"
                        },
                        max: {
                            value: 1000000,
                            message: "התקציב לא יכול לחרוג ממליון שקלים"
                        }
                    })} />
            </label>
            {errors.budget && <div className="field-error">{errors.budget.message}</div>}
        </div>
        <div className="full">
            <label className="field">תיאור
                <textarea className="textarea" {...register("description", { maxLength: { value: 1000, message: "תיאור האירוע לא יכול לכלול מעל 1000 תווים" } })} />
            </label>
            {errors.description && <div className="field-error">{errors.description.message}</div>}
        </div>
    </div>

}

export default FormEvent