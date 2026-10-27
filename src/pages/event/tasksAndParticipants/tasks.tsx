import { useState } from "react"
import EditTask from "./editTask";
import CreateTask from "./createTask";
import TaskAction from "./taskAction";
import { deleteTask, releaseTask, takeTask } from "../../../api/tasks";
import firstLettersOfName from "../../../utils/firstLettersOfName";
import useEvent from "../../../utils/useEvent";
const Tasks = ({ id }: { id: number }) => {

    const { data } = useEvent(id)


    const [edit, setEdit] = useState(-1)
    const total = data?.tasks.length ?? 0
    const taken = data?.tasks.filter(t => t.isTaken).length ?? 0
    const percent = total === 0 ? 0 : Math.round((taken / total) * 100)

    return <div className="card event-tasks">
        <div className="event-tasks-head">
            <h2 className="event-tasks-title">תפקידים</h2>
            <p className="event-tasks-count">{data?.tasks.filter(t => t.isTaken).length} מתוך {data?.tasks.length} נלקחו</p>
            <div className="bar"><div className="bar-fill" style={{ width: `${percent}%` }}></div></div>
        </div>
        {data?.event.myRole == "ORGANIZER" && <CreateTask id={id} />}
        <div className="event-tasks-list">
            {!data?.tasks || data.tasks.length == 0 ? <div className="event-tasks-empty">עדיין אין תפקידים</div> :
                data?.tasks.map(t => <div className="task-row" key={t.id}>
                    {t.isTaken ?
                        <>
                            <span className="avatar task-avatar">{firstLettersOfName(t.assignee?.fullName)}</span>
                            <span className="task-title">{t.description}</span>
                            <span className="task-who">{t.assignee?.fullName} {t.isMine && " (אני)"}</span>
                            {t.isMine && <TaskAction eventId={id} taskId={t.id} text="ויתור" func={releaseTask} />}
                        </> : t.id != edit ?
                            <>
                                <span className="avatar task-avatar task-avatar-free">?</span>
                                <span className="task-title">{t.description}</span>
                                <span className="task-who">פנוי - אולי תקחו?</span>
                                <TaskAction eventId={id} taskId={t.id} text="עלי!" func={takeTask} />
                                {data?.event.myRole == "ORGANIZER" &&
                                    <>
                                        <TaskAction eventId={id} taskId={t.id} text="מחיקה" func={deleteTask} />
                                        <button className="icon-btn task-icon" onClick={() => { setEdit(t.id) }}>edit</button>
                                    </>}
                            </> : <>
                                <span className="avatar task-avatar task-avatar-free">?</span>
                                <EditTask eventId={id} task={t} finishEdit={() => { setEdit(-1) }} />
                            </>}


                </div>)}
        </div>
    </div>
}

export default Tasks
