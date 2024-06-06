import {useFormContext} from "react-hook-form";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

type Props = {
    index: number;
    removeItemMenu: () => void;
}

function MenuItemInput({index, removeItemMenu}: Props) {
    const {control} = useFormContext();

    return (
        <div className={'flex flex-row items-end gap-2'}>
            <FormField control={control}
                name={`menuItems.${index}.name`}
                render={({field}) => (
                    <FormItem>
                        <FormLabel className={'flex items-center gap-1'}>
                            Nombre
                            <FormMessage/>
                        </FormLabel>
                        <FormControl>
                            <Input {...field} placeholder={'Hamburgesa'} className={'bg-white'}/>
                        </FormControl>
                    </FormItem>
                )}
            />
            <FormField control={control}
                       name={`menuItems.${index}.price`}
                       render={({field}) => (
                           <FormItem>
                               <FormLabel className={'flex items-center gap-1'}>
                                   Precio ($)
                                   <FormMessage/>
                               </FormLabel>
                               <FormControl>
                                   <Input {...field} placeholder={'99.99'} className={'bg-white'}/>
                               </FormControl>
                           </FormItem>
                       )}
            />
            <Button
                    type={'button'}
                    onClick={removeItemMenu}
            className={'bg-red-500 max-h-fit'}>
                Eliminar
            </Button>
        </div>
    );
}

export default MenuItemInput;