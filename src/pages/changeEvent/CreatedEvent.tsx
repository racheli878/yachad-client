import { Link } from "react-router-dom"
import type { InvitationSummary } from "../../models/invitation"

const CreatedEvent=({invitationSummary}:{invitationSummary:InvitationSummary})=>{
   return <div className="new-event">
            <div className="card success-card">
                <h2>המפגש נוצר!</h2>
                {invitationSummary.invitationSent > 0 ? <h4>נשלחו <span>{invitationSummary.invitationSent}</span> הזמנות</h4> : <p>לא נשלחו הזמנות כלל</p>}
            </div>
            {invitationSummary.skippedMessages.length != 0 &&
                <div className="alert alert-warning skipped">
                    <h4>לא נשלחו הזמנות ל:</h4>
                    <ul className="skipped-list">
                        {invitationSummary.skippedMessages.map((i, index) => <li key={index}>{i}</li>)}
                    </ul>
                </div>}
            <Link className="btn btn-primary btn-lg" to={`/event/${invitationSummary.eventId}`}>לכניסה למפגש</Link>
        </div>
}

export default CreatedEvent