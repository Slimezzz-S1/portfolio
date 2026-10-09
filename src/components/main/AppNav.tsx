// DATA
import { navData } from "@/libs/data"

export interface NavProps {
	name : string
	Icon : React.FunctionComponent<React.SVGProps<SVGSVGElement>>
	idElement : string
	summary? : string
	element? : React.ReactElement | React.ReactElement[]
	options? : ScrollIntoViewOptions
	onClick? : () => void
}

interface AppNavProps {
	navList? : NavProps[]
	onClick? : () => void
	className? : string
	style? : React.CSSProperties
	overrideClassName? : boolean
}

function Nav({ name, Icon, idElement, summary, options, onClick } : Omit<NavProps, "element">) {
	return (
		<a 
			className="relative flex gap-2 justify-start border-l-3 px-3 py-2 items-center overflow-hidden group"
			title={summary}
			href={"#" + idElement}
			onClick={(e)  => {
				e.preventDefault()

				onClick?.()

				if (!document.querySelector("#" + idElement)) return

				document.querySelector("#" + idElement)?.scrollIntoView(options ?? { behavior : "smooth", block : "center" })
			}}
		>
			<div className="absolute top-0 left-0 w-full h-full bg-linear-90 from-root-fg/50 to-none transition-transform translate-x-[-30%] group-hover:translate-x-0" />

			<Icon className="aspect-square w-10" />

			<h2 className="font-bold text-xl">
				{name}
			</h2>
		</a>
	)
}

export default function AppNav({ navList = navData, onClick, className, style, overrideClassName = false } : AppNavProps) {
	return (
		<nav style={style} className={overrideClassName ? className :  "flex flex-col p-4 gap-4" + " " + className}>
			{navList.map(( item, index ) => ( <Nav key={index} name={item.name} Icon={item.Icon} summary={item.summary} idElement={item.idElement} onClick={onClick} options={item.options} /> ))}
		</nav>
	)
}