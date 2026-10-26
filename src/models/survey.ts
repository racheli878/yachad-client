
export interface SurveyParticipant{
isOpen:boolean,
hasResponded:boolean,
mySubmittedAt:string|null,
myNote:string|null,
questions:QuestionParticipant[]
}

export interface QuestionParticipant{
    id:number,
    text:string,
    order:number,
    options:OptionParticipant[]
}

export interface OptionParticipant{
    id:number,
    text:string,
    selectedByMe:boolean
}

export interface SurveyForm{
    selectedOptions: string[];
    note: string;
};

export interface AnswersParticipant{
    answers:{questionId:number, optionIds: number[]}[],
    note :string
}