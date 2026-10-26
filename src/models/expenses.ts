import type { UserForTransfer } from "./userModel"


export interface Expense {
    id: number,
    amount: number,
    reason: string,
    paidBy: { id: number, fullName: string },
    isMine: boolean,
}

export interface Expenses {
    budget: number | null,
    total: number,
    remaining: number,
    percentUsed: number | null,
    isOverBudget: boolean,
    expensesCount: number,
    myTotal: number,
    byParticipant: { userId: number, fullName: string, total: number }[],
    expenses: Expense[]
}

export interface LittleExpense {
    amount: number,
    reason: string
}

export interface AllCalculations {
    calculated: boolean,
    calculatedAt: string|null,
    isOutdated: boolean,
    participantsCount: number,
    sharePerPerson: number|null,
    myBalance: number|null,
    myTransfers: { toPay: ToPay[], toReceive: toReceive[] }
}

export interface ToPay {
    id: number,
    toUser: UserForTransfer,
    amount: number
}

export interface toReceive {
    id: number,
    fromUser: UserForTransfer,
    amount: number
}

export interface Transfer {
    id: number,
    from: UserForTransfer,
    to: UserForTransfer,
    amount: number
}
