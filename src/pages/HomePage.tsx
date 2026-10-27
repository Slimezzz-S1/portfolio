// COMPONENTS
import HeroSection from "@/sections/home-page/HeroSection"
import BuiltWithSection from "@/sections/home-page/BuiltWithSection"
// import SummarySection from "@/sections/SummarySection"
import AboutMeSection from "@/sections/home-page/AboutMeSection"
import TodosSection from "@/sections/home-page/TodosSection"
import ProjectSection from "@/sections/home-page/ProjectSection"
import GallerySection from "@/sections/home-page/GallerySection"
import EpicSection from "@/sections/home-page/EpicSection"
import SkillSection from "@/sections/home-page/SkillSection"

export default function HomePage() {
	return (
		<>
		<section className="md:max-w-3xl lg:max-w-7xl w-full mx-auto xl:border-x-3 xl:border-dashed xl:border-x-root-fg/50">
			<div id="home">
				<HeroSection />
			</div>

			<BuiltWithSection />

			<EpicSection />

			<div id="about">
				<AboutMeSection />
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

			{/* <AppFooter /> */}

		</section>
		</>
	)
}