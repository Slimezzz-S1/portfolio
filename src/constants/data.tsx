// COMPONENTS
import type { ItemProps } from "@/sections/home-page/SkillSection"
import type { SummaryItemProps } from "@/sections/home-page/SummarySection"
import type { TodoItemProps } from "@/sections/home-page/TodosSection"
import type { SocialLinkProps } from "@/components/SocialLink"
import type { ProjectProps } from "@/sections/home-page/ProjectSection"

// ICONS : SOCIAL LINKS
import YoutubeIcon from "@icons/social-link-icons/youtube/mdi--youtube.svg?react"
import GithubIcon from "@icons/social-link-icons/github/mdi--github.svg?react"
import DiscordIcon from "@icons/social-link-icons/discord/ic--baseline-discord.svg?react"
import MonkeyTypeIcon from "@icons/social-link-icons/monkeytype/simple-icons--monkeytype.svg?react"
// import XIcon from "@icons/social-link-icons/x/pajamas--twitter.svg?react"

// ICONS : LANGUAGES
import HTMLIcon from "@icons/languages/html/flowbite--html-solid.svg?react"
import CSSIcon from "@icons/languages/css/griddy-icons--css-3.svg?react"
import JSIcon from "@icons/languages/js/cib--js.svg?react"
import TSIcon from "@icons/languages/ts/akar-icons--typescript-fill.svg?react"
import PythonIcon from "@icons/languages/python/akar-icons--python-fill.svg?react"
import LuaIcon from "@icons/languages/lua/cib--lua.svg?react"

// ICONS : FRAMEWORK/TOOLS
import NextIcon from "@icons/tools/next-js/akar-icons--nextjs-fill.svg?react"
// import NuxtIcon from "@icons/tools/nuxt-js/bxl--nuxt-js.svg?react"
import ReactIcon from "@icons/tools/react/griddy-icons--react.svg?react"
import VueIcon from "@icons/tools/vue-js/carbon--logo-vue.svg?react"
import TailwindIcon from "@icons/tools/tailwind-css/bxl--tailwind-css.svg?react"
import PGSQLIcon from "@icons/tools/postgre-sql/akar-icons--postgresql-fill.svg?react"
import DockerIcon from "@icons/tools/docker/ant-design--docker-outlined.svg?react"
import BlenderIcon from "@icons/tools/blender/bxl--blender.svg?react"
import PhotoshopIcon from "@icons/tools/photoshop/devicon-plain--photoshop.svg?react"
import AEIcon from "@icons/tools/after-effects/iconoir--adobe-after-effects-solid.svg?react"
import DavinciIcon from "@icons/tools/davinci-resolve/thesvg--davinci-resolve.svg?react"
import NestIcon from "@icons/tools/nest-js/file-icons--nestjs.svg?react"
import ExpressIcon from "@icons/tools/express-js/griddy-icons--expressjs.svg?react"
import GodotIcon from "@icons/tools/godot/cib--godot-engine.svg?react"
// import LaravelIcon from "@icons/tools/laravel/bxl--laravel.svg?react"
// import SupabaseIcon from "@icons/tools/supabase/bxl--supabase.svg?react"
// import VercelIcon from "@icons/tools/vercel/akar-icons--vercel-fill.svg?react"
// import NodeIcon from "@icons/tools/node-js/bxl--nodejs.svg?react"

// ASSETS : PROJECTS
import posterzzzBannerImage from "@/assets/projects/posterzzz/banner.png"
import s11meBannerImage from "@/assets/projects/s11me/banner.png"
import s11meBannerVideo from "@/assets/projects/s11me/bannerVideo.mp4"

//////                  //////
//////  END OF IMPORT   //////
//////                  //////

export interface RolesDataProps {
    roles : string[]
    delayEachLetter : number
    holdDuration : number
}

export interface UnderscoreDataProps {
    duration : number
    staggerDelay : number
    holdDuration : number
}

export interface EpicSectionDataProps {
    roles : string[]
}

export interface AboutMeDataProps {
    transitionTime : number
    delay : number
    delayMid : number
    roles : string[]
}

//////                  //////
//////      MAIN HERO   //////
//////                  //////

export const rolesData : RolesDataProps = {
    roles : [
        "Front-end\nDeveloper",
        "3D Artist",
        "Video\nEditor"
    ],
    delayEachLetter : 25,
    holdDuration : 2000
} as const

export const underscoreData : UnderscoreDataProps = {
    duration : 100,
    staggerDelay : 75,
    holdDuration : 250
} as const

//////                      //////
//////      EPIC SECTION    //////
//////                      //////

export const epicSectionData : EpicSectionDataProps = {
    roles : [
        "3D Artist",
        "Developer",
        "Video Editor"
    ]
} as const

//////                  //////
//////      SUMMARY     //////
//////                  //////


export const summaryItemData : SummaryItemProps[] = [
	{
		name : "Summary",
		description : "I'm a 17 year old voca student from Indonesia, I do 3D animation, develop front-end website, and edit videos. I was a computer nerd back when I was a kid. I yearned for learning more about computers. Looking in the future, I want to be a successful SE graduate and get a loving job with appropriate income",
		simplifiedDescription : "I'm a 3D artist, front-end developer, video editor.",
		className : "col-span-2 row-span-2",
		color : "lime"
	},
	{
		name : "3D Artist",
		description : "I make 3D animations of my OC. I started learning 3D animation back in 2020 using nothing but MineImator to create silly Minecraft animations. after 4 years of disinterest, I tried Blender for more control and convenience and now we're here.",
		simplifiedDescription : "I make 3D animation in Blender 3.6.23",
		color : "cyan"
	},
	{
		name : "Programming",
		description : "I started learning Python in 2024 by creating small scripts. Later, I got good at it and learned other languages as well. As of now, I'm more interested in making front-end websites. My programming languages are Python, HTML, CSS, JS, TS, and Lua. My beloved frameworks are React.js and Next.js.",
		simplifiedDescription : "I code in Python, React, Vue.js, PySide6, and Next.js",
		color : "yellow"
	},
	{
		name : "Video editor",
		description : "I can do simple video editing, and color grading. I started learning video editing somewhere in 2018-2020 using nothing, but Alight Motion on my Snapdragon 625 phone. But in 2025, I started learning in Davinci Resolve in my laptop, with the goal of learning to use After Effects later",
		simplifiedDescription : "I use Davinci Resolve for simple video editing",
		className : "col-span-3",
		color : "red"
	},
] as const

//////           //////
//////  SKILL    //////
//////           //////

export const languagesData : ItemProps[] = [
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
] as const

export const toolsData : ItemProps[] = [
    {
        name : "Next.js",
        Icon : NextIcon,
        color : "#fff",
        skillPercent : 60,
        descriptions : [
            "SPA App",
            "REST API",
            "Routing",
        ]
    },
    // {
    //     name : "Nuxt.js",
    //     Icon : NuxtIcon,
    //     color : "#00DC82",
    //     skillPercent : 17,
    // },
    {
        name : "Vue.js",
        Icon : VueIcon,
        color : "#4FC08D",
        skillPercent : 20,
        descriptions : [
            "Basic use of utilities",
        ]
    },
    {
        name : "React.js",
        Icon : ReactIcon,
        color : "#61DAFB",
        skillPercent : 76,
        descriptions : [
            "Custom hooks",
            "SSR and SSG",
            "Custom complex components",
        ]
    },
    {
        name : "TailwindCSS",
        Icon : TailwindIcon,
        color : "#06B6D4",
        skillPercent : 62,
        descriptions : [
            "Custom utilities",
            "Smooth animations",
        ]
    },
    // {
    //     name : "Laravel",
    //     Icon : LaravelIcon,
    //     color : "#FF2D20",
    //     skillPercent : 15
    // },
    {
        name : "PostgreSQL",
        Icon : PGSQLIcon,
        color : "#4169E1",
        skillPercent : 35,
        descriptions : [
            "Basic SQL query"
        ]
    },
    {
        name : "Nest.js",
        Icon : NestIcon,
        skillPercent : 25,
        color : "#E0234E",
        descriptions : [
            "Basic controllers and services",
            "Basic routing"
        ]
    },
    {
        name : "Express.js",
        Icon : ExpressIcon,
        skillPercent : 5,
        color : "#fff",
        descriptions : [
            "Learning phase"
        ]
    }
] as const

export const appsData : ItemProps[] = [
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
    {
        name : "Godot",
        Icon : GodotIcon,
        color : "#478CBF"
    },
] as const

//////                  //////
//////  SOCIAL LINKS    //////
//////                  //////

export const socialLinksData : SocialLinkProps[] = [
    {
        name : "Youtube",
        Icon : YoutubeIcon,
        description : "My Youtube Channel",
        url : "https://www.youtube.com/@S11-ME_"
    },
    {
        name : "Github",
        Icon : GithubIcon,
        description : "My Github",
        url : "https://github.com/Slimezzz-S1"
    },
    {
        name : "MonkeyType",
        Icon : MonkeyTypeIcon,
        description : "My MonkeyType Profile",
        url : "https://monkeytype.com/profile/slimez7"
    },
    {
        name : "Discord",
        Icon : DiscordIcon,
        description : "My Discord account",
        url : "https://discord.com/users/999482178570305586"
    },
] as const

//////          //////
//////  TODOS   //////
//////          //////

export const todoData : TodoItemProps[] = [
    {
        name : "Create 3D Animation",
        isChecked : true
    },
    {
        name : "Finish this portfolio",
        isChecked : "halfway",
        description : "Almost finished"
    },
    {
        name : "Reach 100K Subscriber",
        description : "",
        isChecked : false
    },
    {
        name : "Get a job",
        isChecked : false
    },
    {
        name : "Make a short movie",
        description : "Coming soon",
        isChecked : "halfway"
    },
    {
        name : "Create a 3D game",
        description : "Coming soon",
        isChecked : "halfway"
    },
    {
        name : "Learn ASL",
        isChecked : "halfway"
    },
] as const


//////              //////
//////  PROJECTS    //////
//////              //////


export const projectData : ProjectProps[] = [
	{
		name : "S11ME",
		summary : "a 3d animation series about random things",
		url : "https://www.youtube.com/@S11-ME_",
		image : s11meBannerImage,
		video : s11meBannerVideo,
	},
	{
		name : "PosterZZZ",
		summary : "A 4chan knockoff made using Next.js",
		url : "https://posterzzz.vercel.app/",
		image : posterzzzBannerImage,
	},
	{
		name : "Grits",
		summary : "X knockoff",
		url : "",
		currentStatus : "prototype",
	},
	{
		name : "Zuper Zuper",
		summary : "A short puzzle game about a TV Head going on an adventure",
		url : "",
		currentStatus : "work-in-progress"
	},
] as const

//////              //////
//////  About ME    //////
//////              //////

export const aboutMeData = {
    transitionTime : 800,
    delay : 1100,
    delayMid : 100,
    roles : rolesData.roles
}