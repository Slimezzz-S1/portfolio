
// ASSETS
import Logo from "@icons/favicon.svg?react"

// COMPONENTS
import usePage from "@/lib/usePage"
import AppNav from "@/components/main/PageNav"
import React, { useEffect, useState, useRef } from "react"
import { useLocation, useNavigate } from "react-router"
import { PageHeaderNav } from "@mainComponents/PageNav"
import { createPortal } from "react-dom"
import { Outlet } from "react-router"
import { animate } from "animejs"
import { Suspense } from "react"

interface AppBurgerProps {
    onClick? : () => void
    isToggled? : boolean
}

interface AppSidebarProps {
	posY : number
	onClick? : () => void
	isToggled? : boolean
}


export function AppLayout() {
    const page = usePage()

    return (
        <>
        {page?.name && (
            <title>
                {page.name}
            </title>
        )}
        {page?.description && (
            <meta name="description" content={page.description} />
        )}
        <AppHeader />
        
        <main className="flex min-h-[calc(100vh-170px)]">
            <Suspense fallback={null}>
                <Outlet />
            </Suspense>
        </main>

        <AppFooter />
        </>
    )
}


export function AppHeader() {
	const [isHidden, setIsHidden] = useState<boolean>(false)
	const [isSidebarToggled, setIsSidebarToggled] = useState<boolean>(false)
	const rootRef = useRef<HTMLDivElement | null>(null)
	const [currentEmptyHeight, setCurrentEmptyHeight] = useState<number>(0)
	const [isSidebarToggledOnce, setIsSidebarToggledOnce] = useState<boolean>(false)

	useEffect(() => {
		if (isSidebarToggled) {
			setIsHidden(false)
			setIsSidebarToggledOnce(true)

			return
		}

		let lastScroll : number = 0

		const onScroll = () => {
			if (window.scrollY > lastScroll) {
				setIsHidden(true)
			} else {
				setIsHidden(false)
			}

			lastScroll = window.scrollY

			return
		}

		document.addEventListener("scroll", onScroll)

		return () => {
			document.removeEventListener("scroll", onScroll)
		}
	}, [isSidebarToggled])

	useEffect(() => {
		if (!rootRef.current) return
		
		setCurrentEmptyHeight(rootRef.current.getBoundingClientRect().height)
	}, [])

	return (
		<>
        <div style={{"--height" : currentEmptyHeight + "px"} as React.CSSProperties} className="h-(--height)" />

        <div ref={rootRef} style={{"--y" : isHidden ? "-100%" : "0%"} as React.CSSProperties} className="fixed top-0 left-0 z-100 transition-transform translate-y-(--y) w-full">
            <div className="relative">
                <div className="absolute top-0 left-0 w-full h-full -z-1 bg-rainbow-gradient animate-rainbow" />

                <p className="text-center text-lg">
                    Work in progress
                </p>
            </div>

            <header className="relative bg-root-bg border-b-2 px-6 py-3 flex justify-between">
                <HeaderLogo />

                <div className="absolute top-0 left-0 w-full h-full p-[inherit] hidden lg:flex justify-center pointer-events-none">
                    <PageHeaderNav className="pointer-events-auto" />
                </div>

                <AppBurger onClick={() => setIsSidebarToggled(!isSidebarToggled)} isToggled={isSidebarToggled} />		
            </header>
        </div>

        {isSidebarToggledOnce && (
            <AppSidebar posY={rootRef.current?.getBoundingClientRect().height ?? 0} onClick={() => setIsSidebarToggled(!isSidebarToggled)} isToggled={isSidebarToggled} />
        )}
		</>
	)
}

function HeaderLogo() {
	const { key } = useLocation()
	const navigate = useNavigate()

    const onBack = () => {
        if (key !== "default")  navigate(-1)
        else navigate("/", { replace : true })
    }

	return (
		<div className="flex items-center text-root-fg gap-2 cursor-pointer" onClick={onBack}>
			<Logo className="w-11 h-11 aspect-square" />

			<h1 className="font-black text-4xl">
				Portfolio
			</h1>
		</div>
	)
}

export function AppFooter() {
    return (
        <footer className="bg-root-bg border-t-2 border-dashed p-8 w-full">
            &copy;2026 SlimeZZZ        
        </footer>
    )
}

export function AppSidebar({ posY, onClick, isToggled } : AppSidebarProps) {
	const sidebarRef = useRef<HTMLDivElement>(null)
	const [isHidden, setIsHidden] = useState<boolean>(true)

	useEffect(() => {
		if (!sidebarRef.current) return

		if (isToggled) {
			// setIsHidden(true)
			animate(sidebarRef.current, {
				x : ["100%", "0"],
				duration : 400,
				ease : "outExpo",
				onBegin : () => {
					setIsHidden(false)
				}
			})
		} else {
			animate(sidebarRef.current, {
				x : ["0", "100%"],
				duration : 400,
				ease : "outExpo",
				onComplete : () => {
					setIsHidden(true)
				}
			})
		}

		return
	}, [isToggled])

	return createPortal(
		<aside ref={sidebarRef} style={{ "--y" : (posY ?? "0") + "px", "opacity" : isHidden ? "0" : "1"} as React.CSSProperties} className="fixed top-(--y) right-0 w-full md:w-1/2 lg:w-fit lg:min-w-96 h-[calc(100%-var(--y))] z-100 bg-root-bg md:border-l-3 flex flex-col justify-between p-4 opacity-(--opacity)">
			<div />
			
			<AppNav onClick={onClick} />

			<div className="flex justify-between items-center border-t-2  py-2">
				<h2 className="text-2xl font-bold">
					SlimeZZZ
				</h2>

				<h2 className="text-2xl font-bold">
					2026
				</h2>
			</div>
		</aside>,
		document.querySelector("#root")!
	)
}


export function AppBurger({ onClick, isToggled } : AppBurgerProps) {
    const handleOnClick = () => {
        onClick?.()
    }

    return (
        <div style={{"--rotation" : isToggled ? "90deg" : "0deg"} as React.CSSProperties} className="flex flex-col justify-around w-12 px-1 aspect-square group h-12 transition-transform rotate-(--rotation)" onClick={handleOnClick}>
            {Array.from({ length : 3 }).map((_, index) => (
                <div style={{"--y" : index == 0 ? "-100%" : index == 2 ? "100%" : "0"} as React.CSSProperties} key={index} className="p-0.5 bg-root-fg rounded-2xl transition-transform group-hover:translate-y-(--y)" />
            ))}
        </div>
    )
}
