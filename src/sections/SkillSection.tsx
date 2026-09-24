// Languages
import HTMLIcon from "@/icons/languages/html/flowbite--html-solid.svg?react"
import CSSIcon from "@/icons/languages/css/griddy-icons--css-3.svg?react"
import JSIcon from "@/icons/languages/js/cib--js.svg?react"
import TSIcon from "@/icons/languages/ts/akar-icons--typescript-fill.svg?react"
import PythonIcon from "@/icons/languages/python/akar-icons--python-fill.svg?react"
import LuaIcon from "@/icons/languages/lua/cib--lua.svg?react"

// Frameworks/Tools
import NextIcon from "@/tools/next-js/akar-icons--nextjs-fill.svg?react"
import NuxtIcon from "@/tools/nuxt-js/bxl--nuxt-js.svg?react"
import ReactIcon from "@/tools/react/griddy-icons--react.svg?react"
import VueIcon from "@/tools/vue-js/carbon--logo-vue.svg?react"
import TailwindIcon from "@/tools/tailwind-css/bxl--tailwind-css.svg?react" 
import PGSQLIcon from "@/tools/postgre-sql/akar-icons--postgresql-fill.svg?react"
// import SupabaseIcon from "@/tools/supabase/bxl--supabase.svg?react"
// import VercelIcon from "@/tools/vercel/akar-icons--vercel-fill.svg?react"
// import NodeIcon from "@/tools/node-js/bxl--nodejs.svg?react"
import DockerIcon from "@/tools/docker/ant-design--docker-outlined.svg?react"
import BlenderIcon from "@/tools/blender/bxl--blender.svg?react"
import PhotoshopIcon from "@/tools/photoshop/devicon-plain--photoshop.svg?react"
import AEIcon from "@/tools/after-effects/iconoir--adobe-after-effects-solid.svg?react"
import DavinciIcon from "@/tools/davinci-resolve/thesvg--davinci-resolve.svg?react"
import NestIcon from "@/tools/nest-js/file-icons--nestjs.svg?react"
import ExpressIcon from "@/tools/express-js/griddy-icons--expressjs.svg?react"


export interface itemProps {    
    name : string
    Icon : React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    skillPercent? : number
    color? : string
}

const languages : itemProps[] = [
    {
        name : "HTML",
        Icon : HTMLIcon,
        color : "#E34F26"
    },
    {
        name : "CSS",
        Icon : CSSIcon,
        color : "#1572B6"
    },
    {
        name : "JavaScript",
        Icon : JSIcon,
        color : "#F7DF1E"
    },
    {
        name : "TypeScript",
        Icon : TSIcon,
        color : "#3178C6"
    },
    {
        name : "Python",
        Icon : PythonIcon,
        color : "#3776AB"
    },
    {
        name : "Lua",
        Icon : LuaIcon,
        color : "#2C2D72"
    },
]

const tools : itemProps[] = [
    {
        name : "Next.js",
        Icon : NextIcon,
        color : "#fff",
        skillPercent : 45
    },
    {
        name : "Nuxt.js",
        Icon : NuxtIcon,
        color : "#00DC82",
        skillPercent : 17
    },
    {
        name : "Vue.js",
        Icon : VueIcon,
        color : "#4FC08D",
        skillPercent : 15
    },
    {
        name : "React.js",
        Icon : ReactIcon,
        color : "#61DAFB",
        skillPercent : 76
    },
    {
        name : "TailwindCSS",
        Icon : TailwindIcon,
        color : "#06B6D4",
        skillPercent : 50
    },
    {
        name : "PostgreSQL",
        Icon : PGSQLIcon,
        color : "#4169E1",
        skillPercent : 35
    },
    {
        name : "Nest.js",
        Icon : NestIcon,
        skillPercent : 10,
        color : "#E0234E"
    },
    {
        name : "Express.js",
        Icon : ExpressIcon,
        skillPercent : 5,
        color : "#fff"
    }
]

const apps : itemProps[] = [
    {
        name : "Docker",
        Icon : DockerIcon,
        color : "#2496ED",
    },
    {
        name : "Blender",
        Icon : BlenderIcon,
        color : "#EA7600"
    },
    {
        name : "After Effects",
        Icon : AEIcon,
        color : "#9999FF"
    },
    {
        name : "Photoshop",
        Icon : PhotoshopIcon,
        color : "#31A8FF"
    },
    {
        name : "Davinci Resolve",
        Icon : DavinciIcon,
        color : "#233A51"
    },
]

interface itemComponentProps extends itemProps {
    className? : string
    style? : React.CSSProperties
    onClick? : () => void
    overrideClassName? : boolean
    overrideStyle? : boolean
}

export function ItemIcon({ name, Icon, color, className, style, onClick, overrideClassName = false, overrideStyle = false } : itemComponentProps) {
    return (
        <div style={overrideStyle ? style : {...{"--color" : color} as React.CSSProperties, ...style}} title={name} onClick={onClick} className={overrideClassName ? className : "w-20 h-20 border rounded-2xl p-3 hover:border-(--color) hover:text-(--color) hover:scale-105 transition-all" + " " + className}>
            <Icon className="w-full h-full" />
        </div>
    )
}

export function ItemDetailed({ name, Icon, color, className, skillPercent, style, onClick, overrideClassName = false, overrideStyle = false } : itemComponentProps) {
    return (
        <div style={overrideStyle ? style : {...{"--color" : color} as React.CSSProperties, ...style}} className={overrideClassName ? className : "group grid grid-cols-[auto_1fr] sm:flex justify-between items-center gap-3 sm:gap-4 border rounded-2xl px-3 py-3 transition-all hover:border-(--color) hover:scale-105" + " " + className} onClick={onClick}>
            <Icon className="w-12 h-12 aspect-square group-hover:text-(--color)" />

            <h3 className="text-2xl font-bold transition-colors group-hover:text-(--color)">
                {name}
            </h3>

            <div className="flex-1 col-start-2" />

            <p className="font-bold text-center">
                {skillPercent}%
            </p>

            <div className="w-full sm:w-56 h-4 border-3 rounded-full overflow-hidden">
                <div style={{"--x" : `-${100 - (skillPercent ?? 100)}%`} as React.CSSProperties} className="w-full h-full bg-(--color) translate-x-(--x) rounded-[inherit]" />
            </div>
        </div>
    )
}

interface itemIconsProps {
    items? : itemProps[]
    mode? : "icons" | "tiles" | "details"
}

export function ItemIcons({ items = languages, mode = "icons" } : itemIconsProps) {
    switch (mode) {
        case "icons":
            return items.map(( item, index ) => (
                <ItemIcon
                    key={index}
                    name={item.name}
                    Icon={item.Icon}
                    skillPercent={item.skillPercent}
                    color={item.color}
                />
            ))
        case "details":
            return items.map(( item, index ) => (
                <ItemDetailed
                    key={index}
                    name={item.name}
                    Icon={item.Icon}
                    skillPercent={item.skillPercent}
                    color={item.color}
                />
            ))
        case "tiles":
            return items.map(( item, index ) => (
                <ItemIcon
                    key={index}
                    name={item.name}
                    Icon={item.Icon}
                    skillPercent={item.skillPercent}
                    color={item.color}
                />
            ))
    }
}

export default function SkillSection() {
    return (
        <section className="p-8">
            <h1 className="mb-4 py-4 text-7xl font-black text-center border-b-3 border-dashed">
                Skills
            </h1>

            <div className="flex flex-col gap-4">
                <div>
                    <div className="relative my-4 pb-4 px-4">
                        <div className="absolute top-0 left-0 w-full h-full bg-hatch mask-b-to-transparent rounded-t-xl" />

                        <h2 className="md:text-8xl sm:text-7xl text-5xl md:text-stroke-md text-stroke-sm text-transparent">
                            Languages
                        </h2>
                    </div>

                    <div className="flex gap-4 justify-center flex-wrap">
                        <ItemIcons mode="icons" />
                    </div>
                </div>

                <div>
                    <div className="relative my-4 pb-4 px-4">
                        <div className="absolute top-0 left-0 w-full h-full bg-hatch mask-b-to-transparent rounded-t-xl" />

                        <h2 className="md:text-8xl text-7xl md:text-stroke-md text-stroke-sm text-transparent text-end">
                            Tools
                        </h2>
                    </div>

                    <div className="flex flex-col gap-4 justify-center">
                        <ItemIcons items={tools} mode="details" />
                    </div>
                </div>

                <div>
                    <div className="relative my-4 pb-4 px-4">
                        <div className="absolute top-0 left-0 w-full h-full bg-hatch mask-b-to-transparent rounded-t-xl" />

                        <h2 className="md:text-8xl text-7xl md:text-stroke-md text-stroke-sm text-transparent">
                            Apps
                        </h2>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <ItemIcons items={apps} mode="icons" />
                    </div>
                </div>
            </div>
        </section>
    )
}