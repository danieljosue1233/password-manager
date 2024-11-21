"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@components/ui/form"
import { Input } from "@components/ui/input"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { toast } from "@hooks/use-toast"


const formSchema = z.object({
    email: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
    username: z.string().min(2).max(50),

})

const RegisterFom = () => {
    const router = useRouter();


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            username: "",
        },
    })


    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        const response = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({
                email: values.email,
                username: values.username,
                password: values.password
            })
        });

        if (response.status === 200) {
            router.push("/")
            toast({
                title: "Registration has bee done successfully🎉",
            })
        } else {
            toast({
                title: "Error while performing registration",
                variant: "destructive"
            })
        }

    }
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-5 space-y-3 text-black">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="email@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your username"{...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="shh..." type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">Register</Button>
                </form>
            </Form>
        </div>
    )
}

export default RegisterFom;