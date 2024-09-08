// fetcher.ts in Canva Clone
export const fetcher = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
    credentials: "include", // Ensure cookies are sent with requests
  })

  if (!response.ok) {
    throw new Error("Failed to fetch")
  }

  return response.json()
}
