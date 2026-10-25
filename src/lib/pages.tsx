// ASSETS
import HomeIcon from "@/icons/nav/akar-icons--home-alt1.svg?react"
import InfoIcon from "@/icons/nav/boxicons--info-circle.svg?react"
import SkillIcon from "@/icons/nav/carbon--skill-level-advanced.svg?react"
import GoalIcon from "@/icons/nav/akar-icons--check-box.svg?react"
import ProjectIcon from "@/icons/nav/octicon--project-roadmap-16.svg?react"
import GalleryIcon from "@/icons/nav/boxicons--gallery-vertical-end-filled.svg?react"


// COMPONENTS
import type { NavProps } from "@/components/main/AppNav"
import { lazy, type ReactNode } from "react"
import HomePage from "@/pages/HomePage"
const NotFound = lazy(() => import("@/pages/NotFound"))

interface BasePageProps {
    type : "base"
    name : string
    path : string
    element : ReactNode
    description? : string
    nav? : NavProps[]
}

interface MainPageProps extends Omit<BasePageProps, "type"> {
    type : "main"
}

interface NotFoundPageProps {
    type : "notFound"
    isDefault : boolean
    element : ReactNode
}

type PageProps = BasePageProps | NotFoundPageProps | MainPageProps

const pages : PageProps[] = [
    {
        type : "notFound",
        isDefault : true,
        element : <NotFound />
    },
    {
        type : "main",
        name : "home",
        path : "/",
        element : <HomePage />,
        nav : [
            {
                name : "Home",
                Icon : HomeIcon,
                idElement : "home",
                options : {
                    behavior : "smooth",
                    block : "end",
                }
            },
            {
                name : "About Me",
                Icon : InfoIcon,
                idElement : "about",
                options : {
                    behavior : "smooth",
                    block : "start"
                }
            },
            {
                name : "Skills",
                Icon : SkillIcon,
                idElement : "skill",
                options : {
                    behavior : "smooth",
                    block : "start"
                }
            },
            {
                name : "Goals",
                Icon : GoalIcon,
                idElement : "goals",
                options : {
                    behavior : "smooth",
                    block : "start"
                }
            },
            {
                name : "Project",
                Icon : ProjectIcon,
                idElement : "project",
                options : {
                    behavior : "smooth",
                    block : "start"
                }
            },
            {
                name : "Gallery",
                Icon : GalleryIcon,
                idElement : "gallery",
                options : {
                    behavior : "smooth",
                    block : "start"
                }
            },
        ]
    },
    {
        type : "base",
        name : "meow",
        path : "/meow",
        element : (
            <p>
                meow
            </p>
        )
    }
] as const

export default pages