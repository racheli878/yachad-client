import type { EventForm } from "../models/event";
import type { QuestionField } from "../models/survey";
import type { InviteesForm } from "../models/event";

export const convertEventForm = (data: EventForm) => {
    const dataToSend: EventForm = {
        title: data.title,
        eventDate: !data.eventDate ? null : new Date(data.eventDate).toISOString(),
        location: data.location == "" ? null : data.location,
        food: data.food == "" ? null : data.food,
        budget: Number.isNaN(data.budget) ? null : data.budget,
        category: data.category,
        activityType: data.activityType,
        description: data.description == "" ? null : data.description,
    }
    return dataToSend
}

export const ConvertQuestionForm=(questions:QuestionField[])=>{
    return questions.map(q=>({
        text:q.text.trim(),
        options:q.options.map(o=>o.text.trim()).filter(t=>t!="")
    }))
}


export const convertInvitees = (invitees: InviteesForm["invitees"]) => {
    return invitees.map(f => ({ contact: f.contact.trim() })).filter(f => f.contact !== "");
};