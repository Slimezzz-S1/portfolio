// COMPONENTS
import type { componentProps } from "@/libs/componentProps"

export type textDirection = "start" | "end" | "center"

interface sectionProps extends componentProps {
    title : string
    titleDirection? : textDirection
    isAnimatable? : boolean

}

interface sectionTitleProps extends componentProps {
    text : string
    direction? : textDirection
}

export function SectionTitle({ text, className, style, direction, overrideClassName } : Omit<sectionTitleProps, "overrideStyle">) {
    return (
        <div style={style} className={overrideClassName ? className :  "relative my-4 pb-4 px-4" + " " + className}>
            <div className="absolute top-0 left-0 w-full h-full bg-hatch mask-b-to-transparent rounded-t-xl pointer-events-none z-[-1]">
                <div className={"w-full h-full" + " " + (direction === "end" ? "bg-linear-270 from-root-bg to-transparent" : direction === "center" ? "bg-linear-90 from-root-bg via-transparent to-root-bg" : "bg-linear-90 from-root-bg to-transparent")} />
            </div>

            <h2 className={"md:text-8xl sm:text-7xl text-5xl md:text-stroke-md text-stroke-sm text-transparent" + " " + ((direction === "end" ? "text-end" : direction === "center" ? "text-center" : "text-start"))}>
                {text}
            </h2>
        </div>
    )
}

export default function Section({ title, titleDirection = "start", className, style, overrideClassName, overrideStyle } : sectionProps) {
    return (
        <section style={overrideStyle ? style : {...style, ...{} as React.CSSProperties}} className={overrideClassName ? className : className + " " + ""}>
            <SectionTitle text={title} direction={titleDirection} />
        </section>
    )
}