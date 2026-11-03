import Activities from "@/sections/skills/Activities"
import githubData from "@/data/github/results.json"


export default function SkillsPage() {
    return (
        <section className="w-full">
            Skills

            <Activities days={githubData.days} />
        </section>
    )
}