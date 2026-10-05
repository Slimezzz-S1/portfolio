import { Outlet } from "react-router"

export default function AppLayout() {
    return (
        <>
        <main>
            <Outlet />
        </main>
        </>
    )
}