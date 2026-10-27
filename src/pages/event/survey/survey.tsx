import { useLocation, useParams } from "react-router-dom"
import SurveyParticipantPage from "./surveyParticipantPage"
import { useQuery } from "@tanstack/react-query"
import { getEvent } from "../../../api/eventsApi"
import { useState } from "react"
import SurveyOrganizerPage from "./surveyOrganizerPage"

const Survey=()=>{

    const {eventId}=useParams()
    const id=Number(eventId)
  
      const { data } = useQuery({
          queryKey: ["event", id],
          queryFn: () => getEvent(id)
      })
      const location=useLocation()
      const [showRes,setShowRes]=useState<boolean>(location.state?.showRes??false)

return<>
{data?.event.myRole=="ORGANIZER"&&<div className="survey-toggle">
    <button className="survey-toggle-btn" aria-pressed={!showRes} onClick={()=>setShowRes(false)}>התשובות שלי</button>
    <button className="survey-toggle-btn" aria-pressed={showRes} onClick={()=>setShowRes(true)}>תוצאות (למארגנים)</button>
    </div>}
    {showRes?<SurveyOrganizerPage/>:<SurveyParticipantPage/>
}
</>
}

export default Survey