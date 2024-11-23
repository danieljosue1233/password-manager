"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from 'axios'
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { formSchema } from "./schemas/FormAddSchema";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@components/ui/select";
import { Checkbox } from "@components/ui/checkbox";
import { toast } from "@hooks/use-toast";
import { Copy, Earth, Eye, Shuffle } from "lucide-react";
import { copyClipboard } from "@lib/copyClipboard";
import { FC, useState } from "react";
import { generatePassword } from "@lib/generatePassword";
import { Textarea } from "@components/ui/textarea";
import { useRouter } from "next/navigation";

interface FormAddElementProps {
    closeDialog: () => void
    userId?: string;
}

export const FormAddElement: FC<FormAddElementProps> = ({ userId, closeDialog }) => {
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            typeElement: "",
            isFavourite: false,
            name: "",
            directory: "",
            username: "",
            password: "",
            urlWebsite: "",
            notes: "",
            userId: userId,
        },
    })


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post("/api/items", values)
            toast({ title: "Item created 🎉" })
            form.reset(
                {
                    typeElement: "",
                    isFavourite: false,
                    name: "",
                    directory: "",
                    username: "",
                    password: "",
                    urlWebsite: "",
                    notes: "",
                });
            closeDialog()

            router.refresh();

        } catch (error) {
            toast({
                title: "something went wrong",
                variant: "destructive"
            })
        }
    }

    const generateRandomPassword = () => {
        const password = generatePassword()
        form.setValue("password", password)
    }

    const updateUrl = () => {
        form.setValue("urlWebsite", `${window.location.origin}`);
    };
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
                                    <SelectContent className="cursor-pointer">
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

                    <FormField control={form.control} name="username" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Usuario</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input {...field} />
                                    <Copy
                                        className="absolute top-3 right-4 cursor-pointer"
                                        size={18}
                                        onClick={() => {
                                            copyClipboard(field.value);
                                        }}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField control={form.control} name="urlWebsite" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Url Website</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input {...field} />
                                    <Earth className="absolute top-3 right-2 cursor-pointer" size={18} onClick={updateUrl} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField control={form.control} name="password" render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex justify-between">
                                Password
                                <Shuffle className="cursor-pointer" size={15} onClick={generateRandomPassword} />
                            </FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input {...field} type={showPassword ? "text" : "password"} />
                                    <Eye className="absolute top-3 right-10 cursor-pointer" size={18} onClick={() => setShowPassword(!showPassword)} />
                                    <Copy className="absolute top-3 right-2 cursor-pointer" size={15} onClick={() => {
                                        copyClipboard(field.value);
                                    }} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <div>
                        <div className="text-slate-400 flex items-center justify-between text-sm">
                            Autenticacion TOTP
                            <p className="px-3 bg-green-700 text-white rounded-lg text-xs mr-5">Premium</p>
                        </div>
                        <Input disabled />
                    </div>

                    <FormField control={form.control} name="notes" render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex justify-between">
                                Notes
                            </FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <div />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
};