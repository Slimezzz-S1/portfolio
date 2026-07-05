import YoutubeIcon from './assets/icons/socialLink/youtube.svg?react'
import XIcon from './assets/icons/socialLink/x.svg?react'
import GithubIcon from './assets/icons/socialLink/github.svg?react'
import DiscordIcon from './assets/icons/socialLink/discord.svg?react'
import { useState, type ReactNode } from 'react'

export interface SocialLinkProps {
    name : SocialLinkName,
    description? : string,
    url : string,
    iconUrl? : string,
    IconElement? : React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
}

export type SocialLinkName = "youtube" | "x" | "instagram" | "tiktok" | "discord" | "github" | string

const SocialLinkData : SocialLinkProps[] = [
    {
        name : 'youtube',
        url : 'https://www.youtube.com/@S11-ME_',
    },
    {
        name : 'discord',
        url : 'https://discord.com/users/999482178570305586',
    },
    {
        name : 'x',
        url : 'https://x.com/slimedzzz'
    },
    {
        name : 'github',
        url : 'https://github.com/Slimezzz-S1'
    }
]

export default function SocialLinks({socialLinksData = SocialLinkData} : {socialLinksData? : SocialLinkProps[]}) {
    return (
        <div className='flex gap-4 flex-wrap'>
            {socialLinksData.map(socialLinkItem => (<SocialLink key={socialLinkItem.url} name={socialLinkItem.name} url={socialLinkItem.url} iconUrl={socialLinkItem.iconUrl} IconElement={socialLinkItem.IconElement} />))}
        </div>
    )
}

export function SocialLink({name, description, url, iconUrl, IconElement} : SocialLinkProps) {
    const hasIcon = (iconUrl || IconElement) ?? false
    const [isHover, setIsHover] = useState(false)

    const iconHandle : (name : SocialLinkName) => ReactNode = (name : SocialLinkName) => {
        switch (name) {
            case 'youtube':
                return <YoutubeIcon />
            case 'discord':
                return <DiscordIcon />
            case 'github':
                return <GithubIcon />
            case 'x':
                return <XIcon />
            default:
                return ""
        }
    }
    // console.log(hasIcon)

    return (
        <a 
            title={`${description ?? name}`}
            href={url}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className={"w-12 h-12 rounded-4xl p-2 bg-black text-foreground border-3 border-foreground hover:bg-foreground hover:text-background hover:border-background transition-all " + (isHover ? 'transform -scale-[-110%]' : "")}
            children={hasIcon ? (IconElement ? <IconElement /> : <img src={iconUrl} />) : iconHandle(name)}
        />
    )
}