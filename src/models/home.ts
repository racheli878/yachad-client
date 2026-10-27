import type EventListItem from "./event";
import type { toReceive, ToPay } from "./expenses";
import type { Task } from "./tasks";

// מפגש קרוב בדף הבית
export type HomeEvent = Pick<EventListItem, "id" | "title" | "eventDate" | "location" | "status" | "category" | "activityType" | "myRole">

// תפקיד שלקחתי, עם המפגש שהוא שייך אליו
export interface HomeTask extends Pick<Task, "id" | "description"> {
    event: Pick<EventListItem, "id" | "title" | "eventDate">
}

// העברה בדף הבית: כמו בהתחשבנות, בלי id ועם המפגש
export interface HomeToPay extends Omit<ToPay, "id"> {
    event: Pick<EventListItem, "id" | "title">
}

export interface HomeToReceive extends Omit<toReceive, "id"> {
    event: Pick<EventListItem, "id" | "title">
}

export interface HomeMoney {
    totalToPay: number,
    totalToReceive: number,
    toPay: HomeToPay[],
    toReceive: HomeToReceive[]
}

// התשובה של #7
export default interface HomeResponse {
    user: { id: number, fullName: string },
    upcomingEvents: HomeEvent[],
    pendingInvitationsCount: number,
    myOpenTasks: HomeTask[],
    money: HomeMoney
}
