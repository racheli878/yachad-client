import { useQuery } from "@tanstack/react-query"
import getAllEvents from "../../api/events"
import Loading from "../../components/loading"

const AllEventsPage=()=>{

const {data,isPending, isError, error}=useQuery({queryKey:["events"],queryFn:getAllEvents})

if(isPending)
    return <Loading/>
if(isError)
    return <div>{error.message}</div>
    return <>
    <ul>
    {data.events.map(e=><li key={e.id}>{e.title}</li>)}
    </ul>
    </>
}

export default AllEventsPage