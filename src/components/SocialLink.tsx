// icons
import YoutubeIcon from "@/icons/SocialLinkIcons/Youtube/mdi--youtube.svg?react"
import GithubIcon from "@/icons/SocialLinkIcons/Github/mdi--github.svg?react"
import XIcon from "@/icons/SocialLinkIcons/X/pajamas--twitter.svg?react"
import DiscordIcon from "@/icons/SocialLinkIcons/Discord/ic--baseline-discord.svg?react"

interface socialLinkProps {
    name : string
    Icon : React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    description? : string
    url : string
}

const socialLinkList : socialLinkProps[] = [
    {
        name : "Youtube",
        Icon : YoutubeIcon,
        description : "My Youtube Channel",
        url : "https://www.youtube.com/@S11-ME_"
    },
    {
        name : "Github",
        Icon : GithubIcon,
        description : "My Github",
        url : "https://github.com/Slimezzz-S1"
    },
    {
        name : "X",
        Icon : XIcon,
        description : "My X account",
        url : "https://x.com/slimedzzz"
    },
    {
        name : "Discord",
        Icon : DiscordIcon,
        description : "My Discord account",
        url : ""
    },
]

interface socialLinksProps {
    socialLinks? : socialLinkProps[]
    useDefaultWrapper? : boolean
}

export default function SocialLinks({ socialLinks = socialLinkList, useDefaultWrapper = true } : socialLinksProps) {
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