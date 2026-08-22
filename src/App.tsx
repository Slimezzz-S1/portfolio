import { useEffect, useRef, type ReactNode } from 'react'

import Header from '@/Header'
import Footer from '@/Footer'

import Hero from '@/sections/Hero'
import About from '@/sections/About'
import Skill from '@/sections/Skill'
import BuildWith from '@/sections/BuildWith'
import Projects from '@/sections/Project'
import Gallery from '@/sections/Gallery'
import TimelineSection from '@/sections/Timeline'
import GoalSection from '@/sections/Goals'
import Grid from './sections/Grid'

import Marquee from '@/components/Marquee'
import WaterDotGrid from '@/components/WaterDotGrid'
import { OnePanel } from '@/components/TwoPanels'
import Carousel from '@/components/Carousels'
import { type navSectionProps } from '@/Header'

import homeIcon from "@/icons/nav/material-symbols--home-rounded.svg?react"
import projectIcon from "@/icons/nav/eos-icons--project.svg?react"
import goalsIcon from "@/icons/nav/material-symbols--checklist-rounded.svg?react"
import skillIcon from "@/icons/nav/material-symbols--home-rounded.svg?react"
import galleryIcon from "@/icons/nav/material-symbols--photo.svg?react"
import timelineIcon from "@/icons/nav/material-symbols--timeline.svg?react"
import aboutIcon from "@/icons/nav/mdi--about.svg?react"

export default App

export const navSectionData : navSectionProps[] = [
    {
        name : "Home",
        Icon : homeIcon,
        id : "main"
    },
    {
        name : "About",
        Icon : aboutIcon,
        id : "about"
    },
    {
        name : "Skills",
        Icon : skillIcon,
        id : "skills"
    },
    {
        name : "Projects",
        Icon : projectIcon,
        id : "projects"
    },
    {
        name : "Timeline",
        Icon : timelineIcon,
        id : "timeline"
    },
    {
        name : "Goals",
        Icon : goalsIcon,
        id : "goals"
    },
    {
        name : "Gallery",
        Icon : galleryIcon,
        id : "gallery"
    }
]

function App() {
	const sectionRefs = useRef<HTMLDivElement[]>([])

	useEffect(() => {
		if (!sectionRefs) return

		const observerOptions = {
			rootMargin : "0px",
			threshold : 0.5
		}

		const observerCallback : ( entries : IntersectionObserverEntry[], observer : IntersectionObserver) => void = (entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {

				}
			})
		}

		const observer = new IntersectionObserver(observerCallback, observerOptions)

		sectionRefs.current.forEach((section) => {
			observer.observe(section)
		})

		return () => {observer.disconnect()}
	}, [])

	return (
		<>
			<Header navSections={navSectionData} />

			<div id='main'>
				<Hero />
			</div>

			<Marquee className="border-y py-2 my-12 lg:my-2 [--x:-100%]" speed={20}>
					{Array.from({ length : 4}).map((_item, index) => (
						<p key={index} className='text-1xl'>
							Work In Progress
						</p>
					))}
			</Marquee>

			<BuildWith />

			<OnePanel>
				<section className='relative py-10 flex justify-center'>
					<WaterDotGrid className='w-full max-w-5xl aspect-video' />

					<div className='absolute top-0 left-0 w-full h-full flex justify-center items-center mix-blend-difference'>
						<h1 className='text-8xl font-black text-white flex gap-3'>
							3D ARTIST
						</h1>
					</div>

					<div className='absolute top-0 left-0 w-full h-full z-20 bg-radial from-none from-50% to-80% to-black' />
				</section>
			</OnePanel>

			<div className='flex flex-col gap-12 max-w-7xl mx-auto px-8 2xl:px-0'>

				{/* <Danger /> */}

				<div id='about'>
					<About />
				</div>

				<div id='skills'>
					<Skill />
				</div>

				<div id='projects'>
					<Projects />
				</div>

				<div id='timeline'>
					<TimelineSection />
				</div>

				<div id='goals'>
					<GoalSection />
				</div>

				<Grid />

				<div id='gallery'>
					<Gallery />
					<Carousel />
				</div>

			</div>

			<Footer />
		</>
	)
}
