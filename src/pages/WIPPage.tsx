import { useLocation, useNavigate } from "react-router"
import Button from "@/components/Button"

export default function WIPPage() {
    const { key } = useLocation()
    const navigate = useNavigate()

    const onBack = () => {
        if (key !== "default")  navigate(-1)
        else navigate("/", { replace : true })
    }
    
    return (
        <section className="w-full flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-4 text-center border-3 p-6 rounded-2xl">
                <h1 className="font-mono text-4xl font-bold">
                    WORK IN PROGRESS
                </h1>

                <p>
                    Please be patient...
                </p>

                <Button onClick={onBack} text="Go back" />
            </div>
        </section>
    )
}