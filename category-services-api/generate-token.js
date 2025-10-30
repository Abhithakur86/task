/**
 * JWT Token Generator Utility
 * 
 * This file helps you generate JWT tokens for testing your API
 * without needing to make HTTP requests every time.
 * 
 * Usage:
 * 1. Run: node generate-token.js
 * 2. Copy the generated token
 * 3. Use it in Postman or your frontend
 */

require('dotenv').config();
const jwt = require('jsonwebtoken');

// Token configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key_change_this_in_production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

/**
 * Generate a JWT token with custom payload
 * @param {Object} payload - Data to encode in the token
 * @param {String} expiresIn - Token expiration time (default: 24h)
 * @returns {String} - Generated JWT token
 */
function generateToken(payload, expiresIn = JWT_EXPIRES_IN) {
  try {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn });
    return token;
  } catch (error) {
    console.error('❌ Error generating token:', error.message);
    return null;
  }
}

/**
 * Verify and decode a JWT token
 * @param {String} token - JWT token to verify
 * @returns {Object|null} - Decoded payload or null if invalid
 */
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error('❌ Token verification failed:', error.message);
    return null;
  }
}

/**
 * Generate admin token
 */
function generateAdminToken() {
  const adminPayload = {
    email: process.env.ADMIN_EMAIL || 'admin@codesfortomorrow.com',
    role: 'admin',
    timestamp: Date.now()
  };
  
  return generateToken(adminPayload);
}

/**
 * Generate custom token with user-defined payload
 */
function generateCustomToken(email, additionalData = {}) {
  const payload = {
    email,
    ...additionalData,
    timestamp: Date.now()
  };
  
  return generateToken(payload);
}

/**
 * Decode token without verification (for debugging)
 */
function decodeTokenWithoutVerification(token) {
  try {
    const decoded = jwt.decode(token, { complete: true });
    return decoded;
  } catch (error) {
    console.error('❌ Error decoding token:', error.message);
    return null;
  }
}

/**
 * Check if token is expired
 */
function isTokenExpired(token) {
  const decoded = decodeTokenWithoutVerification(token);
  if (!decoded || !decoded.payload.exp) {
    return true;
  }
  
  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.payload.exp < currentTime;
}

/**
 * Get token expiration time
 */
function getTokenExpiration(token) {
  const decoded = decodeTokenWithoutVerification(token);
  if (!decoded || !decoded.payload.exp) {
    return null;
  }
  
  return new Date(decoded.payload.exp * 1000);
}

// ============================================
// CLI Interface
// ============================================

console.log('🔐 JWT Token Generator\n');
console.log('━'.repeat(60));

// Check if JWT_SECRET is configured
if (!process.env.JWT_SECRET) {
  console.log('⚠️  Warning: Using default JWT_SECRET from code');
  console.log('   For production, set JWT_SECRET in .env file\n');
}

// Generate Admin Token
console.log('\n📌 ADMIN TOKEN (Default):');
console.log('━'.repeat(60));
const adminToken = generateAdminToken();
console.log('\n✅ Token generated successfully!\n');
console.log('📋 Copy this token:\n');
console.log(adminToken);
console.log('\n');

// Decode and display token info
const decoded = decodeTokenWithoutVerification(adminToken);
if (decoded) {
  console.log('📊 Token Information:');
  console.log('━'.repeat(60));
  console.log('Algorithm:', decoded.header.alg);
  console.log('Type:', decoded.header.typ);
  console.log('\nPayload:');
  console.log(JSON.stringify(decoded.payload, null, 2));
  console.log('\nIssued At:', new Date(decoded.payload.iat * 1000).toLocaleString());
  console.log('Expires At:', new Date(decoded.payload.exp * 1000).toLocaleString());
  
  const hoursUntilExpiry = ((decoded.payload.exp - decoded.payload.iat) / 3600).toFixed(2);
  console.log(`Validity: ${hoursUntilExpiry} hours`);
}

console.log('\n━'.repeat(60));
console.log('\n💡 Usage Instructions:');
console.log('━'.repeat(60));
console.log('1. Copy the token above');
console.log('2. In Postman:');
console.log('   - Go to Collections → Variables');
console.log('   - Paste token in "token" variable');
console.log('   - Click Save');
console.log('3. Or add to request headers:');
console.log('   Authorization: Bearer <YOUR_TOKEN>');
console.log('\n');

// ============================================
// Export functions for use in other files
// ============================================

module.exports = {
  generateToken,
  verifyToken,
  generateAdminToken,
  generateCustomToken,
  decodeTokenWithoutVerification,
  isTokenExpired,
  getTokenExpiration
};

// ============================================
// Advanced Usage Examples
// ============================================

if (require.main === module) {
  console.log('━'.repeat(60));
  console.log('🚀 Advanced Examples:');
  console.log('━'.repeat(60));
  
  // Example 1: Custom user token
  console.log('\n1️⃣ Custom User Token:');
  const customToken = generateCustomToken('user@example.com', { role: 'user', userId: 123 });
  console.log(customToken.substring(0, 50) + '...');
  
  // Example 2: Short-lived token (1 hour)
  console.log('\n2️⃣ Short-lived Token (1 hour):');
  const shortToken = generateToken({ email: 'admin@codesfortomorrow.com' }, '1h');
  console.log(shortToken.substring(0, 50) + '...');
  
  // Example 3: Long-lived token (7 days)
  console.log('\n3️⃣ Long-lived Token (7 days):');
  const longToken = generateToken({ email: 'admin@codesfortomorrow.com' }, '7d');
  console.log(longToken.substring(0, 50) + '...');
  
  // Example 4: Verify token
  console.log('\n4️⃣ Verify Token:');
  const verificationResult = verifyToken(adminToken);
  if (verificationResult) {
    console.log('✅ Token is valid');
    console.log('Email:', verificationResult.email);
  } else {
    console.log('❌ Token is invalid');
  }
  
  // Example 5: Check expiration
  console.log('\n5️⃣ Check Token Expiration:');
  const isExpired = isTokenExpired(adminToken);
  console.log('Is Expired?', isExpired ? '❌ Yes' : '✅ No');
  const expiresAt = getTokenExpiration(adminToken);
  console.log('Expires At:', expiresAt.toLocaleString());
  
  console.log('\n━'.repeat(60));
  console.log('✨ Done! Use the generated tokens for testing.');
  console.log('━'.repeat(60));
  console.log('\n');
}