import type { BaseComponentProps } from "@/lib/BaseComponentProps";
import type { ComponentProps, MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ComponentProps<"button">, Pick<BaseComponentProps, "overrideClassName"> {
    text? : string
}

export default function Button({ text, overrideClassName, className, onClick, ...rest } : ButtonProps) {

    const onButtonClicked = (e : React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e)
        console.log("meow")
    }

    return (
        <button className={overrideClassName ? className : twMerge("relative py-2 px-8 border-3 font-bold rounded-full group overflow-hidden max-w-sm", className)} onClick={onButtonClicked} {...rest}>
            {text}

            <div className="absolute top-0 left-0 w-[calc(100%+16px)] h-full bg-accent border-r-16 border-r-light-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-500 -z-1" />
        </button>
    )
}