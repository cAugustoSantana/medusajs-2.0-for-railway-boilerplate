import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import { HttpTypes } from "@medusajs/types"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      <div
        className="content-container flex flex-col small:flex-row small:items-start py-6 relative"
        data-testid="product-container"
      >
        {/* Column 1: Info - Order 2 on mobile, Order 1 on desktop */}
        <div className="order-2 small:order-1 flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-6">
          <ProductInfo product={product} />
          {/* Tabs for desktop only - hidden on mobile */}
          <div className="hidden small:block">
            <ProductTabs product={product} />
          </div>
        </div>
        {/* Column 2: Images - Order 1 on mobile, Order 2 on desktop */}
        <div className="order-1 small:order-2 block w-full relative">
          <ImageGallery images={product?.images || []} />
        </div>
        {/* Column 3: Actions - Order 3 on mobile, Order 3 on desktop */}
        <div className="order-3 flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-4 small:gap-y-12 gap-y-6">
          <ProductOnboardingCta />
          <Suspense
            fallback={
              <ProductActions
                disabled={true}
                product={product}
                region={region}
              />
            }
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>
        </div>
      </div>
      {/* Tabs for mobile only - appears below Add to Cart */}
      <div className="content-container small:hidden py-6">
        <ProductTabs product={product} />
      </div>
      <div
        className="content-container my-16 small:my-32"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
