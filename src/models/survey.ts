import type { PartUser } from "./userModel";

export interface SurveyParticipant {
    isOpen: boolean,
    hasResponded: boolean,
    mySubmittedAt: string | null,
    myNote: string | null,
    questions: QuestionParticipant[]
}

export interface QuestionParticipant {
    id: number,
    text: string,
    order: number,
    options: OptionParticipant[]
}

export interface OptionParticipant {
    id: number,
    text: string,
    selectedByMe: boolean
}

export interface SurveyForm {
    selectedOptions: string[];
    note: string;
};

export interface AnswersParticipant {
    answers: { questionId: number, optionIds: number[] }[],
    note: string
}

export interface SurveyResults {
    isOpen: boolean,
    participantsCount: number,
    respondentsCount: number,
    responseRate: number,
    questions:QuestionResults[],
    responses:ResponseSurvey[],
    notResponded:PartUser[]
}

export interface QuestionResults {
    id: number,
    text: string,
    order:number,
    respondentsCount: number,
    options: OptionResult[],
}

export interface OptionResult {
    id: number,
    text: string,
    votes: number,
    percentage: number,
    isTop: boolean,
    voters: PartUser[]
}

export interface ResponseSurvey {
    user: PartUser,
    note: string|null,
    answers:Answer[]
}

export interface Answer {
    questionId: number,
    optionIds: number[],
    optionTexts: string[]
}


// בטופס (מה שהשדות רואים)
export interface QuestionField {
  text: string;
  options: { text: string }[];
}

// מה שנשלח לשרת (#9) ומה שמגיע מהשרת (#37)
export interface NewQuestion {
  text: string;
  options: string[];
}
// וב־NewEventRequest:  questions?: NewQuestion[]   במקום  questions: []