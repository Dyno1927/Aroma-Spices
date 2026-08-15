/**
 * Email Sending Utility
 * Handles email dispatch using Resend API
 */

import { Resend } from 'resend';

// Initialize Resend email service
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send email using Resend service
 * @async
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject line
 * @param {string} options.html - HTML email body
 * @returns {Promise<void>}
 * @throws {Error} If email sending fails
 */
export const sendEmail = async ({ to, subject, html }) => {
  const { error } = await resend.emails.send({
    from: 'Aroma Spices -Amit Kumar <noreply@aromaspicies.com>',
    to,
    subject,
    html,
  });
  if (error) throw new Error(error.message);
};
