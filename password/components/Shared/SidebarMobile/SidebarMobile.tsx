
import { Menu } from "lucide-react"
import { SidebarRoutes } from "@components/Shared/SidebarRoutes"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@components/ui/sheet"
import { Button } from "@components/ui/button"

export const SidebarMobile = () => {
    return (
        <Sheet>
            <SheetTrigger asChild className="lg:hidden">
                <Button>
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-blue-800 text-white lg:hidden">
                <SheetHeader className="text-left mb-5">
                    <SheetTitle className="text-white">TarrePassword</SheetTitle>
                    <SheetDescription>Create and manage all of your password</SheetDescription>
                </SheetHeader>
                <SidebarRoutes />
            </SheetContent>
        </Sheet>
    )
}