// built-in components


// sections
import MainHeroSection from "@/sections/MainHeroSection"
import BuiltWithSection from "@/sections/BuiltWithSection"
import SummarySection from "@/sections/SummarySection"
import TodosSection from "@/sections/TodosSection"
import ProjectSection from "@/sections/ProjectSection"
import GallerySection from "@/sections/GallerySection"
import GambleSection from "@/sections/GambleSection"
import EpicSection from "./sections/EpicSection"
import { InfiniteCarousel } from "@/sections/GambleSection"

// components
import AppHeader from "@/components/main/AppHeader"
import InteractiveCard from "@/components/InteractiveCard"
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
		name : "Project",
		Icon : ProjectIcon,
		idElement : "project",
	},
	{
		name : "Goals",
		Icon : CheckIcon,
		idElement : "goals",
	},
]

export default function App() {
	return (
		<>

			<section className="md:max-w-3xl lg:max-w-7xl mx-auto xl:border-x-3 xl:border-dashed xl:border-x-root-fg/50">
				<AppHeader />

				<MainHeroSection />
				
				<BuiltWithSection />

				<EpicSection />

				<SummarySection />

				<TodosSection />

				<ProjectSection />

				<section className="p-8">
					<InteractiveCard />
				</section>

				<GambleSection />

				<GallerySection />

				<section className="w-full h-32 flex items-center justify-center bg-gray-900 border-y">
					<p className="text-3xl font-bold">
						Work in progress
					</p>
				</section>
			</section>
		</>
	)
}