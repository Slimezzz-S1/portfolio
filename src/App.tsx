// built-in components


// sections
import MainHero from "@/sections/MainHero"
import BuiltWith from "@/sections/BuiltWith"
import Summary from "@/sections/Summary"
import Todos from "@/sections/Todos"
import ProjectSection from "@/sections/ProjectSection"

// components
import AppHeader from "./components/main/AppHeader"
import InteractiveCard from "./components/InteractiveCard"

export default function App() {
	return (
		<>
			<section className="md:max-w-3xl lg:max-w-7xl mx-auto xl:border-x-3 xl:border-dashed xl:border-x-root-fg/50">
				<AppHeader />

				<MainHero />
				
				<BuiltWith />

				<Summary />

				<Todos />

				<ProjectSection />

				<section className="p-8">
					<InteractiveCard />
				</section>

				<section className="w-full h-32 flex items-center justify-center bg-gray-900 border-y">
					<p className="text-3xl font-bold">
						Work in progress
					</p>
				</section>
			</section>
		</>
	)
}