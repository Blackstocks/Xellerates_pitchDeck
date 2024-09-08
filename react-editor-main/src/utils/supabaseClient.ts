// src/lib/supabaseClient.ts in Canva clone
import { createClient } from "@supabase/supabase-js"
import Cookies from "js-cookie"

// Initialize Supabase client using Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

console.log("Supabase URL:", supabaseUrl)
console.log("Supabase Anon Key:", supabaseAnonKey)

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Function to set the session using tokens from cookies
const setSupabaseSessionFromCookies = async () => {
  // Retrieve the tokens from cookies
  const accessToken = Cookies.get("access_token")
  const refreshToken = Cookies.get("refresh_token")

  if (accessToken && refreshToken) {
    // Set the session in Supabase using the tokens
    const { data, error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    })

    if (error) {
      console.error("Error setting session:", error.message)
    } else {
      console.log("Session set successfully:", data)
    }
  }
}

// Call the function to set the session whenever this file is imported
setSupabaseSessionFromCookies()

export { supabase }
