import { Link } from "react-router-dom";
import type EventListItem from "../../models/event";
import { activityTypeLabels, categoryLabels, EventRoleLabels, EventStatusLabels } from "../../utils/labels";
import { formatDate } from "../../utils/formatDate";

const EventCard = ({ event }: { event: EventListItem }) => {

    return <Link className="event-card" to={`/event/` + event.id}>
        <div className={`event-card-band band-${event.status.toLowerCase()}`}>
            <span className="tag">{EventStatusLabels[event.status]}</span>
            <p className="event-card-kind">{categoryLabels[event.category]} · {activityTypeLabels[event.activityType]}</p>
            <p className="event-card-title">{event.title}</p>
        </div>
        <div className="event-card-body">
            <div className="event-card-meta">
                <p className="event-card-date">{event.eventDate == null ? "טרם נקבע" :formatDate(event.eventDate)}</p>
                <p className="event-card-place">{event.location ? event.location : "טרם נקבע"}</p>
            </div>
            <p className="event-card-people">{event.participantsCount} משתתפים {event.myRole == "PARTICIPANT" && " · " + event.organizer.fullName}</p>
            <span className={`tag tag-${event.myRole.toLowerCase()}`}>{EventRoleLabels[event.myRole]}</span>
        </div>
    </Link>
}

export default EventCard