import image1 from './assets/images/son/HLYkw9hb0AAqRJm.jpg'
import image2 from './assets/images/son/HMURL7obYAE4A_C.jpg'
import image3 from './assets/images/son/StQ5quvf-odqJWOa22NCHDtfBXDaQeGAbAwGXIZUVK0.jpg'
import image4 from './assets/images/son/my-collection-of-son-memes-so-far-v0-d5qtfrwjatzg1.webp'

export default function Project() {
    return (
        <section>
            <h1 className="text-6xl font-bold text-center mb-12">
                My Project
            </h1>

            <ProjectCards />
        </section>
    )
}

const projectCardData : projectCardProps[] = [
    {
        title : "falcons won",
        bannerImage : image1,
        summary : "Team Falcons won",
        description : "insane"
    },
    {
        title : "Json😭",
        bannerImage : image2,
        summary : "son",
        description : "son"
    },
    {
        title : "PosterZZZ",
        bannerImage : image3,
        summary : "4chan-like website",
        description : "a"
    },
    {
        title : "Hello Studio",
        bannerImage : image4,
        summary : "A school finals project",
        description : "as"
    }
]

export interface projectCardProps {
    title : string
    bannerImage : string
    summary : string
    description : string
}

export function ProjectCard({title, bannerImage, summary, description} : projectCardProps) {
    return (
        <div className='bg-background border-3 rounded-2xl overflow-hidden w-80'>
            <div className='h-64'>
                <img src={bannerImage} alt="" className='w-full h-full' />
            </div>

            <div className='p-4 border-t flex flex-col'>
                <h2 className='text-4xl font-bold'>
                    {title}
                </h2>

                <p className='min-h-12'>
                    {summary}
                </p>

                <button className='p-2 w-3xs self-center border rounded-2xl hover:bg-foreground hover:text-background hover:border-background transition-colors' children="Check it out" />
            </div>
        </div>
    )
}

export function ProjectCards({projectCardList = projectCardData} : {projectCardList? : projectCardProps[]}) {
    return (
        <div className='flex flex-wrap gap-8 justify-center'>
            {projectCardList.map(project => (
                <ProjectCard
                    key={project.title}
                    title={project.title}
                    bannerImage={project.bannerImage}
                    summary={project.summary}
                    description={project.description}
                />
            ))}
        </div>
    )
}