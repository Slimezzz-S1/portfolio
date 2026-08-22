import { useEffect, useRef, useState, type FunctionComponent } from 'react'
import HeaderLogo from './assets/logo.svg?react'
import { animate } from 'animejs'


import UnknownIcon from "@/icons/language/material-symbols--question-mark.svg?react"
interface headerProps {
	navSections : navSectionProps[]
}

export default function Header({ navSections } : headerProps) {
	const [isScrolled, setIsScrolled] = useState<boolean>(false)
	const lastScroll = useRef<number>(0)
	const [isHover, setIsHover] = useState<boolean>(false)

	const [isToggled, setIsToggled] = useState<boolean>(false)
	const [isNavVisible, setIsNavVisible] = useState<boolean>(false)
	const [isClosing, setIsClosing] = useState<boolean>(false)

	const handleNavOnClose = () => {
		setIsNavVisible(false)
	}

	useEffect(() => {
		if (isToggled) {
			setIsNavVisible(true)
			setIsClosing(false)
		}

		if (!isToggled) {
			setIsClosing(true)
		}
	}, [isToggled])

	useEffect(() => {
		if (isNavVisible) return

		const handleScroll : () => void = () => {
			const current = window.scrollY
			if (isToggled) return
			
			if (current > lastScroll.current) {
				setIsScrolled(true)
			} else {
				setIsScrolled(false)
			}

			lastScroll.current = current
			// console.log(lastScroll.current)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [isNavVisible])
	
	return (
		<div className='fixed z-100 w-screen h-screen flex flex-col items-end pointer-events-none'>
				<header className={'sticky w-screen top-0 left-0 transition-transform z-100 pointer-events-auto '  + (isScrolled ? "transform -translate-y-full" : "")}>
					<div className="bg-background z-50 py-1 px-8 flex items-center justify-between h-24 border-b">
						<div className='flex items-center gap-2'>
							<HeaderLogo className='w-12 h-auto' />

							<p className="text-4xl font-black">
								Portfolio
							</p>
						</div>

						<div
							className={"flex flex-col justify-between gap-2 transition-transform " + (isToggled ? "transform -rotate-[-90deg]" : '')}
							onMouseEnter={() => setIsHover(true)}
							onMouseLeave={() => setIsHover(false)}
							onClick={() => setIsToggled(!isToggled)}
						>
							<div className={"w-10 h-1.5 bg-blue-50 rounded-2xl transition-transform " + (isHover ? 'transform -translate-y-full' : "")} />
							<div className="w-10 h-1.5 bg-blue-50 rounded-2xl" />
							<div className={"w-10 h-1.5 bg-blue-50 rounded-2xl transition-transform " + (isHover ? 'transform -translate-y-[-100%]' : "")} />
						</div>
					</div>
				</header>
			
			{isNavVisible && <Nav isClosing={isClosing} onClose={handleNavOnClose} navSections={navSections} />}
		</div>
	)
}

export interface navSectionProps {
	name : string
	Icon : FunctionComponent
	id : string	
}

interface navProps {
	isClosing: boolean
	onClose: () => void
	navSections : navSectionProps[]
}

export function Nav({ isClosing, onClose, navSections } : navProps) {
	const navRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!isClosing) return

		animate(navRef.current!, {
			x : [
				"0",
				"100%"
			],
			duration : 375,
			ease : "outQuint",
			onComplete : onClose
		})
	}, [isClosing])

	useEffect(() => {
		if (!navRef.current) return

		animate(navRef.current!, {
			x : [
				"100%",
				"0"
			],
			duration : 370,
			ease : "outQuint"
		})
	} ,[])

	return (
			<div ref={navRef} className='bg-background w-full lg:w-128 h-full border-l pointer-events-auto flex flex-col justify-between p-8'>
				<div />
				
				<nav className='flex flex-col gap-4 w-full items-start'>
					{navSections.map((item) => (
						<NavSection key={item.id} name={item.name} Icon={item.Icon} id={item.id} />
					))}
				</nav>

				<div>
					<p className='font-bold text-2xl'>
						Made with React.js
					</p>
				</div>
			</div>
	)
}

function NavSection({name, Icon, id, onClick} : navSectionProps & {onClick? : () => void}) {

	const handleOnClick = () => {
		if (!document.getElementById(id)) return

		document.getElementById(id)?.scrollIntoView({ behavior : "smooth" })

		onClick?.()
	}

	return (
		<div className='group relative border-l-4 flex items-center gap-4 pl-4 h-14' onClick={handleOnClick}>
			<div className='absolute top-0 left-0 w-32 h-full bg-linear-to-r from-gray-600 group-hover:to-50% transition-colors to-none to-25%' />

			<div className='w-12 aspect-square z-10 group-hover:scale-110 transition-transform'>
				{Icon ? <Icon /> : <UnknownIcon />}
			</div>

			<h3 className='text-2xl z-10'>
				{name}
			</h3>
		</div>
	)
}