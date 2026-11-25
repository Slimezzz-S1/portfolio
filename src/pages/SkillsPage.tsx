// DATA
import Activities from "@/components/Activities"
import githubData from "@/constants/data/github.json"
import monkeytypeData from "@/constants/data/monkeytype.json"
import leetcodeData from "@/constants/data/leetcode.json"

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