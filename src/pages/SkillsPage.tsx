import Activities from "@/components/Activities"
import githubData from "@/data/github/results.json"
import monkeytypeData from "@/data/monkeytype/results.json"
import leetcodeData from "@/data/leetcode/results.json"

export default function SkillsPage() {
    return (
        <section className="w-full">
            <h1 className="text-2xl font-bold">
                Skills
            </h1>

            <Activities days={githubData.results} />
            <Activities days={monkeytypeData.results} />
            <Activities days={leetcodeData.results} />
        </section>
    )
}