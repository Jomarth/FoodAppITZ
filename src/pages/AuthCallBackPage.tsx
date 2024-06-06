import {useAuth0} from "@auth0/auth0-react";
import {useCreateUser} from "@/api/UserApi.tsx";
import {useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";

function AuthCallBackPage() {
    const navigate = useNavigate()
    const { user } = useAuth0();
    const { createUser } = useCreateUser();
    const hasCreatedUser = useRef(false);

    useEffect(() =>{
        if (user?.sub && user?.email && !hasCreatedUser.current){
            createUser({ auth0Id: user.sub, email:user.email });
            hasCreatedUser.current = true;
        }
        navigate('/');
    },[createUser, navigate, user])

    return (
        <div>
            Loading... :(
        </div>
    );
}

export default AuthCallBackPage;