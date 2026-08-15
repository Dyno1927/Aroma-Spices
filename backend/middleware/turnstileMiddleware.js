/**
 * Cloudflare Turnstile Bot Verification Middleware
 * Verifies CAPTCHA token to prevent bot attacks
 *
 * @async
 * @param {Object} req - Express request object (expects turnstileToken in body)
 * @param {Object} res - Express response object
 * @param {Function} next - Calls next middleware on success
 * @returns {void}
 */
export const verifyTurnstile = async (req, res, next) => {
  const token = req.body.turnstileToken;

  if (!token)
    return res.status(400).json({ message: 'Bot verification required' });

  const response = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: req.ip,
      }),
    }
  );

  const data = await response.json();
  if (!data.success)
    return res.status(403).json({ message: 'Bot verification failed' });

  next();
};
