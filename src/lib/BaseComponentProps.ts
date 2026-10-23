// COMPONENTS
import type { ComponentProps } from "react"

export interface BaseComponentProps extends ComponentProps<"div"> {
    overrideClassName? : boolean
    overrideStyle? : boolean
}