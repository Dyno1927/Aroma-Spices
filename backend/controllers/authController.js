/**
 * Authentication Controller
 * Handles user registration, login, email verification, and token management
 */

import User from '../models/userModel.js';
import { sendVerificationEmail } from '../utils/verificationEmailUtil.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

/**
 * Generate JWT access and refresh tokens
 * @param {string} userId - MongoDB user ID
 * @returns {Object} {accessToken, refreshToken}
 */
const generateTokens = (userId) => {
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '15m',
  });

  const refreshToken = jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

/**
 * User signup/registration
 * Creates new user account and sends verification email
 *
 * @async
 * @param {Object} req - Express request with name, email, password, phone, address
 * @param {Object} res - Express response
 * @returns {Object} User data and JWT tokens
 */
export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phone, address } = req.body;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: 'All fields required' });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: 'Email already registered' });
    }

    // Create user
    const user = new User({
      name,
      email,
      password,
      phone,
      address,
      emailVerified: true,
    });

    const verifyToken = crypto.randomBytes(32).toString('hex');
    user.emailVerificationToken = verifyToken;
    user.emailVerificationExpiry = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    try {
      await sendVerificationEmail(user.email, verifyToken);
    } catch (error) {
      console.error('Verification email failed:', error.message);
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id);

    // Set refresh token as httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      success: true,
      message: 'Signup successful',
      data: {
        user: { id: user._id, name: user.name, email: user.email },
        accessToken,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res
      .status(500)
      .json({ success: false, message: 'Signup failed', error: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'Email and password required' });
    }

    // Find user (include password field)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid email or password' });
    }

    // Check password
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid email or password' });
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id);

    // Set refresh token as httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: { id: user._id, name: user.name, email: user.email },
        accessToken,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res
      .status(500)
      .json({ success: false, message: 'Login failed', error: error.message });
  }
};

// Refresh Token
export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res
        .status(401)
        .json({ success: false, message: 'No refresh token' });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      decoded.id
    );

    // Update refresh token cookie
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      data: { accessToken },
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(401).json({ success: false, message: 'Invalid refresh token' });
  }
};

// Logout
export const logout = (req, res) => {
  res.clearCookie('refreshToken');
  res.json({ success: true, message: 'Logout successful' });
};

// Get current user
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
        },
      },
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ success: false, message: 'Error fetching user' });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, phone, address },
      { returnDocument: 'after' }
    );

    res.json({
      success: true,
      message: 'Profile updated',
      data: { user },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Update failed' });
    console.error('Profile update error:', error);
  }
};

// Verification
export const verifyEmail = async (req, res) => {
  const user = await User.findOne({
    emailVerificationToken: req.params.token,
    emailVerificationExpiry: { $gt: Date.now() },
  });

  if (!user)
    return res.status(400).json({ message: 'Invalid or expired token' });

  user.emailVerified = true;
  user.emailVerificationToken = null;
  user.emailVerificationExpiry = null;
  await user.save();

  res.json({ message: 'Email verified successfully' });
};

// Resend Verification
export const resendVerification = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user.emailVerified)
    return res.status(400).json({ message: 'Email already verified' });

  const token = crypto.randomBytes(32).toString('hex');
  user.emailVerificationToken = token;
  user.emailVerificationExpiry = Date.now() + 24 * 60 * 60 * 1000;
  await user.save();

  await sendVerificationEmail(user.email, token);
  res.json({ message: 'Verification email sent' });
};
