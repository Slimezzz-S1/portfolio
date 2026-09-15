import type { RefObject } from "react"

export interface componentProps {
    key? : React.Key | null | undefined
    className? : string,
    style? : React.CSSProperties
    ref? : RefObject < HTMLDivElement | null >
}