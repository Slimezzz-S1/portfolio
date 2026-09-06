import { navData } from "@/App"

export interface navProps {
	name : string
	Icon : React.FunctionComponent<React.SVGProps<SVGSVGElement>>
	idElement : string
	summary? : string
}

interface appNavProps {
	navList? : navProps[]
}

function Nav({ name, Icon, idElement, summary } : navProps) {
	return (
		<a className="relative flex gap-2 justify-start border-l-3 px-3 py-2 items-center overflow-hidden group" title={summary} href={"#" + idElement} onClick={( e ) => { e.preventDefault() }}>
			<div className="absolute top-0 left-0 w-2/3 h-full bg-linear-90 from-root-fg/50 to-none transition-transform translate-x-[-30%] group-hover:translate-x-0" />

			<Icon className="aspect-square w-10" />

			<h2 className="font-bold text-xl">
				{name}
			</h2>
		</a>
	)
}

export default function AppNav({ navList = navData } : appNavProps) {
	return (
		<nav className="flex flex-col p-4 gap-4">
			{navList.map(( item, index ) => ( <Nav key={index} name={item.name} Icon={item.Icon} summary={item.summary} idElement={item.idElement} /> ))}
		</nav>
	)
}