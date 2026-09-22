// built-in components


// sections
import MainHeroSection from "@/sections/MainHeroSection"
import BuiltWithSection from "@/sections/BuiltWithSection"
import SummarySection from "@/sections/SummarySection"
import TodosSection from "@/sections/TodosSection"
import ProjectSection from "@/sections/ProjectSection"
import GallerySection from "@/sections/GallerySection"
import EpicSection from "./sections/EpicSection"

// components
import AppHeader from "@/mainComponents/AppHeader"
import AppFooter from "@/mainComponents/AppFooter"
import { type navProps } from "@/components/main/AppNav"

import HomeIcon from "@/assets/icons/Nav/akar-icons--home-alt1.svg?react"
import CheckIcon from "@/assets/icons/Nav/akar-icons--check-box.svg?react"
import InfoIcon from "@/assets/icons/Nav/boxicons--info-circle.svg?react"
import ProjectIcon from "@/assets/icons/Nav/octicon--project-roadmap-16.svg?react"

export const navData : navProps[] = [
	{
		name : "Home",
		Icon : HomeIcon,
		idElement : "home",
	},
	{
		name : "About Me",
		Icon : InfoIcon,
		idElement : "about",
	},
	{
		name : "Goals",
		Icon : CheckIcon,
		idElement : "goals",
	},
	{
		name : "Project",
		Icon : ProjectIcon,
		idElement : "project",
	},
]

export default function App() {
	return (
		<>

			<section className="md:max-w-3xl lg:max-w-7xl mx-auto xl:border-x-3 xl:border-dashed xl:border-x-root-fg/50">
				<AppHeader />

				<div id="home">
					<MainHeroSection />
				</div>

				<BuiltWithSection />

				<EpicSection />

				<div id="about">
					<SummarySection />
				</div>

				<div id="goals">
					<TodosSection />
				</div>


				<div id="project">
					<ProjectSection />
				</div>
				
				<section className="w-full h-32 flex items-center justify-center bg-gray-900 border-y">
					<p className="text-3xl font-bold">
						Work in progress
					</p>
				</section>

				<GallerySection />

				<AppFooter />

			</section>
		</>
	)
}