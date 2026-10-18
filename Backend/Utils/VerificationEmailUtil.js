/**
 * Email Verification Utility
 * Sends verification email with token link (24-hour expiry)
 */

import { Resend } from 'resend';

/* Uncomment the lines below when testing */
// import dotenv from 'dotenv';
// dotenv.config();

// Initialize Resend email service
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send verification email with token link
 * @async
 * @param {string} email - User's email address
 * @param {string} token - Verification token (generated server-side)
 * @returns {Promise<void>}
 * @throws {Error} If email sending fails
 * @description Link expires in 24 hours. Token is responsible for validation.
 */
export const sendVerificationEmail = async (email, token) => {
  const link = `https://aromaspicies.com/verify-email?token=${token}`;

  await resend.emails.send({
    from: 'Aroma Spices <customer-care@aromaspicies.com>',
    to: email,
    subject: 'Verify your email — Aroma Spices',
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto">
        <h2 style="color:#1E3A5F">Welcome to Aroma Spices 🌿</h2>
        <p>Click the button below to verify your email address. This link expires in 24 hours.</p>
        <a href="${link}"
           style="display:inline-block;padding:12px 24px;background:#1E3A5F;color:#fff;border-radius:6px;text-decoration:none;margin:16px 0">
          Verify Email
        </a>
        <p style="color:#888;font-size:12px">If you didn't create an account, ignore this email.</p>
      </div>
    `,
  });
};
