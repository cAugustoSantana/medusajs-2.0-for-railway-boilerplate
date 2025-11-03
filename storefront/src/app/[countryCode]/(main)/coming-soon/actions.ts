"use server"

const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"

export async function subscribeEmail(
  prevState: { success: boolean; error: string | null } | null,
  formData: FormData
): Promise<{ success: boolean; error: string | null }> {
  const email = formData.get("email") as string

  if (!email) {
    return { success: false, error: "Email is required" }
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, error: "Please enter a valid email address" }
  }

  try {
    // Call backend API to subscribe email and send welcome email
    const response = await fetch(`${MEDUSA_BACKEND_URL}/store/email-subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "Something went wrong. Please try again.",
      }
    }

    return { success: true, error: null }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong. Please try again.",
    }
  }
}

