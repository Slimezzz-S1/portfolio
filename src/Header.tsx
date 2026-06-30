export default function Header() {
    return (
        <header className="bg-none p-3 flex items-center justify-between">
            <p className="text-2xl font-black">
                Portfolio
            </p>

            <div className="flex flex-col justify-between gap-2">
                <div className="w-8 h-1.5 bg-blue-50 rounded-2xl"></div>
                <div className="w-8 h-1.5 bg-blue-50 rounded-2xl"></div>
                <div className="w-8 h-1.5 bg-blue-50 rounded-2xl"></div>
            </div>
         </header>
    )
}