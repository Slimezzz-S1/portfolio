import { useState, useEffect } from "react";

interface WindowProps {
  width : number
  height : number
}

export function useWindowSize() : WindowProps {
  const [width, setWidth] = useState<number>(() => window.innerWidth)
  const [height, setHeight] = useState<number>(() => window.innerHeight)

  useEffect(() => {
    const onResize = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }

    window.addEventListener("resize", onResize)

    return () => window.removeEventListener("resize", onResize)
  }, []);

  return {
    width : width,
    height : height
  }
}