interface Activities {
    days : Record<string, number>
}

export default function Activities({ days } : Activities) {
    return (
        // <div className="grid grid-rows-7 grid-flow-col">
        //     {Object.entries(days).map(([date, count]) => (
        //         <div style={{"--opacity" : (
        //             count == 0 ? "0.1" :
        //             count == 1 ? "0.25" :
        //             count > 1 && count < 4 ? "0.5" :
        //             count > 4 && count < 8 ? "0.75" :
        //             "1"
        //         )} as React.CSSProperties} key={date} className="opacity-(--opacity)">
        //             {/* {count} */}
        //             {date.split("-")[2]}
        //         </div>
        //     ))}
        // </div>
        <div className="grid grid-rows-7 grid-flow-col gap-0.5 w-full overflow-x-scroll p-2">
            {Array.from({ length : 365 }).map((_, index) => (
                <div key={index} style={{"--opacity" : (Math.random() * index) % 1} as React.CSSProperties} className="bg-white w-2.5 h-2.5 opacity-(--opacity) rounded-xs" />
            ))}
        </div>
    )
}