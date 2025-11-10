import type { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { EmailTemplates } from "../../../modules/email-notifications/templates"

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    const logger = req.scope.resolve(ContainerRegistrationKeys.LOGGER)
    
    // Log tnphe raw request for debugging
    logger.info(`Request method: ${req.method}`)
    logger.info(`Request headers: ${JSON.stringify(req.headers)}`)
    logger.info(`Raw body type: ${typeof req.body}`)
    logger.info(`Raw body: ${JSON.stringify(req.body)}`)
    
    // Medusa should auto-parse JSON bodies, but let's handle both cases
    const body = (req.body ?? {}) as { email?: string }
    const { email } = body

    // Validate email
    if (!email || typeof email !== 'string') {
      logger.error(`Email validation failed. Email: ${email}, Type: ${typeof email}`)
      res.status(400).json({
        success: false,
        error: 'Email is required'
      })
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        error: 'Please enter a valid email address'
      })
      return
    }

    // Check if notification service is available
    let notificationModuleService
    try {
      notificationModuleService = req.scope.resolve(Modules.NOTIFICATION)
      logger.info('Notification service resolved successfully')
    } catch (resolveError) {
      logger.error(`Failed to resolve notification service: ${resolveError}`)
      res.status(500).json({
        success: false,
        error: 'Email service is not configured. Please check RESEND_API_KEY and RESEND_FROM_EMAIL environment variables.'
      })
      return
    }

    // TODO: Store email in database
    // For now, we'll just send the email
    // You can add database storage later using a proper model/service
    logger.info(`Processing email subscription: ${email}`)

    // Send welcome email via notification service
    try {
      logger.info(`Attempting to send welcome email to: ${email}`)
      await notificationModuleService.createNotifications({
        to: email.toLowerCase().trim(),
        channel: 'email',
        template: EmailTemplates.WELCOME_EMAIL,
        data: {
          emailOptions: {
            subject: 'Welcome to cobain©'
          },
          email: email.toLowerCase().trim(),
          preview: 'Welcome to cobain©!'
        }
      })
      logger.info(`Welcome email sent to: ${email}`)
      
      res.status(200).json({
        success: true,
        message: 'Email subscribed successfully'
      })
    } catch (emailError) {
      logger.error(`Failed to send welcome email: ${emailError}`)
      logger.error(`Email error stack: ${emailError instanceof Error ? emailError.stack : 'No stack trace'}`)
      res.status(500).json({
        success: false,
        error: emailError instanceof Error ? emailError.message : 'Failed to send welcome email. Please try again later.'
      })
    }
  } catch (error) {
    const logger = req.scope.resolve(ContainerRegistrationKeys.LOGGER)
    logger.error(`Email subscription error: ${error}`)
    
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Something went wrong. Please try again.'
    })
  }
}

