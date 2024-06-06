import {UserProfileForm} from "@/forms/user-profile-form/UserProfileForm.tsx";
import {useUpdateUser, useUser} from "@/api/UserApi.tsx";

function UserProfilePage() {
    const { getUser, isLoading: isGetLoading } = useUser();

    const { updateUser, isLoading: isUpdateLoading } = useUpdateUser();

    if (isGetLoading) {
        return <span>Loading...</span>;
    }

    if (!getUser){
        return <span>No se pudieron obtener los datos del usuario</span>
    }

    return <UserProfileForm
        getUser={getUser}
        onSave={updateUser}
        isLoading={isUpdateLoading}/>;
}

export default UserProfilePage;