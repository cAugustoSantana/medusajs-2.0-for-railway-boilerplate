import { Metadata } from "next"

import ConditionalLayout from "./components/conditional-layout"
import { getBaseURL } from "@lib/util/env"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  return <ConditionalLayout>{props.children}</ConditionalLayout>
}
