import { useMemo, type RefCallback, type Ref } from "react"

function useMergedRefs<T>(refs: (Ref<T> | undefined)[]): RefCallback<T> {
  return useMemo(() => {
    return (node: T | null) => {
      refs.forEach((ref) => {
        if (!ref) return

        if (typeof ref === "function") {
          ref(node)
        } else {
          (ref as React.RefObject<T | null>).current = node
        }
      })
    }
  }, refs)
}

export default useMergedRefs