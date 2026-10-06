// import type { RefObject } from "react"

export interface componentProps {
    // key? : React.Key | null | undefined
    className? : string,
    style? : React.CSSProperties
    overrideClassName? : boolean
    overrideStyle? : boolean
    // ref? : RefObject < HTMLDivElement | null >
}