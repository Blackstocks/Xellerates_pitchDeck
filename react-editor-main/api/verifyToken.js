import jwt from "jsonwebtoken"

export default async function handler(req, res) {
  // Ensure the request method is POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" })
  }

  // Parse the incoming request body
  let token
  try {
    const { token: reqToken } = req.body // Change this line to use req.body directly
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
    console.log(process.env.VITE_JWT_SECRET)
    const decoded = jwt.verify(token, process.env.VITE_JWT_SECRET) // Use process.env here

    return res.status(200).json({ user: decoded })
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" })
  }
}
