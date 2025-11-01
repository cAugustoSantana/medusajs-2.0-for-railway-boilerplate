"use client"

import { useFormState } from "react-dom"
import { Heading, Text } from "@medusajs/ui"
import Input from "@modules/common/components/input"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import ErrorMessage from "@modules/checkout/components/error-message"
import { subscribeEmail } from "./actions"

export default function ComingSoonPage() {
  const [state, formAction] = useFormState(subscribeEmail, { success: false, error: null })

  return (
    <div className="min-h-screen w-full relative bg-gradient-to-br from-grey-90 via-grey-80 to-grey-70 flex items-center justify-center">
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 text-center">
        <div className="mb-8">
          <Heading
            level="h1"
            className="text-5xl small:text-6xl font-bold text-white mb-4 tracking-tight"
          >
            Coming Soon
          </Heading>
          <Text className="text-xl small:text-2xl text-grey-20 mb-8 max-w-xl mx-auto">
            Something amazing is on the way. Be the first to know when we launch.
          </Text>
        </div>

        {/* Email Signup Form */}
        <div className="bg-white/95 backdrop-blur-sm rounded-rounded p-8 small:p-12 shadow-xl border border-white/20">
          {state?.success ? (
            <div className="text-center">
              <div className="mb-4">
                <svg
                  className="w-16 h-16 mx-auto text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <Heading
                level="h2"
                className="text-2xl font-semibold text-ui-fg-base mb-2"
              >
                Thank You!
              </Heading>
              <Text className="text-base-regular text-ui-fg-subtle mb-6">
                We&apos;ll notify you as soon as we launch.
              </Text>
            </div>
          ) : (
            <>
              <Heading
                level="h2"
                className="text-2xl font-semibold text-ui-fg-base mb-2"
              >
                Get Notified
              </Heading>
              <Text className="text-base-regular text-ui-fg-subtle mb-8">
                Enter your email address and we&apos;ll send you an update when we&apos;re ready.
              </Text>
              <form action={formAction} className="w-full max-w-md mx-auto">
                <div className="flex flex-col small:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      label="Email address"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="bg-white"
                      data-testid="email-input"
                    />
                  </div>
                  <div className="flex items-end">
                    <SubmitButton 
                      className="w-full small:w-auto whitespace-nowrap"
                      data-testid="subscribe-button"
                    >
                      Notify Me
                    </SubmitButton>
                  </div>
                </div>
                <ErrorMessage 
                  error={state.error || null} 
                  data-testid="error-message"
                />
              </form>
            </>
          )}
        </div>

        {/* Social Links or Additional Info */}
        <div className="mt-12 text-grey-30">
          <Text className="text-small-regular">
            Follow us for updates
          </Text>
        </div>
      </div>
    </div>
  )
}

