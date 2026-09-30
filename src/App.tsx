// built-in components


// sections
import MainHeroSection from "@/sections/MainHeroSection"
import BuiltWithSection from "@/sections/BuiltWithSection"
import SummarySection from "@/sections/SummarySection"
import TodosSection from "@/sections/TodosSection"
import ProjectSection from "@/sections/ProjectSection"
import GallerySection from "@/sections/GallerySection"
import EpicSection from "@/sections/EpicSection"
import SkillSection from "@/sections/SkillSection"

// components
import AppHeader from "@/mainComponents/AppHeader"
import AppFooter from "@/mainComponents/AppFooter"
import { type navProps } from "@/components/main/AppNav"

import HomeIcon from "@/icons/nav/akar-icons--home-alt1.svg?react"
import InfoIcon from "@/icons/nav/boxicons--info-circle.svg?react"
import SkillIcon from "@/icons/nav/carbon--skill-level-advanced.svg?react"
import GoalIcon from "@/icons/nav/akar-icons--check-box.svg?react"
import ProjectIcon from "@/icons/Nav/octicon--project-roadmap-16.svg?react"
import GalleryIcon from "@/icons/nav/boxicons--gallery-vertical-end-filled.svg?react"

export const navData : navProps[] = [
	{
		name : "Home",
		Icon : HomeIcon,
		idElement : "home",
		options : {
			behavior : "smooth",
			block : "start"
		}
	},
	{
		name : "About Me",
		Icon : InfoIcon,
		idElement : "about",
		options : {
			behavior : "smooth",
			block : "start"
		}
	},
	{
		name : "Skills",
		Icon : SkillIcon,
		idElement : "skill",
		options : {
			behavior : "smooth",
			block : "start"
		}
	},
	{
		name : "Goals",
		Icon : GoalIcon,
		idElement : "goals",
	},
	{
		name : "Project",
		Icon : ProjectIcon,
		idElement : "project",
	},
	{
		name : "Gallery",
		Icon : GalleryIcon,
		idElement : "gallery",
		options : {
			behavior : "smooth",
			block : "start"
		}
	},
]

export default function App() {
	return (
		<>

			<section className="md:max-w-3xl lg:max-w-7xl mx-auto xl:border-x-3 xl:border-dashed xl:border-x-root-fg/50">

				<div id="home">
					<AppHeader />

					<MainHeroSection />
				</div>

				<BuiltWithSection />

				<EpicSection />

				<div id="about">
					<SummarySection />
				</div>

				<div id="skill">
					<SkillSection />
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

				<div id="gallery">
					<GallerySection />
				</div>

				<AppFooter />

			</section>
		</>
	)
}