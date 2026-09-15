export default function TodosSection() {
	return (
		<section className="p-8 flex flex-col gap-4">
			<h1 className="font-black text-7xl">
				Todos
			</h1>

			<div className="border border-dashed" />

			<div>
				<ol className="flex flex-col gap-4">
					{todoItemList.map((item, index) => (
						<TodoItem
							key={index}
							name={item.name}
							description={item.description}
							isChecked={item.isChecked}
						/>
					))}
				</ol>
			</div>
		</section>
	)
}

const todoItemList : todoItemProps[] = [
	{
		name : "Create 3D Animation",
		// description : "Create a stunning animation in Blender",
		isChecked : true
	},
	{
		name : "Be a furry",
		description : "NO!",
		isChecked : false
	},
	{
		name : "Become crazy",
		description : "Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy. Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.",
		isChecked : true
	},
	{
		name : "Make a short movie",
		description : "A movie about liminal space",
		isChecked : "halfway"
	}
]

interface todoItemProps {
	name : string
	description? : string
	isChecked : boolean | "halfway"
}

export function TodoItem({ name, description, isChecked } : todoItemProps) {
	return (
		<div className="grid grid-cols-[3rem_1fr] gap-x-4">
			<div className={"w-12 h-12 aspect-square border-2 rounded-lg" + " " + (
				typeof isChecked === "boolean" && isChecked ? "bg-root-fg" :
				isChecked === "halfway" ? "bg-hatch" :
				"bg-none"
			)} />

			<h2 className="text-2xl font-bold self-center">
				{name}
			</h2>

			{description && (
				<div className="flex items-center gap-2 col-start-2">
					<div className="min-w-4 aspect-square border-b-2 border-l-2 rounded-bl-xl mb-3 mt-1 self-start" />

					<p>
						{description}
					</p>
				</div>
			)}
		</div>
	)
}