
export default interface TasksList {
    count: number,
    openCount: number,
    tasks: Task[]
}

// תפקיד במפגש ("להביא שתייה")
export interface Task {
    id: number,
    description: string,
    isTaken: boolean,
    assignee: { id: number, fullName: string } | null,
    isMine: boolean
}

