import type { ActivityType, EventCategory, EventRole, EventStatus } from "../models/eventSelections";
import type { InvitationStatus } from "../models/invitation";

export const categoryLabels: Record<EventCategory, string> = {
    FAMILY: "משפחתי",
    FRIENDS: "חברים",
    CLASS_COMMUNITY: "כיתה / קהילה",
    WORK: "עבודה",
    OTHER: "אחר"
}

export const activityTypeLabels: Record<ActivityType, string> = {
    BIRTHDAY: "יום הולדת",
    GATHERING: "מפגש",
    MEAL: "ארוחה",
    SPORT: "ספורט",
    TRIP: "טיול",
    REFRESHMENT: "התרעננות",
    HOLIDAY: "חג",
    OTHER: "אחר"
}

export const EventStatusLabels: Record<EventStatus, string> = {
    PLANNING: "בתכנון",
    SCHEDULED: "נקבע",
    COMPLETED: "הסתיים",
    CANCELLED: "בוטל"
}

export const EventRoleLabels: Record<EventRole, string> = {
    ORGANIZER: "מארגן",
    PARTICIPANT: "משתתף"
}

export const InvitationStatusLabels: Record<InvitationStatus, string> = {
    DECLINED: "נדחתה",
    ACCEPTED: "אושרה",
    PENDING: "ממתינה"
}

export const contactLabels: Record<string, string> = {
    "tag-mail": "מייל",
    "tag-phone": "טלפון",
    "tag-invalid": "לא תקין"
};
