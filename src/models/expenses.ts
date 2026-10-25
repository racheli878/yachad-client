

export interface Expense{
    id:number,
    amount:number,
    reason:string,
    paidBy:{id:number,fullName:string},
    isMine:boolean,
}

export interface Expenses{
    budget:number|null,
    total:number,
    remaining:number,
    percentUsed:number|null,
    isOverBudget:boolean,
    expensesCount:number,
    myTotal:number,
    byParticipant:{userId:number,fullName:string,total:number}[],
    expenses:Expense[]
}

export interface LittleExpense{
    amount:number,
    reason:string
}