import { useAuth0 } from '@auth0/auth0-react';
import {useMutation, useQuery} from "react-query";
import {toast} from "sonner";
import {Restaurant, RestauranteSearchResponse} from "@/types.ts";
import {SearchState} from "@/pages/SearchPage.tsx";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const useSearchRestaurants = (searchState:SearchState, city?: string) => {

    const createSearchRequest = async (): Promise<RestauranteSearchResponse> => {

        const params = new URLSearchParams();

        params.set("searchQuery", searchState.searchQuery);
        params.set("page", searchState.page.toString());
        params.set("selectedCuisines", searchState.selectedCuisines.join(","));
        params.set("sortOptions", searchState.sortOptions)

        const url = API_BASE_URL
            + '/api/restaurante/search/'
            + city
            + '?'
            + params.toString();

        console.log(url);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Error al traer los Restaurantes")
        }

        return response.json();
    }//Fin de createSearchRequest

    const {
        data: results,
        isLoading
    } = useQuery(
        ["searchRestaurants", searchState],
        createSearchRequest,
        { enabled: !!city }
    );

    return { results, isLoading };

}//Fin de useSearchRestaurants

export const useUpdateRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const updateRestaurantRequest = async (restauranteFormData: FormData): Promise<Restaurant> => {

        const accessToken = await getAccessTokenSilently();
        const response = await fetch(API_BASE_URL + '/api/restaurante', {
            method: "PUT",
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
            body: restauranteFormData,
        });

        if (!response.ok){
            throw new Error('Error al actualizar el restaurante');
        }

        return response.json();
    }// fin de updateRestaurantRequest

    const {
        mutate: updateRestaurant,
        isLoading,
        isSuccess,
        isError
    } = useMutation(updateRestaurantRequest)

    if (isSuccess){
        toast.success("Restaurante actualizado correctamente!");
    }
    if (isError){
        toast.error("Error al actualizar el restaurante");
    }

    return {
        updateRestaurant,
        isLoading
    }
}// fin del useUpdateRestaurant

export const useGetRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getRestaurantRequest = async (): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(API_BASE_URL + '/api/restaurante', {
            method: "GET",
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        })

        if (!response.ok){
            throw new Error('Error al obtener los datos del restaurante')
        }
        return response.json();
    }//Final del getRestaurantRequest

    const { data: restaurant, isLoading } = useQuery(
        "getRestaurant",
        getRestaurantRequest
    );
    return {
        restaurant,
        isLoading
    }
}//Final del useGetRestaurant
//funcion para crear restaurante
export const useCreateRestaurant = () =>{
    const {getAccessTokenSilently} = useAuth0();

    const createRestaurantRequest = async (restaruranteFormData: FormData): Promise<Restaurant> => {

        const accessToken = await getAccessTokenSilently();

        const res = await fetch(API_BASE_URL + '/api/restaurante', {
            method: "POST",
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
            body: restaruranteFormData
        });
        console.log(res)
        if (!res.ok) {
            throw new Error('Errorr al crear restaurante');
        }

        return res.json();
    }//fin del createRestaurantRequest

    const {
        mutateAsync: createResturant,
        isLoading,
        isSuccess,
        isError
    } = useMutation(createRestaurantRequest)

    if (isSuccess){
        toast.success('Restaurnte creado correctamente')
    }
    if (isError){
        toast.error('Error al crear el restaurante')
    }

    return {
        createResturant,
        isLoading
    }
}// fin del useCreateRestaurant


