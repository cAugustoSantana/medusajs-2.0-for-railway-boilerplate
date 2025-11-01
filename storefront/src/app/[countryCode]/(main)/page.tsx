import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
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

  // Add your hosted video URL here
  // Example: "https://example.com/videos/hero-video.mp4"
  // For direct URL, replace the line below with your video URL:
  const heroVideoUrl = "https://your-hosted-video.com/video.mp4"
  // Or use environment variable:
  // const heroVideoUrl = process.env.NEXT_PUBLIC_HERO_VIDEO_URL || undefined

  // Get the first collection for the product rail below the hero
  const firstCollection = collections[0]

  return (
    <>
      <Hero videoUrl={heroVideoUrl} />
      {/* Product Rail directly below the hero */}{firstCollection && (
        <ProductRail collection={firstCollection} region={region} />
      )}
      
    </>
  )
}
