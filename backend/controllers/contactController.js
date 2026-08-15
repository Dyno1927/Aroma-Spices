/**
 * Contact Form Controller
 * Handles contact form submissions with dual email notifications
 */

import { sendEmail } from '../utils/sendEmailUtil.js';

/**
 * Submit contact form
 * Sends two emails: one to business owner, one auto-reply to user
 * Validates required fields and handles email errors gracefully
 *
 * @async
 * @param {Object} req - Express request with name, email, subject, message
 * @param {Object} res - Express response object
 * @returns {Object} {success, message} - Confirmation message
 */
export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and message are required',
      });
    }

    // To business owner
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: `New Contact: ${subject || 'General Enquiry'} — from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
          <h2 style="color:#1E3A5F;border-bottom:2px solid #A8C5D6;padding-bottom:12px;">
            📬 New Contact Form Submission
          </h2>
          <table style="width:100%;border-collapse:collapse;margin-top:16px;">
            <tr style="background:#f7f6f2;">
              <td style="padding:10px 12px;font-weight:bold;color:#1E3A5F;width:120px;">Name</td>
              <td style="padding:10px 12px;">${name}</td>
            </tr>
            <tr>
              <td style="padding:10px 12px;font-weight:bold;color:#1E3A5F;">Email</td>
              <td style="padding:10px 12px;">${email}</td>
            </tr>
            <tr style="background:#f7f6f2;">
              <td style="padding:10px 12px;font-weight:bold;color:#1E3A5F;">Subject</td>
              <td style="padding:10px 12px;">${subject || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding:10px 12px;font-weight:bold;color:#1E3A5F;vertical-align:top;">Message</td>
              <td style="padding:10px 12px;">${message}</td>
            </tr>
          </table>
          <p style="color:#aaa;font-size:11px;margin-top:24px;">Aroma Spices Contact Form</p>
        </div>
      `,
    });

    // Auto-reply to user
    await sendEmail({
      to: email,
      subject: 'We received your message — Aroma Spices',
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
          <h2 style="color:#1E3A5F;">Thank you, ${name}! 🌶️</h2>
          <p style="color:#555;line-height:1.6;">
            We've received your message and will get back to you within 24 hours.
          </p>
          <div style="background:#f7f6f2;border-left:4px solid #1E3A5F;padding:16px;margin:24px 0;border-radius:4px;">
            <p style="margin:0;color:#1E3A5F;font-style:italic;">"${message}"</p>
          </div>
          <p style="color:#888;font-size:12px;">
            Pure Taste • Rich Aroma • Natural Goodness<br/>
            Aroma Spices, Aligarh, Uttar Pradesh, India
          </p>
        </div>
      `,
    });

    res.json({ success: true, message: 'Message sent!' });
  } catch (error) {
    console.error('Contact email error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try WhatsApp.',
    });
  }
};
