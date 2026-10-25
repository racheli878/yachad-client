import { useFormContext } from "react-hook-form"
import type { LittleExpense } from "../../../models/expenses"

const ExpenseFields = () => {

    const { register, formState: { errors } } = useFormContext<LittleExpense>()

    return <div className="form-card grid-form">
        <div>
            <label>
                על מה שילמת?
                <input {...register("reason", {
                    required: "יש להזין סיבה להוצאה",
                    minLength: {
                        value: 2, message: "תיאור ההוצאה חייב לכלול לפחות 2 תוים"
                    },
                    maxLength: {
                        value: 200, message: "תיאור ההוצאה לא יכול לכלול יותר מ 200 תוים"
                    }
                },
                )} />
            </label>
            {errors.reason && <div>{errors.reason.message}</div>}
        </div>

        <div>
            <label>
                סכום (₪)
                <input type="number" step={0.01} {...register("amount", {
                    valueAsNumber: true,
                    required: "יש להזין את סכום ההוצאה",
                    min: { value: 0.01, message: "הוצאה חייבת להיות גדולה מאפס" },
                    max: { value: 1000000, message: "הוצאה לא יכולה להיות גדולה ממיליון ₪" },
                    validate: (value) =>
                        Math.abs(value * 100 - Math.round(value * 100)) < 1e-8
                        || "ניתן להזין עד 2 ספרות אחרי הנקודה"
                }
                )} />
            </label>
            {errors.amount && <div>{errors.amount?.message}</div>}
        </div>

    </div>


}

export default ExpenseFields