import { Metadata } from "next"

import ProductRail from "@modules/home/components/featured-products/product-rail"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  // Get the first collection for the product rail
  const firstCollection = collections[0]

  return (
    <>
      {firstCollection && (
        <ProductRail collection={firstCollection} region={region} />
      )}
    </>
  )
}
