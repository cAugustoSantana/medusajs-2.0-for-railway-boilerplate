import { Section, Text, Img, Hr } from '@react-email/components'
import { Base } from './base'

export const WELCOME_EMAIL = 'welcome-email'

export interface WelcomeEmailProps {
  email: string
  preview?: string
}

export const isWelcomeEmailData = (data: any): data is WelcomeEmailProps =>
  typeof data?.email === 'string' &&
  (typeof data.preview === 'string' || typeof data.preview === 'undefined')

export const WelcomeEmail = ({
  email,
  preview = 'Welcome to cobain©!'
}: WelcomeEmailProps) => {
  return (
    <Base preview={preview}>
      <Section className="mt-[32px] text-center">
        <Img
          src="https://user-images.githubusercontent.com/59018053/229103275-b5e482bb-4601-46e6-8142-244f531cebdb.svg"
          alt="Medusa"
          className="mx-auto w-28"
        />
      </Section>
      <Section className="mt-4 text-left">
        <Text className="text-black text-[14px] leading-[24px]">
          Hi there,
        </Text>
        <Text className="text-black text-[14px] leading-[24px]">
          Thanks for subscribing with <strong>{email}</strong>. We&apos;re excited to have you on board!
        </Text>
        <Text className="text-black text-[14px] leading-[24px]">
          You&apos;ll be the first to hear about new drops, behind-the-scenes stories, and exclusive offers.
        </Text>
      </Section>
      <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
      <Section className="text-left">
        <Text className="text-[#666666] text-[12px] leading-[20px]">
          If you didn&apos;t subscribe or no longer wish to receive updates, you can unsubscribe at any time.
        </Text>
      </Section>
    </Base>
  )
}

WelcomeEmail.PreviewProps = {
  email: 'subscriber@example.com'
} as WelcomeEmailProps

export default WelcomeEmail
