import { useState, type ReactNode } from 'react'

import ReactIcon from './assets/icons/language/uil--react.svg?react'
import JavascriptIcon from './assets/icons/language/akar-icons--javascript-fill.svg?react'
import TypescriptIcon from './assets/icons/language/akar-icons--typescript-fill.svg?react'
import ViteIcon from './assets/icons/language/simple-icons--vite.svg?react'
import NextJsIcon from './assets/icons/language/devicon--nextjs.svg?react'
import HtmlIcon from './assets/icons/language/flowbite--html-solid.svg?react'
import CssIcon from './assets/icons/language/flowbite--css-solid.svg?react'
import PythonIcon from './assets/icons/language/akar-icons--python-fill.svg?react'
import TailwindIcon from './assets/icons/language/mdi--tailwind.svg?react'
import CppIcon from './assets/icons/language/mdi--language-cpp.svg?react'
import PrismaIcon from './assets/icons/language/lineicons--prisma.svg?react'
import PostGreSQLIcon from './assets/icons/language/akar-icons--postgresql-fill.svg?react'

import VscodeIcon from './assets/icons/language/akar-icons--vscode-fill.svg?react'
import PhotoshopIcon from './assets/icons/language/mage--photoshop.svg?react'
import AffinityIcon from './assets/icons/language/vscode-icons--file-type-affinity.svg?react'
import DavinciIcon from './assets/icons/language/simple-icons--davinciresolve.svg?react'
import BlenderIcon from './assets/icons/language/file-icons--blender.svg?react'
import FigmaIcon from './assets/icons/language/solar--figma-bold-duotone.svg?react'
import AudacityIcon from './assets/icons/language/file-icons--audacity.svg?react'
import FfmpegIcon from './assets/icons/language/file-icons--ffmpeg.svg?react'
import DockerIcon from './assets/icons/language/mdi--docker.svg?react'

import UnknownIcon from './assets/icons/language/material-symbols--question-mark.svg?react'

interface skillLanguageProps {
    name : string
    percent : number
    description : string
    IconElement? : React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    color? : string
}

const skillLanguageData : skillLanguageProps[] = [
    {
        name : "html",
        percent : 80,
        description : "I love this",
        color : '#e96228',
        IconElement : HtmlIcon
    },
    {
        name : "css",
        percent : 60,
        description : "I heart this",
        color : "#2862e9",
        IconElement : CssIcon
    },
    {
        name : "javascript",
        percent : 45,
        description : "who is this guy?",
        color : "#efd81c",
        IconElement : JavascriptIcon
    },
    {
        name : "typescript",
        percent : 45,
        description : "JAVASCRIPT WHAT THE FUCK ARE YOU DOING",
        color : "#2f74c0",
        IconElement : TypescriptIcon
    },
    {
        name : "react",
        percent : 20,
        description : "I know quite a bit of react, i can only use it with typescript tho",
        color : "#04a0ca",
        IconElement : ReactIcon
    },
    {
        name : "python",
        percent : 50,
        description : "my first ever programming language",
        color : "#356c99",
        IconElement : PythonIcon
    },
    {
        name : "vite",
        percent : 20,
        description : "Nice",
        color : "#975bf7",
        IconElement : ViteIcon
    },
    {
        name : "nextjs",
        percent : 5,
        description : "currently learning it",
        IconElement : NextJsIcon
    },
    {
        name : "cpp",
        percent : 2,
        description : "What is this?",
        color : "#005697",
        IconElement : CppIcon
    },
    {
        name : "tailwind",
        percent : 20,
        description : "Thank god i discovered this",
        color : "#16b9c6",
        IconElement : TailwindIcon
    },
    {
        name : "prisma",
        percent : 9,
        color : "#2dd4bf",
        description : "I dont know much about orm, i just watch tutorial",
        IconElement : PrismaIcon
    },
    {
        name : "postgresql",
        percent : 2,
        color : "#336791",
        description : "Not know much",
        IconElement : PostGreSQLIcon
    }
]

const skillToolsData : skillLanguageProps[] = [
    {
        name : "vscode",
        percent : 50,
        description : "a",
        color : "#0084cb",
        IconElement : VscodeIcon
    },
    {
        name : "photoshop",
        percent : 70,
        description : "I've been learning Photoshop since I was 8",
        color : "#2fa3f7",
        IconElement : PhotoshopIcon
    },
    {
        name : "affinity",
        percent : 40,
        description : "best free multi functional app ive ever used",
        color : "#a7f175",
        IconElement : AffinityIcon
    },
    {
        name : "blender",
        percent : 80,
        description : "Can it blend?",
        color : "#e1790d",
        IconElement : BlenderIcon
    },
    {
        name : "figma",
        percent : 0,
        description : "hiasan doang wkwk",
        color : "#ea4c1d",
        IconElement : FigmaIcon
    },
    {
        name : "ffmpeg",
        percent : 10,
        description : "wtf are these flags!",
        color : "#368a3a",
        IconElement : FfmpegIcon
    },
    {
        name : "audacity",
        percent : 3,
        description : "idk how to use this lol",
        color : "#0000e5",
        IconElement : AudacityIcon
    },
    {
        name : "davinci",
        percent : 20,
        description : "i luv this",
        color : "#0eaaed",
        IconElement : DavinciIcon
    },
    {
        name : "docker",
        percent : 10,
        description : "Why do i need containers lol",
        color : "#0288d1",
        IconElement : DockerIcon
    }
]

export function SkillLanguages({skillLanguageList = skillLanguageData, className} : {skillLanguageList? : skillLanguageProps[], className? : string}) {
    return (
        <div className={'grid grid-cols-4 gap-4 ' + (className ?? "")}>
            {skillLanguageList.map(skillLanguageItem => <SkillLanguage key={skillLanguageItem.name} name={skillLanguageItem.name} color={skillLanguageItem.color} IconElement={skillLanguageItem.IconElement} />)}
        </div>
    )
}

export function SkillLanguage({name, IconElement, color} : Omit<skillLanguageProps, "description" | "percent">) {

    return (
        <div
        title={name}
        style={{ ["--icon-color" as any]: color }}
        className={"group w-20 h-20 p-3 border-2 border-foreground rounded-2xl transition-transform hover:-scale-[-105%] transition- " + (color ? `hover:border-[var(--icon-color)]` : "hover:border-gray-500")}>
            {IconElement ? <IconElement className={color ? `transition-colors group-hover:text-(--icon-color)` : ""} /> : <UnknownIcon />}
        </div>
    )
}

export default function Skill() {
    return (
        <section>
            <h1 className="text-6xl text-center py-4 font-bold mb-12">
                Skill
            </h1>

            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                <div className='flex flex-col gap-4 items-center h-full'>
                    <h1 className="text-4xl text-center">
                        Tools
                    </h1>

                    <SkillLanguages className='w-fit' />
                </div>

                <div className='flex flex-col gap-4 items-center h-full'>
                    <h1 className="text-4xl text-center">
                        Apps
                    </h1>

                    <SkillLanguages className='w-fit' skillLanguageList={skillToolsData} />
                </div>

            </div>
        </section>
    )
}