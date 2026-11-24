// ICONS : SOCIAL LINKS
import YoutubeIcon from "@icons/social-link-icons/youtube/mdi--youtube.svg?react"
import GithubIcon from "@icons/social-link-icons/github/mdi--github.svg?react"
import DiscordIcon from "@icons/social-link-icons/discord/ic--baseline-discord.svg?react"
import MonkeyTypeIcon from "@icons/social-link-icons/monkeytype/simple-icons--monkeytype.svg?react"
// import XIcon from "@icons/social-link-icons/x/pajamas--twitter.svg?react"

// COMPONENTS
import type { SocialLinkProps } from "@/components/SocialLink";
import type { UnderscoreDataProps } from "./types";


////
//// Social Links

export const socialLinksData : SocialLinkProps[] = [
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
        name : "MonkeyType",
        Icon : MonkeyTypeIcon,
        description : "My MonkeyType Profile",
        url : "https://monkeytype.com/profile/slimez7"
    },
    {
        name : "Discord",
        Icon : DiscordIcon,
        description : "My Discord account",
        url : "https://discord.com/users/999482178570305586"
    },
] as const

export const underscoreData : UnderscoreDataProps = {
    duration : 100,
    staggerDelay : 75,
    holdDuration : 250
} as const