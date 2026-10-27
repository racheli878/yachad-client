import { useQuery } from "@tanstack/react-query"
import { getEvent } from "../api/eventsApi"

const useEvent = (id: number) => useQuery({
    queryKey: ["event", id],
    queryFn: () => getEvent(id)
})


export default useEvent