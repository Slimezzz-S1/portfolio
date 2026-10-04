// DATA
import { socialLinksData } from "@/libs/data"

export interface socialLinkProps {
    name : string
    Icon : React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    description? : string
    url : string
}

interface socialLinksProps {
    socialLinkList? : socialLinkProps[]
    useDefaultWrapper? : boolean
}

const socialLinks = socialLinksData

export default function SocialLinks({ socialLinkList = socialLinks, useDefaultWrapper = true } : socialLinksProps) {
    if (useDefaultWrapper) return (
        <div className="flex gap-4">
            {socialLinks.map((item, index) => (
                <SocialLink
                    key={index}
                    name={item.name}
                    Icon={item.Icon}
                    description={item.description}
                    url={item.url}
                />
            ))}
        </div>
    )

    return (
        <>
            {socialLinks.map((item, index) => (
                <SocialLink
                    key={index}
                    name={item.name}
                    Icon={item.Icon}
                    description={item.description}
                    url={item.url}
                />
            ))}
        </>
    )
}

export function SocialLink({ name, Icon, description, url } : socialLinkProps) {
    return (
        <a className="w-13 aspect-square border-3 rounded-full p-2.5 cursor-pointer transition-all hover:scale-110 hover:bg-root-fg hover:text-root-bg" onClick={(e) => {e.preventDefault; window.location.assign(url)}} title={description ?? name} href={url}>
            <Icon />
        </a>
    )
}