import { useState } from "react"
import { getEvent } from "../../api/eventsApi"
import EditTask from "./editTask";
import { useQuery } from "@tanstack/react-query";
const Tasks = ({ id }: { id: number }) => {

    const { data } = useQuery({
        queryKey: ["event", id],
        queryFn: () => getEvent(id)
    })


    const [edit, setEdit] = useState(-1)



    return <div>
        <div>
            <h2>תפקידים</h2>
            <p>{data?.tasks.filter(t => t.isTaken).length} מתוך {data?.tasks.length} נלקחו</p>
        </div>
        {/* to do it afeterwards! */}
        <div>
            <input type="text" />
            <button>הוספה</button>
        </div>
        <div>
            {data?.tasks.map(t => <div key={t.id}>
                {t.isTaken ?
                    <>
                        <span>{t.assignee?.fullName.trim().split(/\s+/).map(name => name[0]).join("")}</span>
                        <span>{t.description}</span>
                        <span>{t.assignee?.fullName} {t.isMine && " (אני)"}</span>
                        {t.isMine && <button>ויתור</button>}
                    </> : t.id != edit ?
                        <>
                            <span>?</span>
                            <span>{t.description}</span>
                            <span>פנוי - אולי תקחו?</span>
                            <button>עלי!</button>
                            {data?.event.myRole == "ORGANIZER" &&
                                <>
                                    <button>delete</button>
                                    <button onClick={() => {setEdit(t.id)}}>edit</button>
                                </>}

                        </> : <>
                            <span>?</span>
                        <EditTask eventId={id} task={t} finishEdit={()=>{setEdit(-1)}}/>
                        </>}


            </div>)}
        </div>
    </div>
}

export default Tasks
