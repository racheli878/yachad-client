import { useNavigate } from "react-router-dom"
import Header2 from "../components/header2"

const LoginPage=()=>{


    const navigete=useNavigate()
const f=()=>{
    navigete("/allEvents")
}

    return<>
    <h1>login</h1>

   <button onClick={f}>הכנסו</button>
    </>
}

export default LoginPage