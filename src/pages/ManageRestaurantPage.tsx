import ManageRestauranteForm from "@/forms/manage-restaurante-form/ManageRestauranteForm.tsx";
import {useCreateRestaurant, useGetRestaurant, useUpdateRestaurant} from "@/api/RestaurantApi.tsx";

function ManageRestaurantPage() {
    const {createResturant, isLoading: isCreateLoading} = useCreateRestaurant();
    const {restaurant} = useGetRestaurant();
    const {updateRestaurant, isLoading: isUpdateLoading} = useUpdateRestaurant();
    const isEditting = !!restaurant;

    return (
        <ManageRestauranteForm
            restaurant = {restaurant}
            onSave={isEditting ? updateRestaurant : createResturant}
            isLoading={isCreateLoading || isUpdateLoading}
        />
    );
}

export default ManageRestaurantPage;