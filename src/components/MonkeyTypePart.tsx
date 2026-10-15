// DATA
import resultsData from "@/data/monkey-type/results.json"

// COMPONENTS
import type { BaseComponentProps } from "@/libs/BaseComponentProps"
import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"

const CATEGORIES : string[] = [
    "average",
    "fastest",
    "first"
]

const MODES = {
    "words" : [
        "10",
        "25",
        "50",
        "100"
    ],
    "time" : [
        "15",
        "30",
        "60",
        "120"
    ]
} as const

const MODE = [
    "words",
    "time"
] as const

const MODE2 = [
    "10",
    "25",
    "50",
    "100",
    "15",
    "30",
    "60",
    "120"
] as const

export type Mode = "words" | "time"
export type Mode2<M extends Mode = Mode> = (typeof MODES)[M][number]
export type Category = "average" | "fastest" | "first"
type DataProps = Record<Category, {
    [M in Mode]: Record<Mode2<M>, TypingResultProps>
}>
interface CardProps extends TypingResultProps, BaseComponentProps {}

interface TypingResultProps {
    timestamp : number
    wpm : number
    rawWpm : number
    accuracy : number
    mode : Mode
    mode2 : Mode2
    category : Category
}

interface OptionProps<T extends string> extends BaseComponentProps{
    optionClassName? : string
    optionStyle? : React.CSSProperties
    items : readonly (string | number)[]
    value: T
    onValueChange: (value: T) => void
}

const results : DataProps = resultsData as DataProps

export default function MonkeyTypePart() {
    const [currentCategory, setCurrentCategory] = useState<Category>("fastest")
    const [currentMode, setCurrentMode] = useState<Mode>("words")
    const [currentMode2, setCurrentMode2] = useState<Mode2>("10") 
    const currentData = (results[currentCategory][currentMode] as Record<string, TypingResultProps>)[currentMode2]

    const changeMode = (mode: Mode) => {
        setCurrentMode(mode)
        setCurrentMode2(MODES[mode][0])
    }

    return (
        <div className="flex flex-col-reverse items-center gap-4">
            <div className="flex flex-col w-sm gap-2">
                <Options items={CATEGORIES} value={currentCategory} onValueChange={setCurrentCategory} />
                <Options items={MODE} value={currentMode} onValueChange={changeMode} />
                <Options items={MODES[currentMode]} value={currentMode2} onValueChange={setCurrentMode2} />
            </div>

            {currentData ? (
                <Card {...currentData} category={currentCategory} />
            ) : (
                <p>
                    no current data
                </p>
            )}
        </div>
    )
}

function Options<T extends string>({ items, className, style, overrideClassName, value, onValueChange, optionClassName, optionStyle } : OptionProps<T>) {
    return (
        <select style={style} className={overrideClassName ? className : twMerge("border p-2 rounded-lg text-lg text-center", className)} value={value} onChange={(e) => onValueChange(e.target.value as T)}>
            {items.map((name) => (
                <option value={name} className={twMerge("bg-root-bg text-root-fg rounded-lg", optionClassName)} style={optionStyle} >
                    {name}
                </option>
            ))}
        </select>
    )
}

function useCountUp(target : number, duration : number = 1000) {
    const [value, setValue] = useState<number>(0)

    useEffect(() => {
        const start = performance.now()
        let frame : number

        const tick = (now : number) => {
            const t = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - t, 10)

            setValue(Math.round(target * eased))

            if (t < 1) {
                frame = requestAnimationFrame(tick)
            }
        }

        frame = requestAnimationFrame(tick)

        return () => cancelAnimationFrame(frame)
    }, [target, duration])

    return value
}

function Card({ timestamp, wpm, rawWpm, accuracy, mode, mode2, category, overrideClassName, className, style, ...rest } : CardProps) {
    const displayWpm = useCountUp(wpm, 2000)
    const displayAcc = useCountUp(accuracy, 2000)
    
    const [categoryIndex, setCategoryIndex] = useState<number>(0)
    const [modeIndex, setModeIndex] = useState<number>(0)
    const [mode2Index, setMode2Index] = useState<number>(0)

    useEffect(() => {
        setCategoryIndex(CATEGORIES.indexOf(category))
        setModeIndex(MODE.indexOf(mode))
        setMode2Index(MODE2.indexOf(mode2))
    }, [category, mode, mode2])

    return (
        <div style={style} className={overrideClassName ? className : twMerge("w-sm max-w-screen flex flex-col items-center gap-2 border-3 rounded-lg py-3 px-4", className)} {...rest} >
            <div className="relative flex gap-4 py-4 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full z-10 bg-linear-0 from-root-bg via-transparent to-root-bg" />

                <div className="relative">
                    <p className="opacity-0 pointer-events-none text-lg">
                        {CATEGORIES.reduce((a, b) => a.length >= b.length ? a : b)}
                    </p>

                    <div style={{"--y" : `${categoryIndex * -100}%`} as React.CSSProperties} className="absolute top-0 left-0 w-full h-full flex flex-col items-center translate-y-(--y) transition-transform duration-1000">
                        {CATEGORIES.map((name) => (
                            <div key={name} className="text-lg">
                                {name}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <p className="opacity-0 pointer-events-none text-lg">
                        {MODE.reduce((a, b) => a.length >= b.length ? a : b)}
                    </p>

                    <div style={{"--y" : `${modeIndex * -100}%`} as React.CSSProperties} className="absolute top-0 left-0 w-full h-full flex flex-col items-center translate-y-(--y) transition-transform duration-1000">
                        {MODE.map((name) => (
                            <div key={name} className="text-lg">
                                {name}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <p className="opacity-0 pointer-events-none text-lg">
                        {MODE2.reduce((a, b) => a.length >= b.length ? a : b)}
                    </p>

                    <div style={{"--y" : `${mode2Index * -100}%`} as React.CSSProperties} className="absolute top-0 left-0 w-full h-full flex flex-col items-center translate-y-(--y) transition-transform duration-1000">
                        {MODE2.map((name) => (
                            <div key={name} className="text-lg">
                                {name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* <p className="text-xl opacity-35">
                {mode} {mode2}
            </p> */}

            <div className="flex flex-col items-center gap-0">
                <p className="notranslate text-7xl font-black" translate="no">
                    {displayWpm}
                </p>

                <span className="text-lg opacity-35 -my-1" >
                    wpm
                </span>
            </div>

            <p className="text-4xl font-bold opacity-75">
                <span className="notranslate" translate="no">
                    {displayAcc}
                </span>

                <span>
                    %
                </span>
            </p>
        </div>
    )
}