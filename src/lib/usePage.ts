// DATA
import pages from "@/constants/pages"

// COMPONENT
import { type BasePageProps, type MainPageProps } from "@/constants/pages"
import { useLocation } from "react-router"

export default function usePage() {
    const { pathname } = useLocation()

    return pages.find(
        (p): p is BasePageProps | MainPageProps => p.type !== "notFound" && p.path === pathname
    )
}