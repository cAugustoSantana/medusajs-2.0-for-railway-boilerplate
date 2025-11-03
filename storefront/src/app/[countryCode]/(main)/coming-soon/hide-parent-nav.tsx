"use client"

import { useEffect } from "react"

export default function HideParentNav() {
  useEffect(() => {
    // Hide parent layout's Nav and Footer (anything before the coming-soon-header)
    const comingSoonHeader = document.querySelector('.coming-soon-header')
    if (!comingSoonHeader) return

    // Find all siblings before coming-soon-header (these would be Nav from parent layout)
    let prevSibling = comingSoonHeader.previousElementSibling
    while (prevSibling) {
      if (prevSibling.tagName === 'HEADER' || prevSibling.tagName === 'DIV') {
        ;(prevSibling as HTMLElement).style.display = 'none'
      }
      prevSibling = prevSibling.previousElementSibling
    }

    // Find footer (usually after the main content)
    const footer = document.querySelector('footer')
    if (footer && !footer.closest('.coming-soon-header')) {
      ;(footer as HTMLElement).style.display = 'none'
    }

    return () => {
      // Cleanup on unmount
      let prevSibling = comingSoonHeader.previousElementSibling
      while (prevSibling) {
        if (prevSibling.tagName === 'HEADER' || prevSibling.tagName === 'DIV') {
          ;(prevSibling as HTMLElement).style.display = ''
        }
        prevSibling = prevSibling.previousElementSibling
      }
      if (footer && !footer.closest('.coming-soon-header')) {
        ;(footer as HTMLElement).style.display = ''
      }
    }
  }, [])

  return null
}
