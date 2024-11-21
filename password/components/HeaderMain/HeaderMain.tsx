"use client"

import { dataHeaderMain } from "@components/HeaderMain/helpers/HeaderMain.data"
import { Button } from "@components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { FormAddElement } from "./createElement"



const HeaderMain = () => {
    const [typeElement, setTypeElement] = useState<"password" | "folder" | "">()
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [openDropdown, setOpenDropdown] = useState<boolean>(false)

    const closeDialogAndDropdown = () => {
        setOpenDropdown(false);
        setOpenDialog(false);
    }
    return (
        <div className="flex justify-between items-center">
            <h1 className="text-xl md:text-3xl font-semibold">Todas las Cajas fuertes</h1>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
                    <DropdownMenuTrigger asChild>
                        <Button>
                            Nueva <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="p-0">
                        <DropdownMenuLabel>
                            <DialogTrigger asChild>
                                <div className="flex flex-col">
                                    {dataHeaderMain.map(({ icon: Icon, typeElement, text }) => (
                                        <Button
                                            key={typeElement}
                                            className="justify-start"
                                            variant="ghost"
                                            onClick={() => setTypeElement(typeElement)}
                                        >
                                            <Icon className="w-4 h-4 mr-2" />
                                            {text}
                                        </Button>
                                    ))}
                                </div>
                            </DialogTrigger>
                        </DropdownMenuLabel>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DialogContent className="w-full max-w-screen-lg p-8">
                    <DialogHeader className="sm:max-w-[825px]">
                        <DialogTitle>Nuevo Elemento</DialogTitle>
                    </DialogHeader>
                    {typeElement === "password" && <FormAddElement />}
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default HeaderMain