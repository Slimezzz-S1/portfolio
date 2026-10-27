// DATA
import pages from "@/lib/pages"

// COMPONENT
import { type BasePageProps, type MainPageProps } from "@/lib/pages"
import { useLocation } from "react-router"

export default function usePage() {
    const { pathname } = useLocation()

    return pages.find(
        (p): p is BasePageProps | MainPageProps =>
            p.type !== "notFound" && p.path === pathname
    )
    
}