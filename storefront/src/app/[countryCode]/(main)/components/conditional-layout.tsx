"use client"

import { usePathname } from "next/navigation"
import Footer from "@modules/layout/templates/footer"
import NavWrapper from "./nav-wrapper"

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isComingSoon = pathname.includes("/coming-soon")

  if (isComingSoon) {
    return <>{children}</>
  }

  return (
    <>
      <NavWrapper />
      {children}
      <Footer />
    </>
  )
}
