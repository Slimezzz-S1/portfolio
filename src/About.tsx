import { useEffect, useRef, useState, type ReactNode } from "react"

export interface AboutCardProps {
    title : ReactNode | string
    text : ReactNode | string
    className? : string
}

const aboutData : AboutCardProps[] = [
    {
        title : <h2 className="border-2 border-lime-300 px-4 font-bold text-4xl py-4 pb-8 mb-[-1rem] rounded-t-2xl"> Summary </h2>,
        className : "flex flex-col col-span-2 row-span-2 rounded-2xl",
        text : (
            <div className="bg-background flex flex-col gap-2 px-4 py-4 rounded-2xl border-2 border-lime-500 h-full flex-1 transition-transform">
                <p className="text-2xl">
                    I'm a 17 year old freshman studying Software Engineering
                </p>

                <p>
                    I first learnt 3D Animation through MineImator when I was in 5th grade or somewhere around that, i make several animations just for fun.
                    It kinda sucked though since I dont know 12 principles of animation. I started using blender in 8th grade, it was frustrating if not stressing because I didn't know how to use it.
                    I started improving in 9th as I created Minecraft Animations, then I made my first ever OC and finally understand how to make animations truly.
                </p>

                <p>
                    I also started learning Python in 9th grade, it was a simple text-based stupid questions, at the same time I learn HTML and CSS, it also sucks. But on the bright side, here I can do react and typescript now.
                </p>
            </div>
        )
    },
    {
        title : <h2 className="text-4xl font-bold px-4 py-2"> SE Student </h2>,
        className : "border-2 border-foreground rounded-2xl",
        text : (
            <div className="px-4 pb-2">
                <p>
                    I study Software Engineering in a vocational school, just a regular freshman
                </p>
            </div>
        )
    },
    {
        title : "Video Editing",
        text : "I also do video editing, not really focused much on it since I'm only doing a light video editing"
    },
    {
        title : <h1 className="text-4xl font-bold"> 3D Artist </h1>,
        className : "border-2 border-red-500 p-4 rounded-2xl col-span-3 row-span-2",
        text : (
            <div>
                <p className="text-2xl">
                    I also do 3D, especially 3d animation using blender 3.6.23 and 5.1. I primarly focused on animation and VFX rather than rigging and modelling
                </p>
            </div>
        )
    }
]

export function AboutCards({aboutList = aboutData} : {aboutList? : AboutCardProps[]}) {
    return (
        <div className="grid grid-cols-3 grid-rows-3 gap-6 min-h-128">
            {aboutList.map(aboutItem => <AboutCard key={aboutItem.title?.toString()} title={aboutItem.title} text={aboutItem.text} className={aboutItem.className} />)}
        </div>
    )
}

export function AboutCard({title, text, className} : AboutCardProps) {
    return (
        <div className={className ?? "bg-background text-foreground border-2 border-foreground px-4 py-2 rounded-2xl flex flex-col"}>
            {typeof title === "string" ? <h2 className="text-4xl font-bold" children={title} /> : title}

            {typeof text === "string" ? <p children={text} /> : text}
        </div>
    )
}

export default function About() {
    return (
        <section className="px-10 pb-10">
            <div className="flex flex-col items-center max-w-5xl mx-auto">
                <h1 className="text-6xl text-center mb-10 font-bold" children="About Me" />

                <AboutCards />
            </div>
        </section>
    )
}