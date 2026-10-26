import type { FieldPath } from "react-hook-form";
import type { NewEventForm } from "../models/event";


export const TitlesForStep=["על מה המפגש?","את מי להזמין?","מה לשאול את המוזמנים?"];
export const SentecesForStep=["רק השם חובה. תאריך ומקום אפשר להשאיר ריקים ולקבוע אחר כך לפי הסקר.","מייל או טלפון בכל שורה. גם מי שעוד לא רשום יראה את ההזמנה ברגע שיירשם עם אותם פרטים.","אפשר לסמן כמה תשובות בכל שאלה. לפי התוצאות תקבעי את הפרטים."];
export const CancelForStep=["ביטול","חזרה לפרטים","חזרה למשתתפים"];
export const ButtonForStep=["המשך למשתתפים","המשך לשאלות הסקר","סיום ושליחת הזמנות"]


export const CheckValidationFields:FieldPath<NewEventForm>[][]=[
    ["title", "description", "eventDate", "location", "food", "category", "activityType", "budget"],
    ["invitees"],["questions"]
]