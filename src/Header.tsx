import { useEffect, useRef, useState } from 'react'
import HeaderLogo from './assets/logo.svg?react'
import { createPortal } from 'react-dom'

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const lastScroll = useRef(0)
    const [isHover, setIsHover] = useState(false)
    const [isOpened, setIsOpened] = useState(false)

    useEffect(() => {
        const handleScroll : () => void = () => {
            const current = window.scrollY
            if (isOpened) return
            
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
        <>
            <header className={'sticky w-screen top-0 left-0 transition-transform z-50 '  + (isScrolled ? "transform -translate-y-full" : "")}>
                <div
                    className="flex items-center justify-center border-b border-gray-200 bg-gray-100 px-4 py-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                    <p className="text-center font-medium">
                        Cute little puppy!

                        <a href="https://www.youtube.com/watch?v=j5a0jTc9S10" className="ml-1 inline-block underline">
                            Click here
                        </a>
                    </p>
                </div>
                
                <div className="bg-background z-50 py-1 px-8 flex items-center justify-between h-24 border-b">
                    <div className='flex items-center gap-2'>
                        <HeaderLogo className='w-12 h-auto' />

                        <p className="text-4xl font-black">
                            Portfolio
                        </p>
                    </div>

                    <div
                        className={"flex flex-col justify-between gap-2 transition-transform " + (isOpened ? "transform -rotate-[-90deg]" : '')}
                        onMouseEnter={() => setIsHover(true)}
                        onMouseLeave={() => setIsHover(false)}
                        onClick={() => setIsOpened(!isOpened)}
                    >
                        <div className={"w-10 h-1.5 bg-blue-50 rounded-2xl transition-transform " + (isHover ? 'transform -translate-y-full' : "")}></div>
                        <div className="w-10 h-1.5 bg-blue-50 rounded-2xl"></div>
                        <div className={"w-10 h-1.5 bg-blue-50 rounded-2xl transition-transform " + (isHover ? 'transform -translate-y-[-100%]' : "")}></div>
                    </div>
                </div>
            </header>

            {isOpened && <Nav />}
        </>
    )
}

export function Nav() {
    return createPortal(
        <div className='fixed top-0 right-0 z-50 pt-34'>
            <nav className=''>
                Meow
            </nav>
        </div>,
        document.body
    )
}