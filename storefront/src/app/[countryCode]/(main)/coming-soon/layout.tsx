import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { getBaseURL } from "@lib/util/env"
import HideParentNav from "./hide-parent-nav"
import ScrollHeader from "./scroll-header"
import "./scroll-header.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function ComingSoonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <HideParentNav />
      <ScrollHeader />
      <div className="sticky top-0 inset-x-0 z-50 coming-soon-header">
        <header className="relative h-16 mx-auto border-b duration-200 bg-transparent border-white/20 scrolled-transparent transition-all">
          <nav className="content-container flex items-center justify-center w-full h-full">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-white text-white "
              data-testid="nav-store-link"
            >
              cobain©
            </LocalizedClientLink>
          </nav>
        </header>
      </div>
      {children}
    </>
  )
}
