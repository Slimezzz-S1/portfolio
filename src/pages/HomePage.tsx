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

export default function HomePage() {
	return (
		<>
			<section className="md:max-w-3xl lg:max-w-7xl mx-auto xl:border-x-3 xl:border-dashed xl:border-x-root-fg/50">
				<div id="home">
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

				{/* <AppFooter /> */}

			</section>
		</>
	)
}