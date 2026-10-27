import { useLocation, useParams } from "react-router-dom"
import SurveyParticipantPage from "./surveyParticipantPage"
import { useState } from "react"
import SurveyOrganizerPage from "./surveyOrganizerPage"
import useEvent from "../../../utils/useEvent"

const Survey=()=>{

    const {eventId}=useParams()
    const id=Number(eventId)
  
      const { data } = useEvent(id)
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