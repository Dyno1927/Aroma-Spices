/**
 * Order Confirmation Email Utility
 * Sends detailed order confirmation email with items and address
 */

import { Resend } from 'resend';

// Initialize Resend email service
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send order confirmation email
 * @async
 * @param {Object} options - Email options
 * @param {string} options.email - Customer email address
 * @param {Object} options.order - Order object with items and address
 * @returns {Promise<void>}
 */
export const sendOrderConfirmationEmail = async ({ email, order }) => {
  const itemRows = order.items
    .map(
      (i) => `
    <tr>
      <td style="padding-bottom:14px;color:#1E3A5F;">${i.name} × ${i.quantity}</td>
      <td align="right" style="padding-bottom:14px;color:#1E3A5F;">₹${i.price * i.quantity}</td>
    </tr>
  `
    )
    .join('');

  const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="margin:0;padding:40px 20px;background:#F7F6F2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td align="center">
    <table width="620" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;background:#FFFFFF;border:1px solid #E7F0F5;border-radius:24px;overflow:hidden;box-shadow:0 20px 50px rgba(19,38,58,0.08);">

    <!-- Accent -->
    <tr><td><div style="height:6px;background:linear-gradient(90deg,#1E3A5F,#3D6B8A,#D8C3A5);"></div></td></tr>

    <!-- Header -->
    <tr><td style="padding:40px 50px 30px;">
      <table width="100%"><tr>
        <td align="left">
          <h1 style="margin:0;font-size:28px;font-weight:700;color:#1E3A5F;">Aroma Spices</h1>
          <p style="margin:8px 0 0;font-size:14px;color:#5C7285;">Pure spices. Authentic flavor.</p>
        </td>
        <td align="right">
          <span style="display:inline-block;padding:10px 18px;background:rgba(61,107,138,0.08);border:1px solid rgba(61,107,138,0.12);border-radius:999px;font-size:12px;font-weight:600;color:#3D6B8A;">ORDER CONFIRMED</span>
        </td>
        </tr>
      </table>
    </td></tr>

    <!-- Main -->
    <tr><td style="padding:10px 50px 40px;">
      <h2 style="margin:0 0 18px;font-size:36px;line-height:44px;color:#1E3A5F;font-weight:700;">Thank you, ${order.address.name} 🎉</h2>
      <p style="margin:0;font-size:16px;line-height:30px;color:#5C7285;">We've received your order and are preparing your spices for shipment. You'll hear from us as soon as your package is on its way.</p>
    </td></tr>

    <!-- Order Card -->
    <tr><td style="padding:0 50px 40px;">
      <div style="background:linear-gradient(180deg,rgba(231,240,245,0.55),rgba(231,240,245,0.25));border:1px solid rgba(168,197,214,0.35);border-radius:18px;padding:28px;">
        <p style="margin:0 0 24px;font-size:13px;font-weight:700;letter-spacing:1px;color:#3D6B8A;text-transform:uppercase;">Order Summary</p>
        <table width="100%">
          ${itemRows}
        <tr><td colspan="2"><hr style="border:none;height:1px;background:#A8C5D6;margin:10px 0 20px;"></td></tr>
        <tr>
          <td style="font-weight:700;font-size:18px;color:#1E3A5F;">Total</td>
          <td align="right" style="font-weight:700;font-size:18px;color:#1E3A5F;">₹${order.amount / 100}</td>
        </tr>
        </table>
        <p style="margin:20px 0 0;font-size:12px;color:#A0AFBC;">Order ID: ${order._id}</p>
      </div>
    </td></tr>

    <!-- CTA -->
    <tr><td align="center" style="padding:0 50px 45px;">
      <a href="https://wa.me/919105067555?text=Hi! My Order ID is ${order._id}"
        style="display:inline-block;background:#1E3A5F;color:#F5F1EA;text-decoration:none;padding:16px 34px;font-size:15px;font-weight:600;border-radius:12px;">
        Track on WhatsApp →
      </a>
    </td></tr>

    <!-- Footer -->
    <tr><td style="background:#F8FBFD;padding:35px 50px;border-top:1px solid #E7F0F5;">
      <p style="margin:0;font-size:14px;line-height:26px;color:#5C7285;text-align:center;">Questions? Reply to this email and we'll be happy to help.</p>
      <p style="margin:16px 0 0;font-size:12px;color:#A0AFBC;text-align:center;">© 2026 Aroma Spices. All rights reserved.</p>
    </td></tr>

    </table>
    </td></tr>
    </table>
  </body>
</html>`;

  await resend.emails.send({
    from: 'Aroma Spices <customer-care@aromaspicies.com>',
    to: email,
    subject: `Order Confirmed — ₹${order.amount / 100} | Aroma Spices`,
    html,
  });
};
