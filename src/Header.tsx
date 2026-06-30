import { useEffect, useRef, useState } from 'react'
import HeaderLogo from './assets/logo.svg?react'

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const lastScroll = useRef(0)
    const [isHover, setIsHover] = useState(false)
    const [isOpened, setIsOpened] = useState(false)

    useEffect(() => {
        const handleScroll : () => void = () => {
            const current = window.scrollY

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
    }, [])
    
    return (
        <header
        className={
            "fixed w-screen top-0 left-0 bg-background z-50 py-1 px-8 flex items-center justify-between h-24 border-b transition-transform "
            + (isScrolled ? "transform -translate-y-full" : "")}>
            <div className='flex items-center'>
                <HeaderLogo className='w-10 h-auto' />

                <p className="text-4xl font-black">
                    Portfolio
                </p>
            </div>

            <div className="flex flex-col justify-between gap-2" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} onClick={() => setIsOpened(!isOpened)}>
                <div className={"w-10 h-1.5 bg-blue-50 rounded-2xl transition-transform " + (isHover ? 'transform -translate-y-full' : "")}></div>
                <div className="w-10 h-1.5 bg-blue-50 rounded-2xl"></div>
                <div className={"w-10 h-1.5 bg-blue-50 rounded-2xl transition-transform " + (isHover ? 'transform -translate-y-[-100%]' : "")}></div>
            </div>
         </header>
    )
}