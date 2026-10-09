// COMPONENTS
import type { NavProps } from "@/components/main/AppNav"
import type { ItemProps } from "@/sections/SkillSection"
import type { SummaryItemProps } from "@/sections/SummarySection"
import type { TodoItemProps } from "@/sections/TodosSection"
import type { SocialLinkProps } from "@/components/SocialLink"
import type { ProjectProps } from "@/sections/ProjectSection"

// ASSETS

    // SOCIAL LINKS

    import YoutubeIcon from "@/icons/social_link_icons/youtube/mdi--youtube.svg?react"
    import GithubIcon from "@/icons/social_link_icons/github/mdi--github.svg?react"
    // import XIcon from "@/icons/social_link_icons/x/pajamas--twitter.svg?react"
    import DiscordIcon from "@/icons/social_link_icons/discord/ic--baseline-discord.svg?react"
    import MonkeyTypeIcon from "@/icons/social_link_icons/monkeytype/simple-icons--monkeytype.svg?react"

    // NAV

    import HomeIcon from "@/icons/nav/akar-icons--home-alt1.svg?react"
    import InfoIcon from "@/icons/nav/boxicons--info-circle.svg?react"
    import SkillIcon from "@/icons/nav/carbon--skill-level-advanced.svg?react"
    import GoalIcon from "@/icons/nav/akar-icons--check-box.svg?react"
    import ProjectIcon from "@/icons/Nav/octicon--project-roadmap-16.svg?react"
    import GalleryIcon from "@/icons/nav/boxicons--gallery-vertical-end-filled.svg?react"
    // SKILLS

        // LANGUAGES

        import HTMLIcon from "@/icons/languages/html/flowbite--html-solid.svg?react"
        import CSSIcon from "@/icons/languages/css/griddy-icons--css-3.svg?react"
        import JSIcon from "@/icons/languages/js/cib--js.svg?react"
        import TSIcon from "@/icons/languages/ts/akar-icons--typescript-fill.svg?react"
        import PythonIcon from "@/icons/languages/python/akar-icons--python-fill.svg?react"
        import LuaIcon from "@/icons/languages/lua/cib--lua.svg?react"

        // FRAMEWORK/TOOLS

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
        import GodotIcon from "@/tools/godot/cib--godot-engine.svg?react"
        import LaravelIcon from "@/tools/laravel/bxl--laravel.svg?react"

    // PROJECTS

    import projectImage1 from "@/assets/images/projects/posterzzz/PosterZZZ.png"

    import projectImage2 from "@/assets/hybrid/projects/s11me/image.png"
    import projectVideo2 from "@/assets/hybrid/projects/S11ME/video.mp4"


//////                  //////
//////  END OF IMPORT   //////
//////                  //////

//////                  //////
//////      MAIN HERO   //////
//////                  //////

const rolesData : string[] = [
    "Front-end\nDeveloper",
    "3D Artist",
    "Left\nHanded"
]

const underscoreDuration = 100
const underscoreStaggerDelay = 75
const underscoreHoldAmount = 250

//////                      //////
//////      EPIC SECTION    //////
//////                      //////

export const EpicSectionRolesData : string[] = [
    "3D Artist",
    "Developer",
    "Video Editor"
]


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
]

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
]

export const toolsData : ItemProps[] = [
    {
        name : "Next.js",
        Icon : NextIcon,
        color : "#fff",
        skillPercent : 45,
        descriptions : [
            "SPA App",
            "API Routing",
            "Routing",
        ]
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
        name : "Laravel",
        Icon : LaravelIcon,
        color : "#FF2D20",
        skillPercent : 20
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
]


//////          //////
//////  NAV     //////
//////          //////

export const navData : NavProps[] = [
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
        url : ""
    },
]


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
        name : "React 100K Subscriber",
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
        name : "Create a 3d game",
        description : "Coming soon",
        isChecked : "halfway"
    }
]


//////              //////
//////  PROJECTS    //////
//////              //////


export const projectData : ProjectProps[] = [
	{
		name : "S11ME",
		summary : "a 3d animation series about random things",
		url : "https://www.youtube.com/@S11-ME_",
		image : projectImage2,
		video : projectVideo2,
	},
	{
		name : "PosterZZZ",
		summary : "A 4chan knockoff made using Next.js",
		url : "https://posterzzz.vercel.app/",
		image : projectImage1,
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
]