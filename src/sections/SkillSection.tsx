// COMPONENTS
import type { textDirection } from "@/components/main/Section"
import type { BaseComponentProps } from "@/libs/BaseComponentProps"
import { languagesData, toolsData, appsData } from "@/libs/data"
import { SectionTitle } from "@/components/main/Section"
import { useState } from "react"
import { twMerge } from "tailwind-merge"
import MonkeyTypeStats from "@/components/MonkeyTypeStats"

export interface ItemProps {    
    name : string
    Icon : React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    descriptions? : string[]
    skillPercent? : number
    color? : string
}
interface ItemComponentProps extends ItemProps {
    className? : string
    style? : React.CSSProperties
    onClick? : () => void
    overrideClassName? : boolean
    overrideStyle? : boolean
}

interface ItemIconsProps {
    items? : ItemProps[]
    mode? : "icons" | "tiles" | "details"
}

interface SkillPartProps {
    title : string
    items : ItemProps[]
    titleDirection? : textDirection
}

interface SkillPartTitleProps extends BaseComponentProps {
    text : string
    direction? : textDirection
}

const languages = languagesData
const tools = toolsData
const apps = appsData

const TYPING_TIME_MODES = ["time 15", "time 30", "time 60", "time 120"] as const
const TYPING_WORDS_MODES = ["words 10", "words 25", "words 50", "words 100"] as const
const TYPING_ALL_MODES = [...TYPING_TIME_MODES, TYPING_WORDS_MODES] as const

type TypingTimeMode = typeof TYPING_TIME_MODES[number]
type TypingWordsMode = typeof TYPING_WORDS_MODES[number]
export type TypingMode = TypingTimeMode | TypingWordsMode


export function ItemIcon({ name, Icon, color, descriptions, className, style, onClick, overrideClassName = false, overrideStyle = false } : ItemComponentProps) {
    return (
        <div style={overrideStyle ? style : {...{"--color" : color} as React.CSSProperties, ...style}} title={descriptions?.toString() ?? name} onClick={onClick} className={overrideClassName ? className : twMerge("w-20 h-20 border rounded-2xl p-3 hover:border-(--color) hover:text-(--color) hover:scale-105 transition-all", className)}>
            <Icon className="w-full h-full" />
        </div>
    )
}

export function ItemDetailed({ name, Icon, color, descriptions, className, skillPercent, style, onClick, overrideClassName = false, overrideStyle = false } : ItemComponentProps) {
    return (
        <div style={overrideStyle ? style : {"--color" : color, ...style} as React.CSSProperties} className={overrideClassName ? className : twMerge("group grid grid-cols-[auto_1fr] sm:flex justify-between items-center gap-3 sm:gap-4 border rounded-2xl px-3 py-3 transition-all hover:border-(--color) hover:scale-105", className)} onClick={onClick} title={descriptions?.toString() ?? name}>
            <Icon className="w-20 sm:w-14 h-18 sm:h-14 aspect-square group-hover:text-(--color) transition-colors col-start-1 row-start-1 row-span-3 self-center" />

            <h3 className="text-2xl font-bold transition-colors group-hover:text-(--color)">
                {name}
            </h3>

            <div className="hidden sm:block flex-1" />

            <p className="font-bold sm:text-center text-left text-xl sm:text-base">
                {skillPercent}%
            </p>

            {descriptions && (
                <ul className="row-start-4 sm col-span-2 sm:hidden list-disc ml-8">
                    {descriptions?.map((item, index) => (
                        <li key={index} className="font-bold text-2xl">
                            {item}
                        </li>
                    ))}
                </ul>
            )}

            <div className="w-full sm:w-56 h-4 border-3 rounded-full overflow-hidden">
                <div style={{"--x" : `-${100 - (skillPercent ?? 100)}%`} as React.CSSProperties} className="w-full h-full bg-(--color) translate-x-(--x) rounded-[inherit]" />
            </div>
        </div>
    )
}

export function ItemIcons({ items = languages, mode = "icons" } : ItemIconsProps) {
    switch (mode) {
        case "icons":
            return items.map(( item, index ) => (
                <ItemIcon
                    key={index}
                    name={item.name}
                    Icon={item.Icon}
                    skillPercent={item.skillPercent}
                    color={item.color}
                    descriptions={item.descriptions}
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
                    descriptions={item.descriptions}
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
                    descriptions={item.descriptions}
                />
            ))

        default:
            throw new TypeError(`Invalid mode! "${mode}" is not a valid mode!`)
    }
}

function SkillPart({ title, items, titleDirection = "start" } : SkillPartProps) {
    return (
        <div>
            <SkillPartTitle text={title} direction={titleDirection} />

            <div className={title.toLowerCase() == "tools" ? "flex flex-col gap-4 justify-center" : "flex gap-4 justify-center flex-wrap"}>
                <ItemIcons items={items} mode={title.toLowerCase() == "tools" ? "details" : "icons"} />
            </div>
        </div>
    )
}

function SkillPartTitle({text, className, style, overrideClassName = false, direction = "start", ...rest} : Omit<SkillPartTitleProps, "overrideStyle">) {
    return (
        <div style={style} className={overrideClassName ? className : twMerge("m-4", className)} {...rest}>
            <h2 className={"text-5xl font-bold mb-4" + " " + (direction === "end" ? "text-end" : direction === "center" ? "text-center" : "text-start")}>
                {text}
            </h2>
            {/* bg-linear-90 from-root-fg to-root-bg */}

            <div className={"w-full h-1" + " " + (direction === "end" ? "bg-linear-270 from-root-fg to-root-bg" : direction === "center" ? "bg-linear-90 from-root-bg via-root-fg to-root-bg" : "bg-linear-90 from-root-fg to-root-bg")} />
        </div>
    )
}

// function StatsPart() {
//     const [isClicked, setIsClicked] = useState<boolean>(false)
//     const [mode, setMode] = useState<TypingMode>("words 10")

//     const onClick = () => {
//         setIsClicked(!isClicked)
//         // WILL BE USED LATER
//     }

//     return (
//         <div className="flex flex-col items-center my-8">
//             <SkillPartTitle text="Typing" className="w-full" direction="center" />

//             {/* <select name="" id="">
//                 {TYPING_ALL_MODES.map((modeName, index) => (
//                     <option key={index} value={modeName}>
//                         {modeName}
//                     </option>
//                 ))}
//             </select> */}

//             <div className="w-full min-w-0">
//                 <MonkeyTypeStats />
//             </div>
//         </div>
//     )    
// }

export default function SkillSection() {
    return (
        <section className="p-8">
            <SectionTitle text="Skills" direction="end" />

            {/* <StatsPart /> */}

            <div className="flex flex-col gap-4">
                <SkillPart title="Languages" items={languages} titleDirection="start" />

                <SkillPart title="Tools" items={tools} titleDirection="center" />

                <SkillPart title="Apps" items={apps} titleDirection="end" />
            </div>
        </section>
    )
}