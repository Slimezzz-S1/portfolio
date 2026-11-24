// DATA
import pages from "@/constants/data/pages"

// COMPONENT
import { type BasePageProps, type MainPageProps } from "@/constants/data/pages"
import { useLocation } from "react-router"

export default function usePage() {
    const { pathname } = useLocation()

    return pages.find(
        (p): p is BasePageProps | MainPageProps => p.type !== "notFound" && p.path === pathname
    )
}