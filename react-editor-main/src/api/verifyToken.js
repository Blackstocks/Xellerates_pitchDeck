// pages/api/verifyJwt.js
import jwt from "jsonwebtoken"

export default function handler(req, res) {
  const token = req.headers.authorization?.split(" ")[1] // Extract the token from the Authorization header

  if (!token) {
    return res.status(401).json({ error: "Token is required" })
  }

  try {
    const decoded = jwt.verify(token, process.env.VITE_JWT_SECRET) // Verify the token
    return res.status(200).json({ decoded })
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" })
  }
}
