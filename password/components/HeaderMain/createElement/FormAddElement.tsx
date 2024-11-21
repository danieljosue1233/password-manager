"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { formSchema } from "./schemas/FormAddSchema";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@components/ui/select";
import { SelectItem } from "@radix-ui/react-select";
import { Checkbox } from "@components/ui/checkbox";



export const FormAddElement = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            typeElement: "",
            isFavourite: false,
            name: "",
            directory: "",
            username: "",
            password: "",
            urlWebSite: "",
            notes: "",
            userId: "udjad"
        },
    })


    const onSubmit = (values: z.infer<typeof formSchema>) => {

        console.log(values)

    }
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid md: grid-cols-2 gap-y-2 gap-x-6">
                    <FormField
                        control={form.control}
                        name="typeElement"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>¿Que tipo de elemento necesitas?</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue className="truncate" placeholder="Select a directory for your password" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Inicio de sesion">
                                            Inicio de sesion
                                        </SelectItem>
                                        <SelectItem value="Tarjeta">
                                            Tarjeta
                                        </SelectItem>
                                        <SelectItem value="Identidad">
                                            Identidad
                                        </SelectItem>
                                    </SelectContent>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="isFavourite"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>¿Quieres seleccionar tu contraseña como favorita?</FormLabel>
                                <div className="flex flex-row items-start space-x-3 space-y-0 p-4">
                                    <FormControl>
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Marcar como favorito</FormLabel>
                                    </div>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField
                        control={form.control}
                        name="directory"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Directorio</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue className="truncate" placeholder="Choose the directory" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Social">
                                            Social
                                        </SelectItem>
                                        <SelectItem value="Arts">
                                            Arts
                                        </SelectItem>
                                        <SelectItem value="Shopping">
                                            Shopping
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
};