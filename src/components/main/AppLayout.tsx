// COMPONENT
import { Outlet } from "react-router"
import AppHeader from "@/mainComponents/AppHeader"
import AppFooter from "@/mainComponents/AppFooter"

export default function AppLayout() {
    return (
        <>
        <AppHeader />
        <main className="flex min-h-[calc(100vh-170px)]">
            <Outlet />
        </main>
        <AppFooter />
        </>
    )
}