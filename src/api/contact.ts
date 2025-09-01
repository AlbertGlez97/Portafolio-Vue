import axiosInstance from '../lib/axios'

// Servicio HTTP que envía el formulario de contacto a Formspree

// Interface describing the expected fields for the contact form
export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

/**
 * Sends the contact form data to Formspree.
 * @param data Object containing the user's contact information
 * @returns The response data from Formspree
 * @throws Error when the request fails or a non-200 status is returned
 */
export const sendContactForm = async (data: ContactFormData) => {
  try {
    const response = await axiosInstance.post('', data)
    if (response.status !== 200) {
      throw new Error('Unexpected response status')
    }
    return response.data
  } catch (error: any) {
    // Provide a readable error message for the calling component
    throw new Error(error?.response?.data?.message || 'Failed to send message')
  }
}
