import jwt from "jsonwebtoken"

export default async (req, res) => {
  if (req.method === "POST") {
    const { token } = req.body

    if (!token) {
      return res.status(400).json({ error: "No token provided" })
    }

    try {
      const decoded = jwt.verify(token, process.env.VITE_JWT_SECRET)
      const userId = decoded.userId

      return res.status(200).json({ userId })
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token" })
    }
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
