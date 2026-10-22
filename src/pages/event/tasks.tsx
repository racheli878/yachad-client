import type { Task } from "../../models/event"

const Tasks=({tasks}:{tasks:Task[]})=>{

    return<div>
    <div>
        <h2>תפקידים</h2>
        <p>{tasks.filter(t=>t.isTaken).length} מתוך {tasks.length} נלקחו</p>
    </div>
    </div>
}

export default Tasks