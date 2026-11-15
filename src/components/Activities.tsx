export interface ActivitiesProps {
    days : Record<string, number>
}

const LEVELS = [
    "bg-gray-900",
    "bg-gray-800",
    "bg-gray-700",
    "bg-gray-600",
    "bg-gray-500",
    "bg-gray-400",
    "bg-gray-300",
    "bg-gray-200",
    "bg-gray-100",
    "bg-gray-50",
]

export default function Activities({ days } : ActivitiesProps) {
    const padding = 4

    return (
        <div className="grid grid-rows-7 grid-flow-col gap-0.5 w-fit max-w-full overflow-x-auto p-2">
            {Array.from({ length : padding }).map((_, index) => (
                <div key={index} />
            ))}
            {Object.entries(days).map(([date, count], index) => (
                <div
                    key={index}
                    className={"w-2.5 h-2.5 rounded-xs" + " " + (
                        count > 9 ? LEVELS[LEVELS.length - 1] : LEVELS[count]
                    )}
                    title={date + "\n" + "amount : " + count}
                />
            ))}
        </div>
    )
}