import { useNavigate } from "react-router-dom"

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