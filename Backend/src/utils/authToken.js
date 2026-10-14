const { createHmac, randomBytes, timingSafeEqual } = require("node:crypto");

const tokenSecret = process.env.AUTH_TOKEN_SECRET || randomBytes(32).toString("hex");
const tokenLifetimeSeconds = 7 * 24 * 60 * 60;

function signToken(userId) {
  const payload = Buffer.from(
    JSON.stringify({
      sub: userId,
      exp: Math.floor(Date.now() / 1000) + tokenLifetimeSeconds,
    })
  ).toString("base64url");
  const signature = createHmac("sha256", tokenSecret).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

function verifyToken(token) {
  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra) return null;

  const expected = createHmac("sha256", tokenSecret).update(payload).digest();
  const actual = Buffer.from(signature, "base64url");
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;

  try {
    const claims = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (typeof claims.sub !== "string" || typeof claims.exp !== "number" || claims.exp <= Date.now() / 1000) {
      return null;
    }
    return claims;
  } catch {
    return null;
  }
}

module.exports = { signToken, verifyToken };
