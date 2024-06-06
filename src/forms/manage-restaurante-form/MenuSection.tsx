import {useFieldArray, useFormContext} from "react-hook-form";
import {FormDescription, FormField, FormItem} from "@/components/ui/form.tsx";
import MenuItemInput from "@/forms/manage-restaurante-form/MenuItemInput.tsx";
import {Button} from "@/components/ui/button.tsx";


function MenuSection() {
    const {control} = useFormContext();
    const {fields,
        append,
        remove} = useFieldArray({
        control,
        name: "menuItems",
    })
    return (
        <div className={'space-y-2'}>
            <div>
                <h2 className={'text-2xl font-bold'}>Menú</h2>
                <FormDescription>
                    Crea tu menú, y asigna a cada item un nombre y precio
                </FormDescription>
            </div>

            <FormField
                control={control}
                name={'menuItems'}
                render={ ()=>(
                        <FormItem>
                            {
                               fields.map((_,index) =>(
                                   <MenuItemInput key={index}
                                       index={index}
                                       removeItemMenu={()=>remove(index)}
                                   />
                               ))
                            }
                        </FormItem>
                    )}>


            </FormField>
            <Button type={'button'}
                    onClick={()=>append({ name: "", price: ""})}>
                Agregar al menú
            </Button>

        </div>
    );
}

export default MenuSection;