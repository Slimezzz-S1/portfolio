import { type ReactNode } from 'react'

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

import VscodeIcon from './assets/icons/language/akar-icons--vscode-fill.svg?react'
import PhotoshopIcon from './assets/icons/language/mage--photoshop.svg?react'
import AffinityIcon from './assets/icons/language/vscode-icons--file-type-affinity.svg?react'
import DavinciIcon from './assets/icons/language/simple-icons--davinciresolve.svg?react'
import BlenderIcon from './assets/icons/language/file-icons--blender.svg?react'
import FigmaIcon from './assets/icons/language/solar--figma-bold-duotone.svg?react'
import AudacityIcon from './assets/icons/language/file-icons--audacity.svg?react'
import FfmpegIcon from './assets/icons/language/file-icons--ffmpeg.svg?react'


import UnknownIcon from './assets/icons/language/material-symbols--question-mark.svg?react'

interface skillLanguageProps {
    name : string,
    percent : number,
    description : string,
    IconElement? : React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}

const skillLanguageData : skillLanguageProps[] = [
    {
        name : "html",
        percent : 80,
        description : "I love this"
    },
    {
        name : "css",
        percent : 60,
        description : "I heart this"
    },
    {
        name : "javascript",
        percent : 45,
        description : "who is this guy?"
    },
    {
        name : "typescript",
        percent : 45,
        description : "JAVASCRIPT WHAT THE FUCK ARE YOU DOING"
    },
    {
        name : "react",
        percent : 20,
        description : "I know quite a bit of react, i can only use it with typescript tho"
    },
    {
        name : "python",
        percent : 50,
        description : "my first ever programming language"
    },
    {
        name : "vite",
        percent : 20,
        description : "Nice"
    },
    {
        name : "nextjs",
        percent : 5,
        description : "currently learning it"
    },
    {
        name : "cpp",
        percent : 2,
        description : "What is this?"
    },
    {
        name : "tailwind",
        percent : 20,
        description : "Thank god i discovered this"
    },
]

const skillToolsData : skillLanguageProps[] = [
    {
        name : "vscode",
        percent : 50,
        description : "a"
    },
    {
        name : "photoshop",
        percent : 70,
        description : "I've been learning Photoshop since I was 8"
    },
    {
        name : "affinity",
        percent : 40,
        description : "best free multi functional app ive ever used"
    },
    {
        name : "blender",
        percent : 80,
        description : "Can it blend?"
    },
    {
        name : "figma",
        percent : 0,
        description : "hiasan doang wkwk"
    },
    {
        name : "ffmpeg",
        percent : 10,
        description : "wtf are these flags!"
    },
    {
        name : "audacity",
        percent : 3,
        description : "idk how to use this lol"
    }
]

export function SkillLanguages({skillLanguageList = skillLanguageData, className} : {skillLanguageList? : skillLanguageProps[], className? : string}) {
    return (
        <div className={'grid grid-cols-4 gap-4 ' + (className ?? "")}>
            {skillLanguageList.map(skillLanguageItem => <SkillLanguage key={skillLanguageItem.name} name={skillLanguageItem.name} />)}
        </div>
    )
}

export function SkillLanguage({name, IconElement} : Omit<skillLanguageProps, "description" | "percent">) {
    const iconHandle : (languageName : string) => ReactNode = (languageName : string) => {
        switch (languageName.toLowerCase()) {
            case "react":
                return <ReactIcon className='w-full h-full object-contain' />
            case "vite":
                return <ViteIcon className='w-full h-full object-contain' />
            case "nextjs":
                return <NextJsIcon className='w-full h-full object-contain' />
            case "python":
                return <PythonIcon className='w-full h-full object-contain' />
            case "html":
                return <HtmlIcon className='w-full h-full object-contain' />
            case "css":
                return <CssIcon className='w-full h-full object-contain' />
            case "typescript":
                return <TypescriptIcon className='w-full h-full object-contain' />
            case "javascript":
                return <JavascriptIcon className='w-full h-full object-contain' />
            case "tailwind":
                return <TailwindIcon className='w-full h-full object-contain' />
            case "cpp":
                return <CppIcon className='w-full h-full object-contain' />
            case "vscode":
                return <VscodeIcon className='w-full h-full object-contain' />
            case "photoshop":
                return <PhotoshopIcon className='w-full h-full object-contain' />
            case "affinity":
                return <AffinityIcon className='w-full h-full object-contain' />
            case "davinci":
                return <DavinciIcon className='w-full h-full object-contain' />
            case "blender":
                return <BlenderIcon className='w-full h-full object-contain' />
            case "figma":
                return <FigmaIcon className='w-full h-full object-contain' />
            case "audacity":
                return <AudacityIcon className='w-full h-full object-contain' />
            case "ffmpeg":
                return <FfmpegIcon className='w-full h-full object-contain' />
            default:
                return <UnknownIcon className='w-full h-full object-contain' />
        }
    }

    return (
        <div title={name} className='w-20 h-20 p-3 border-2 border-foreground rounded-2xl'>
            {IconElement ? <IconElement /> : iconHandle(name)}
        </div>
    )
}

export default function Skill() {
    return (
        <section className="p-10 flex flex-col gap-4">
            <h1 className="text-6xl text-center border-y-2 py-4 font-bold">
                Skill
            </h1>

            <div className="grid grid-cols-2 items-center gap-4">
                <div className='flex flex-col gap-4 items-center h-full'>
                    <h1 className="text-4xl text-center">
                        Languages
                    </h1>

                    <SkillLanguages className='w-fit' />
                </div>

                <div className='flex flex-col gap-4 items-center h-full'>
                    <h1 className="text-4xl text-center">
                        Tools
                    </h1>

                    <SkillLanguages className='w-fit' skillLanguageList={skillToolsData} />
                </div>

            </div>
        </section>
    )
}