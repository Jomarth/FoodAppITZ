import {z} from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form.tsx";
import LoadingButton from "@/components/LoadingButton.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {User} from "@/types.ts";
import {useEffect} from "react";

const formSchema = z.object({
    email: z.string().optional(),
    name: z.string().min(5, {message: "Must be 5 or more characters long"}),
    addressLine1: z.string().min(1, {message: 'La dirección es requerida'}),
    city: z.string().min(1, {message: 'La ciudad es requerida'}),
    country: z.string().min(1, {message: 'El país es requerido'}),
});

type userFormData = z.infer<typeof formSchema>;

type Props = {
    getUser: User;
    onSave:  (userProfileData: userFormData) => void ;
    isLoading: boolean;
}


export function UserProfileForm({onSave, isLoading, getUser}: Readonly<Props>) {
    const form = useForm<userFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: getUser
    });
    useEffect(() => {
        form.reset(getUser)
    }, [getUser, form]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSave)}
                  className={'space-y-4 bg-gray-50 rounded-lg md:p-10'}>
                <div>
                    <h2 className={'text-2xl font-bold'}>
                        Formulario de perfil de usuario
                    </h2>
                    <FormDescription>
                        Consulta y cambia la información de tu perfil
                    </FormDescription>
                </div>


                <FormField control={form.control}
                           name={'email'}
                           render={({field}) => (
                               <FormItem className={'flex-1'}>
                                   <FormLabel>
                                       Email
                                   </FormLabel>
                                   <FormControl>
                                       <Input {...field} disabled className={'bg-white'}/>
                                   </FormControl>
                               </FormItem>
                           )}
                />

                <FormField control={form.control}
                           name={'name'}
                           render={({field}) => (
                               <FormItem className={'flex-1'}>
                                   <FormLabel>
                                       Name
                                   </FormLabel>
                                   <FormControl>
                                       <Input {...field} className={'bg-white'}/>
                                   </FormControl>
                                   <FormMessage/>
                               </FormItem>
                           )}
                />

                <div className={'flex flex-col md:flex-row gap-4'}>
                    <FormField control={form.control}
                               name={'addressLine1'}
                               render={({field}) => (
                                   <FormItem className={'flex-1'}>
                                       <FormLabel>
                                           Dirección
                                       </FormLabel>
                                       <FormControl>
                                           <Input {...field} className={'bg-white'}/>
                                       </FormControl>
                                       <FormMessage/>
                                   </FormItem>
                               )}
                    />
                    <FormField control={form.control}
                               name={'city'}
                               render={({field}) => (
                                   <FormItem className={'flex-1'}>
                                       <FormLabel>
                                           Ciudad
                                       </FormLabel>
                                       <FormControl>
                                           <Input {...field} className={'bg-white'}/>
                                       </FormControl>
                                       <FormMessage/>
                                   </FormItem>
                               )}
                    />
                    <FormField control={form.control}
                               name={'country'}
                               render={({field}) => (
                                   <FormItem className={'flex-1'}>
                                       <FormLabel>
                                           País
                                       </FormLabel>
                                       <FormControl>
                                           <Input {...field} className={'bg-white'}/>
                                       </FormControl>
                                       <FormMessage/>
                                   </FormItem>
                               )}
                    />
                </div>
                <div>
                    {
                        isLoading ? (
                            <LoadingButton/>
                        ) : (
                            <Button type={'submit'} className={'bg-orange-500'}>
                                Actualizar
                            </Button>
                        )
                    }
                </div>
            </form>
        </Form>
    )
}