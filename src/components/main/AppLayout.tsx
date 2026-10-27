// COMPONENT
import AppHeader from "@/mainComponents/AppHeader"
import AppFooter from "@/mainComponents/AppFooter"
import { Outlet } from "react-router"
import { Suspense } from "react"
import usePage from "@/lib/usePage"

export default function AppLayout() {
    const page = usePage()

    return (
        <>
        {page?.name && (
            <title>
                {page.name}
            </title>
        )}
        {page?.description && (
            <meta name="description" content={page.description} />
        )}
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