import {Form} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import DetailsSection from "@/forms/manage-restaurante-form/DetailsSection.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import CuisinesSection from "@/forms/manage-restaurante-form/CuisinesSection..tsx";
import MenuSection from "@/forms/manage-restaurante-form/MenuSection.tsx";
import ImagenSection from "@/forms/manage-restaurante-form/ImagenSection.tsx";
import LoadingButton from "@/components/LoadingButton.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Restaurant} from "@/types.ts";
import {useEffect} from "react";


const formSchema = z.object({
    restauranteName: z.string({
        required_error: 'El nombre de restaurante es requerido'
    }),
    city: z.string({
        required_error: 'El nombre de la ciudad es requerido'
    }),
    country: z.string({
        required_error: 'El nombre del país es requerido'
    }),
    deliveryPrice: z.coerce.number({
        required_error: 'El precio de la entrega es requerido',
        invalid_type_error: 'El precio de la entrega debe ser un número válido'
    }),
    estimatedDeliveryTime: z.coerce.number({
        required_error: 'El tiempo estimado de la entrega es requerido',
        invalid_type_error: 'El tiempo estimado de la entrega debe ser un número vállido'
    }),
    cuisines: z.array(z.string()).nonempty({
        message: 'Por favor selecciono un item de cocina'
    }),
    menuItems: z.array(
        z.object({
            name: z.string().min(1, 'El numbre es requerido'),
            price: z.coerce.number().min(1, 'El precio es requerido'),
        })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, {message: 'La imagen es requerida'}).optional(),
}).refine((data) =>
        data.imageUrl || data.imageFile,
    {
        message: 'Se debe proporcionar un archivo de imagen o la url de la imagen',
        path: ["imageFile"]
    }
);

type RestauranteFormData = z.infer<typeof formSchema>;
type Props = {
    restaurant?: Restaurant;
    onSave: (RestauranteFormData: FormData) => void;
    isLoading: boolean;
};

function ManageRestauranteForm({onSave, isLoading, restaurant}: Props) {
    const form = useForm<RestauranteFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cuisines: [],
            menuItems: [{name: "", price: 0}]
        }
    })
    useEffect(() =>{

        if (!restaurant) return;
        const deliveryPriceFormatted = parseInt(
            restaurant.deliveryPrice.toFixed(2)
        );

        const menuItemsFormatted = restaurant?.menuItems.map(
            (item) => ({
                ...item,
                price: item.price
            })
        )
        const updatedRestaurant = {
            ...restaurant,
            deliveryPrice: deliveryPriceFormatted,
            menuItems: menuItemsFormatted
        }
        console.log(updatedRestaurant)

        form.reset(updatedRestaurant)

    }, [form, restaurant]) //fin del useEffect

    const onSubmit = (formDataJson: RestauranteFormData) => {

        const formData = new FormData();

        formData.append('restauranteName', formDataJson.restauranteName);
        formData.append('city', formDataJson.city);
        formData.append('country', formDataJson.country);
        formData.append('deliveryPrice', formDataJson.deliveryPrice.toString());
        formData.append('estimatedDeliveryTime', formDataJson.estimatedDeliveryTime.toString());
        formDataJson.cuisines.forEach(
            (cuisine, index) => {
                formData.append(`cuisines[${index}]`, cuisine);
            }
        )
        formDataJson.menuItems.forEach(
            (menuItem, index) => {
                formData.append(`menuItems[${index}][name]`, menuItem.name);
                formData.append(`menuItems[${index}][price]`, menuItem.price.toString());

            }
        )
        if (formDataJson.imageFile){
            formData.append('imageFile', formDataJson.imageFile);
        }
        onSave(formData);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                  className={'space-y-8 bg-gray-50 p-10 rounded-lg'}>
                <DetailsSection/>
                <Separator/>
                <CuisinesSection/>
                <Separator/>
                <MenuSection/>
                <Separator/>
                <ImagenSection/>
                {
                    isLoading ? <LoadingButton/>
                        : <Button>
                            Guardar
                        </Button>
                }
            </form>
        </Form>

    );
}

export default ManageRestauranteForm;