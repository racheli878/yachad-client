import { useEffect, useState } from "react"
import Loading from "../../components/loading"
import EventCard from "./eventCard"
import { useQuery } from "@tanstack/react-query"
import getAllEvents from "../../api/eventsApi"
import { Link } from "react-router-dom"
import getApiError from "../../utils/getApiError"


const AllEventsPage = () => {
    const [search, setSearch] = useState("")
    const [isMyOrganize, setIsMyOrganize] = useState(false)
    const [debouncedSearch, setDebouncedSearch] = useState("")
    const { data, isPending, isError, error } = useQuery({ queryKey: [`events`, { debouncedSearch }, { isMyOrganize }], queryFn: () => getAllEvents(debouncedSearch, isMyOrganize) })

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(timer)
    }, [search])


    return <div className="container page">
        <div className="page-head">
            <h1>המפגשים שלי</h1>
            <div className="page-title-sub">{data?.events.length} מפגשים</div>
        </div>

        <div className="filters">
            <label className="field search">
                חפשו מפגש
                <input placeholder="הקלידו כאן מפגש לחיפוש" className="input" type="search" value={search} onChange={(e) => setSearch(e.target.value)} />
            </label>

            <button className="btn btn-ghost" aria-pressed={isMyOrganize} onClick={() => setIsMyOrganize(!isMyOrganize)}>רק מה שבאחריותי</button>

        </div>

        {isPending && <Loading />}

        {isError && <div>{getApiError(error).message}</div>}

        <div className="grid-cards">
            {data?.events.map(e => <EventCard key={e.id} event={e} />)}

        </div>
        {data?.events.length == 0 && <div className="empty empty-page">
           {search!=""? <><h2 className="empty-title">לא נמצאו מפגשים</h2> <p>נסו חיפוש אחר או פתחו מפגש חדש</p> </> :
            <><h2 className="empty-title">עדיין אין לכם מפגשים</h2> <p>זה בדיוק הזמן ליצור מפגש חדש!</p> </>
           }<Link to="/addEvent" className="btn btn-primary">לחצו ליצירת מפגש</Link></div>}
    </div>

}

export default AllEventsPage