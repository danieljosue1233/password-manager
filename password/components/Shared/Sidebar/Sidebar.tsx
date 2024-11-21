import Logo from "../Logo"
import { SidebarRoutes } from "../SidebarRoutes/SidebarRoutes"

const Sidebar = () => {
    return (
        <>
            <div className="py-6">
                <Logo />
            </div>
            <SidebarRoutes />
        </>
    )
}

export default Sidebar