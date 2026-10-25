// COMPONENT
import { Outlet, useLocation } from "react-router"
import { Suspense, useEffect } from "react"
import AppHeader from "@/mainComponents/AppHeader"
import AppFooter from "@/mainComponents/AppFooter"

export default function AppLayout() {
    const location = useLocation()
    
    useEffect(() => {
        console.log(location)
    }, [location])
    return (
        <>
        <AppHeader />
        
        <main className="flex min-h-[calc(100vh-170px)]">
            <Suspense fallback={null}>
                <Outlet />
            </Suspense>
        </main>

        <AppFooter />
        </>
    )
}