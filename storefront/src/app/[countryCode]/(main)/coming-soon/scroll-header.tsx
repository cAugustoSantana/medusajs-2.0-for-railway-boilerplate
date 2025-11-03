"use client"

import { useEffect, useState } from "react"

export default function ScrollHeader() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50) // Start transitioning after 50px scroll
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const header = document.querySelector('.coming-soon-header header')
    if (!header) return

    if (isScrolled) {
      header.classList.add('scrolled-opaque')
      header.classList.remove('scrolled-transparent')
    } else {
      header.classList.add('scrolled-transparent')
      header.classList.remove('scrolled-opaque')
    }
  }, [isScrolled])

  return null
}
