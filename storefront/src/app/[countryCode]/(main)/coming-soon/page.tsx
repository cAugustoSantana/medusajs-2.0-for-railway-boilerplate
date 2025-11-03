"use client"

import { useFormState } from "react-dom"
import { Heading, Text } from "@medusajs/ui"
import Input from "@modules/common/components/input"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import ErrorMessage from "@modules/checkout/components/error-message"
import { subscribeEmail } from "./actions"
import "./coming-soon.css"

export default function ComingSoonPage() {
  const [state, formAction] = useFormState(subscribeEmail, { success: false, error: null })

  return (
    <div className="coming-soon-page w-full">
      {/* Hero Section with Video - Contains both video area and banner */}
      <div className="relative w-full bg-gradient-to-br from-grey-90 via-grey-80 to-grey-70 -mt-16 pt-16 h-screen">
        {/* Single Video covering entire hero section */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full object-cover"
          style={{ top: '-4rem', height: 'calc(100vh + 4rem)', left: 0, right: 0 }}
        >
          <source src="https://bucket-production-1566.up.railway.app/medusa-media/Liqour_Comercial.mp4" type="video/mp4" />
        </video>
        
        {/* Banner Content - Centered in middle of hero section */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex items-center z-10">
          <div className="relative z-10 content-container mx-auto px-6 w-full">
          {state?.success ? (
            <div className="text-center max-w-2xl mx-auto">
              <div className="mb-4">
                <svg
                  className="w-20 h-20 mx-auto text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    strokeWidth={4}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <Heading
                level="h2"
                className="text-3xl font-black text-white mb-4 uppercase"
              >
                Thank You!
              </Heading>
              <Text className="text-lg font-bold text-white mb-6">
                We&apos;ll notify you as soon as we launch.
              </Text>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <Heading
                  level="h2"
                  className="text-3xl small:text-4xl font-black text-white mb-4 uppercase"
                >
                  Regístrate
                </Heading>
              </div>
              <form action={formAction} className="w-full max-w-2xl mx-auto">
                <div className="flex flex-col small:flex-row gap-4">
                  <div className="flex-1 w-full">
                    <Input
                      label="Correo electrónico"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="bg-white rounded-none border-2 border-white focus:border-white w-full"
                      data-testid="email-input"
                    />
                  </div>
                  <div className="flex items-end">
                    <SubmitButton 
                      className="w-full small:w-auto whitespace-nowrap rounded-none font-black uppercase bg-white text-black hover:bg-white/90"
                      data-testid="subscribe-button"
                    >
                      Notificar
                    </SubmitButton>
                  </div>
                </div>
                <ErrorMessage 
                  error={state.error || null} 
                  data-testid="error-message"
                />
              </form>
            </div>
          )}

          {/* Social Links */}
          <div className="mt-12 text-center">
            <div className="flex items-center justify-center gap-8">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/cobain.do/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/80 transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@cobain.do"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/80 transition-colors"
                aria-label="TikTok"
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-1.921.31 6.344 6.344 0 0 0 1.12 12.231 6.344 6.344 0 0 0 5.479-11.214v-7.816a8.188 8.188 0 0 0 4.557 1.381v-3.67a4.805 4.805 0 0 1-1.981-.501z" />
                </svg>
              </a>

              {/* Spotify */}
              <a
                href="https://open.spotify.com/playlist/6bXdRKXAGfUz2yhvnNMwrk?si=c00e1cf9dc8442ce"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/80 transition-colors"
                aria-label="Spotify"
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.96-.539-.12-.421.18-.84.54-.96 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.56.3z" />
                </svg>
              </a>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

