"use client"

type HeroProps = {
  videoUrl?: string
}

const Hero = ({ videoUrl }: HeroProps) => {
  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle overflow-hidden">
      {/* Background Video */}
      {videoUrl && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          aria-label="Background video"
        >
          Your browser does not support the video tag.
        </video>
      )}
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-[5]" />
      
      {/* Content */}
      
    </div>
  )
}

export default Hero
