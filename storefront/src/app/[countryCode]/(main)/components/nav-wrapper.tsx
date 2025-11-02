import { Suspense } from "react"
import Nav from "@modules/layout/templates/nav"

export default function NavWrapper() {
  return (
    <Suspense fallback={
      <div className="sticky top-0 inset-x-0 z-50">
        <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base" />
      </div>
    }>
      <Nav />
    </Suspense>
  )
}
