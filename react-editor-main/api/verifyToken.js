import jwt from "jsonwebtoken"

export default async function handler(req, res) {
  // Ensure the request method is POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" })
  }

  // Parse the incoming request body
  let token
  try {
    const { token: reqToken } = await req.json() // Use the Vercel body parser
    token = reqToken
  } catch (err) {
    return res.status(400).json({ error: "Invalid JSON body" })
  }

  // Ensure a token was provided
  if (!token) {
    return res.status(400).json({ error: "Token is required" })
  }

  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token, import.meta.env.VITE_JWT_SECRET)

    return res.status(200).json({ user: decoded })
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" })
  }
}
