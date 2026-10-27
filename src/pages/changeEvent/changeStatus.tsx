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
        </div>
        {watch("status") != "PLANNING" &&event.status == "PLANNING" && <div className="alert alert-warning">
            שינוי מ"בתכנון" ל"{EventStatusLabels[watch("status")]}" סוגר את הסקר. המשתתפים יראו את התשובות שלהם, אבל לא יוכלו לשנות אותן. אם תחזירו ל"בתכנון", הסקר ייפתח מחדש.</div>}

    </div>
}

export default ChangeStatus