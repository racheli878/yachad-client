import { EventStatusLabels, StatusSentenceLabels } from "../../utils/labels"
import { type EditEventForm, type EventDetails } from "../../models/event"
import { statuses } from "../../models/eventSelections"
import { useFormContext } from "react-hook-form"


const ChangeStatus = ({ event }: { event: EventDetails }) => {
    const { register ,watch}=useFormContext<EditEventForm>()

    return <div className="card status-card">
        <h2>סטטוס המפגש</h2>
        <div className="status-options">

            {statuses.map(status=><label className="status-option" key={status}>
                    <input type="radio" value={status} {...register("status")}/>
                    {EventStatusLabels[status]}<p className="status-hint">{StatusSentenceLabels[status]}</p>
                    {event.status==status&&<p className="status-tag status-current">הסטטוס הנוכחי</p>}
                    {watch("status")==status&&event.status!=status&&<p className="status-tag status-new">הבחירה החדשה</p>}
            </label>)}



            {/* <label>
                <input type="radio" value="PLANNING" {...register("status")} />
                {EventStatusLabels["PLANNING"]} <p>הסקר פתוח, הפרטים עוד לא סגורים</p>
                {event.status === "PLANNING" && <p>הסטטוס הנוכחי</p>}
                {statusSelected === "PLANNING" && watch("status") != "PLANNING" && <p>הבחירה החדשה</p>}
            </label>
            <label>
                <input type="radio" value="SCHEDULED" {...register("status")} />
                {EventStatusLabels["SCHEDULED"]} <p>התאריך והמקום סגורים, הסקר נסגר</p>
                {event.status === "SCHEDULED" && <p>הסטטוס הנוכחי</p>}
                {statusSelected === "SCHEDULED" && watch("status") != "SCHEDULED" && <p>הבחירה החדשה</p>}
            </label>
            <label>
                <input type="radio" value="COMPLETED" {...register("status")} />
                {EventStatusLabels["COMPLETED"]} <p>המפגש עבר; ההתחשבנות עדיין זמינה</p>
                {event.status === "COMPLETED" && <p>הסטטוס הנוכחי</p>}
                {statusSelected === "COMPLETED" && watch("status") != "COMPLETED" && <p>הבחירה החדשה</p>}
            </label>
            <label>
                <input type="radio" value="CANCELLED" {...register("status")} />
                {EventStatusLabels["CANCELLED"]} <p>המפגש לא יתקיים</p>
                {event.status === "CANCELLED" && <p>הסטטוס הנוכחי</p>}
                {statusSelected === "CANCELLED" && watch("status") != "CANCELLED" && <p>הבחירה החדשה</p>}
            </label> */}
        </div>
        {watch("status") != "PLANNING" &&event.status == "PLANNING" && <div className="alert alert-warning">
            שינוי מ"בתכנון" ל"{EventStatusLabels[watch("status")]}" סוגר את הסקר. המשתתפים יראו את התשובות שלהם, אבל לא יוכלו לשנות אותן. אם תחזירו ל"בתכנון", הסקר ייפתח מחדש.</div>}

    </div>
}

export default ChangeStatus