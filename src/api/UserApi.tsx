import {useMutation, useQuery} from "react-query";
import {useAuth0} from "@auth0/auth0-react";
import {toast} from "sonner";
import {User} from "@/types.ts";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

type CreateUserRequest = {
    auth0Id: string;
    email: string;
}

export const useCreateUser = () =>{
    const { getAccessTokenSilently} = useAuth0();

    const createUserRequest =  async (user: CreateUserRequest) => {

        console.log(user)
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(API_BASE_URL + '/api/users', {
            method: "POST",
            headers: {
                Authorization: 'Bearer ' + accessToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error('Error' + response.statusText);
        }
    }//Fin de createUserRequest

    const {
        mutateAsync: createUser,
        isLoading,
        isError,
        isSuccess
    } = useMutation(createUserRequest)

    return {
        createUser,
        isLoading,
        isError,
        isSuccess
    }
}

type UpdateUserRequest = {
    name:string;
    addressLine1: string;
    city: string;
    country: string;
}

export const useUpdateUser = () =>{
    const { getAccessTokenSilently } = useAuth0();

    const updateUserRequest = async (formData: UpdateUserRequest) =>{
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(API_BASE_URL + '/api/users',{
            method: "PUT",
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok){
            throw new Error('Error al acualizar usuario!')
        }

    }// Final del updateUserRequest

    const {
        mutateAsync: updateUser,
        isLoading,
        isSuccess,
        error,
        reset
    } = useMutation(updateUserRequest)

    if (isSuccess){
        toast.success("Usuario actualizado!");
    }
    if (error){
        toast.success("Error al actualizar usuario!");
        reset();
    }

    return{
        updateUser,
        isLoading,
        isSuccess,
        error,
        reset
    }

}// Final del useUpdateUser

export const useUser = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getUserRequest = async (): Promise<User> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(API_BASE_URL + '/api/users', {
            method: "GET",
            headers: {
                Authorization: 'Bearer ' + accessToken,
                "Content-Type": "application/json",
            }
        })

        if (!response.ok){
            throw new Error('Usuario Actualizado')
        }
        return response.json();
    }//Final del getUserRequest
    const {
        data: getUser,
        isLoading,
        error
    } = useQuery("fetchUser", getUserRequest);

    if (error){
        toast.error(error.toString());
    }
    return {
        getUser,
        isLoading
    }
}//Final del useUser
