import {useFormContext} from "react-hook-form";
import {FormControl, FormDescription, FormField, FormItem} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {AspectRatio} from "@/components/ui/aspect-ratio.tsx";

function ImagenSection() {
    const {control, watch} = useFormContext();
    const existingImageUrl = watch("imageUrl")
    return (
        <div className={'space-y-2'}>
            <div>
                <h2 className={'text-2xl font-bold'}>
                    Imágen
                </h2>
                <FormDescription>
                    <div>
                        Agregue una imagen que se mostrará en a sección de búsqueda
                        del listado de restaurantes
                    </div>
                    <div>
                        Agregar una nueva imágen sustituye la existente
                    </div>
                </FormDescription>
            </div>
            <div className={'flex flex-col gap-8 md:w-[50%]'}>
                {
                    existingImageUrl && (
                        <AspectRatio ratio={16/9}>
                            <img src={existingImageUrl}
                                 className={'rounded-md object-cover h-full w-full'}
                             />
                        </AspectRatio>
                    )
                }
            </div>

            <div className={'flex flex-col gap-8 w-[50%]'}>
                <FormField
                    control={control}
                    name={'imageFile'}
                    render={
                        ({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        className={'bg-white'}
                                        type={'file'}
                                        accept={'.jpg, .jpeg, .png, .webp'}
                                        onChange={(event) =>
                                            field.onChange(
                                                event.target.files ? event.target.files[0] : null
                                            )
                                        }
                                    />
                                </FormControl>
                            </FormItem>
                        )
                    }/>
            </div>

        </div>
    );
}

export default ImagenSection;