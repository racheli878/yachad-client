import type { Participant } from "../../models/event"
import firstLettersOfName from "../../utils/firstLettersOfName"
import { EventRoleLabels } from "../../utils/labels"

const Participants = ({ participants }: { participants: Participant[] }) => {

    return <div className="card event-people">
        <h2 className="event-people-title">משתתפים · {participants.length}</h2>
        {participants.map(p => {
            return <div className="person-row" key={p.userId}>
                <span className={`avatar person-avatar avatar-${p.role.toLowerCase()}`}>{firstLettersOfName(p.fullName)}</span>
                <p className="person-name">{p.fullName}</p>
                <p className="person-phone ltr">{p.phone}</p>
                <span className={`tag tag-${p.role.toLowerCase()} person-role`}>{EventRoleLabels[p.role]}</span>
            </div>
        })}
        {/* רק המנהל רואה את זה אז אין עניין אם יש גם לשונית לניהול המשתתפים */}
       {/* {<Link className="event-people-invite" to="/">+ הזמנת משתתפים</Link>} */}
    </div>

}

export default Participants