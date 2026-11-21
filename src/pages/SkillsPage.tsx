// COMPONENTS
import Activities from "@/components/Activities"
import githubData from "@/constants/github-data.json"
import monkeytypeData from "@/constants/monkeytype-data.json"
import leetcodeData from "@/constants/leetcode-data.json"
import { useNavigate } from "react-router"

export default function SkillsPage() {
    const navigate = useNavigate()

    const onClick = () => {
        navigate("/")
    }

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