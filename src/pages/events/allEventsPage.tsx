import { useEffect, useState } from "react"
import Loading from "../../components/loading"
import EventCard from "./eventCard"
import { useQuery } from "@tanstack/react-query"
import getAllEvents from "../../api/events"
import { Link } from "react-router-dom"


const AllEventsPage = () => {
    const [search, setSearch] = useState("")
    const [isMyOrganize, setIsMyOrganize] = useState(false)
    const [debouncedSearch,setDebouncedSearch]=useState("")
    const { data, isPending, isError, error } = useQuery({ queryKey: [`events`, { debouncedSearch }, { isMyOrganize }], queryFn: ()=>getAllEvents(debouncedSearch,isMyOrganize) })

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

        <button className="btn btn-ghost" aria-pressed={isMyOrganize} onClick={()=>setIsMyOrganize(!isMyOrganize)}>רק מה שבאחריותי</button>

  </div>
      
        {isPending && <Loading />}
        
        {isError && <div>{error.message}</div>}

        <div className="grid-cards">
            {data?.events.map(e => <EventCard key={e.id} event={e} />)}
            <div>
            {data?.events.length==0&&<div>לא נמצאו מפגשים</div>}
            {data?.events.length==0&&<Link to="/addEvent">לחצו ליצירת מפגש</Link>}
            </div>
        </div>
  </div>

}

export default AllEventsPage