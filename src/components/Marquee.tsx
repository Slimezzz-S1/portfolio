export default function Marquee({ children, className, isOverwriteClass = false, speed } : { children : React.ReactNode, className? : string, isOverwriteClass? : boolean, speed? : number}) {
    return (
        <div style={{"--speed" : (speed ?? "1") + "s"} as React.CSSProperties} className={isOverwriteClass && className ? "" : ("[--gap:2rem] relative flex overflow-hidden select-none " + (className ?? ""))}>
            <ul className="shrink-0 flex justify-around gap(--gap) min-w-full animate-[scroll_var(--speed)_linear_infinite]">
                {children}
            </ul>

            <ul aria-hidden="true" className="shrink-0 flex justify-around gap(--gap) min-w-full animate-[scroll_var(--speed)_linear_infinite]">
                {children}
            </ul>
        </div>
    )
}
