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
          <source src="http://console-production-4050.up.railway.app/api/v1/download-shared-object/aHR0cDovL2J1Y2tldC5yYWlsd2F5LmludGVybmFsOjkwMDAvbWVkdXNhLW1lZGlhLzA5MjUlMjAlMjgyJTI5JTI4MyUyOS5tcDQ_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD0ySjFBSEdHSTNINUZCT0U2UFlWTSUyRjIwMjUxMDMxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTAzMVQwMzE4NDRaJlgtQW16LUV4cGlyZXM9NDMxOTkmWC1BbXotU2VjdXJpdHktVG9rZW49ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmhZMk5sYzNOTFpYa2lPaUl5U2pGQlNFZEhTVE5JTlVaQ1QwVTJVRmxXVFNJc0ltVjRjQ0k2TVRjMk1Ua3lNell6Tnl3aWNHRnlaVzUwSWpvaVpIcHFhR0ZsWnpOcU1XWXdhM01pZlEuT0EtbWRfX2xOeWRla3FwZXNSY09kQUJJVWdnX1pfQWVZWlRhMHhHYUVxd2VweEFRSGNQUUY3WVZHUmVDbG1jbDJPbGZXNXF6TmEzZ2VMWG9xV0lod0EmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JnZlcnNpb25JZD1udWxsJlgtQW16LVNpZ25hdHVyZT1kMDYxMGEyMDUwZTExYTNlZTI1ZDNjYWIyYmFiOTk0Y2ExNTk1NDRmMzUxNjU1YzNiNTZkZWZhOGU3ZjMzZjAw" type="video/mp4" />
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
