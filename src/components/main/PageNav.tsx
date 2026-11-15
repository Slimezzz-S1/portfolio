import type { BaseComponentProps } from "@/lib/BaseComponentProps"
import usePage from "@/lib/usePage"
import { twMerge } from "tailwind-merge"

export interface NavProps {
	name : string
	Icon : React.FunctionComponent<React.SVGProps<SVGSVGElement>>
	idElement : string
	summary? : string
	element? : React.ReactElement | React.ReactElement[]
	options? : ScrollIntoViewOptions
	onClick? : () => void
}

interface PageNavProps extends BaseComponentProps {
	navList? : NavProps[]
	onClick? : () => void
}

function NavBig({ name, Icon, idElement, summary, options, onClick } : Omit<NavProps, "element">) {
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

export default function PageNav({ navList, onClick, className, style, overrideClassName, ...rest} : PageNavProps) {
	const page = usePage()
	const nav  = page?.nav ?? (navList ?? [])

	return (
		<nav style={style} className={overrideClassName ? className : twMerge("flex flex-col p-4 gap-4", className)} {...rest}>
			{nav.map((item, index) => (
				<NavBig key={index} {...item} />
			))}
		</nav>
	)
}

export function PageHeaderNav({navList, onClick, className, style, overrideClassName, ...rest} : PageNavProps) {
	const page = usePage()
	const nav = page?.nav ?? (navList ?? [])


	return (
		<nav style={style} className={overrideClassName ? className : twMerge("flex gap-4", className)} {...rest}>
			{nav.map((item, index) => (
				<div
					key={index}
					className="group relative text-xl cursor-pointer px-1 hover:px-3 transition-all min-w-[3em] h-full flex overflow-hidden"
					onClick={(e) => {
						e.preventDefault()

				onClick?.()

				if (!document.querySelector("#" + item.idElement)) return

				document.querySelector("#" + item.idElement)?.scrollIntoView(item.options ?? { behavior : "smooth", block : "center" })
					}}
				>
					<div className="self-center text-center w-full z-2">
						{item.name}
					</div>


					<div className="absolute bottom-0 left-0 w-full h-0.5 bg-white" />

					<div className="absolute top-0 left-0 w-full h-full bg-linear-to-t from-root-fg/50 to-transparent to-70% z-0 translate-y-1/3 group-hover:translate-y-0 transition-transform pointer-events-none" />
				</div>
			))}
		</nav>
	)
}