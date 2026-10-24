// DATA
import { socialLinksData } from "@/lib/data"

// COMPONENTS
import type { BaseComponentProps } from "@/lib/BaseComponentProps"
import { twMerge } from "tailwind-merge"

export interface SocialLinkProps extends Pick<BaseComponentProps, "className" | "overrideClassName" | "style"> {
    name : string
    Icon : React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    description? : string
    url : string
}

interface SocialLinksProps extends Pick<BaseComponentProps, "className" | "overrideClassName" | "style"> {
    socialLinkList? : SocialLinkProps[]
    useDefaultWrapper? : boolean
}

const socialLinks = socialLinksData

export default function SocialLinks({ socialLinkList = socialLinks, useDefaultWrapper = true, className, overrideClassName } : SocialLinksProps) {
    if (useDefaultWrapper) return (
        <div className="flex gap-4">
            {socialLinkList.map((item, index) => (
                <SocialLink
                    key={index}
                    name={item.name}
                    Icon={item.Icon}
                    description={item.description}
                    url={item.url}
                    className={className}
                    overrideClassName={overrideClassName}
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
                    className={className}
                    overrideClassName={overrideClassName}
                />
            ))}
        </>
    )
}

export function SocialLink({ name, Icon, description, url, className, overrideClassName } : SocialLinkProps) {
    return (
        <a className={overrideClassName ? className : twMerge("w-11 sm:w-14 md:w-15 aspect-square border-3 rounded-full p-2 sm:p-2.5 cursor-pointer transition-all hover:scale-110 hover:bg-root-fg hover:text-root-bg", className)} onClick={(e) => {e.preventDefault; window.location.assign(url)}} title={description ?? name} href={url}>
            <Icon />
        </a>
    )
}