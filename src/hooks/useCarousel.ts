import { useState, useEffect, useCallback } from "react"

export function useCarousel(items: any[], interval = 5000) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<"left" | "right">("right")

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % items.length
      setDirection("right")
      return nextIndex
    })
  }, [items?.length])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = (prevIndex - 1 + items.length) % items.length
      setDirection("left")
      return nextIndex
    })
  }, [items?.length])

  useEffect(() => {
    const timer = setInterval(goToNext, interval)
    return () => clearInterval(timer)
  }, [goToNext, interval])

  return { currentIndex, direction, goToNext, goToPrevious }
}

