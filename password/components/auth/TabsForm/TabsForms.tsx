import { Card, CardContent } from "@components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs"
import LoginForm from "../LoginForm/LoginForm";
import RegisterFom from "../RegisterForm/RegisterForms";


const TabsForms = () => {
    return (
        <Tabs defaultValue="signIn" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signIn" className="transition duration-300 ease-in-out">Sign In</TabsTrigger>
                <TabsTrigger value="signUp" className="transition duration-300 ease-in-out">SignUp</TabsTrigger>
            </TabsList>
            <TabsContent value="signIn">
                <Card>
                    <CardContent className="space-y-2">
                        <LoginForm />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="signUp">
                <Card>
                    <CardContent className="space-y-2">
                        <RegisterFom />
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}

export default TabsForms;