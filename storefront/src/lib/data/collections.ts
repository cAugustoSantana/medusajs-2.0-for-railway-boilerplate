import { sdk } from "@lib/config"
import { cache } from "react"
import { getProductsList } from "./products"
import { HttpTypes } from "@medusajs/types"

export const retrieveCollection = cache(async function (id: string) {
  return sdk.store.collection
    .retrieve(id, {}, { next: { tags: ["collections"] } })
    .then(({ collection }) => collection)
})

export const getCollectionsList = cache(async function (
  offset: number = 0,
  limit: number = 100
): Promise<{ collections: HttpTypes.StoreCollection[]; count: number }> {
  return sdk.store.collection
    .list({ limit, offset }, { next: { tags: ["collections"] } })
    .then(({ collections, count }) => ({ collections, count }))
})

export const getCollectionByHandle = cache(async function (
  handle: string
): Promise<HttpTypes.StoreCollection> {
  return sdk.store.collection
    .list({ handle }, { next: { tags: ["collections"] } })
    .then(({ collections }) => collections[0])
})

export const getCollectionsWithProducts = cache(
  async (countryCode: string): Promise<HttpTypes.StoreCollection[] | null> => {
    const { collections } = await getCollectionsList(0, 3)

    if (!collections) {
      return null
    }

    // Fetch products for each collection individually to ensure each gets enough products
    for (const collection of collections) {
      if (!collection.id) continue

      const { response } = await getProductsList({
        queryParams: { 
          collection_id: collection.id,
          limit: 100, // Increase limit to get more products per collection
        },
        countryCode,
      })

      if (response.products) {
        collection.products = response.products as any
      }
    }

    return collections as unknown as HttpTypes.StoreCollection[]
  }
)
