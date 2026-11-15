import Activities, { type ActivitiesProps } from "@/components/Activities"


interface StatsProps extends ActivitiesProps {
    title : string
}

export default function Stats({ days, title } : StatsProps) {
    return (
        <div>
            <h1>
                {title}
            </h1>

            <Activities days={days} />
        </div>
    )
}