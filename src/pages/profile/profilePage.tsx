import { useQuery } from "@tanstack/react-query"
import PasswordForm from "./passwordForm"
import ProfileDetailsForm from "./profileDetailsForm"
import Loading from "../../components/loading"
import getApiError from "../../utils/getApiError"
import firstLettersOfName from "../../utils/firstLettersOfName"
import { formatMonthYear } from "../../utils/formatDate"
import { getMe } from "../../api/authApi"

const ProfilePage = () => {

    const { data, isPending, isError, error } = useQuery({
        queryKey: ["me"],
        queryFn: getMe
    })
    if (isPending)
        return <Loading />
    if (isError)
        return <div>{getApiError(error).message}</div>
    return <>
        <div className="profile-head">
            <span className="avatar avatar-lg profile-avatar">{firstLettersOfName(data.fullName)}</span>
            <h1>הפרופיל שלי</h1>
            <p className="muted profile-since">איתנו מאז {formatMonthYear(data.createdAt)}</p>
        </div>

        <ProfileDetailsForm user={data}/>
        <PasswordForm />
    </>
}

export default ProfilePage