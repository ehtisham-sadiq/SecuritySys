import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: NextRequest) {
  // Set the content type header explicitly
  const headers = {
    "Content-Type": "application/json",
  }

  try {
    // Parse the request body
    const body = await request.json()
    const { email, password } = body

    console.log("Login attempt:", { email }) // Log the login attempt

    // Simple validation
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400, headers })
    }

    // Hardcoded admin credentials for testing
    if (email === "admin@securitysystem.com" && password === "admin123") {
      // Generate JWT token
      const token = jwt.sign(
        {
          userId: 1,
          email: "admin@securitysystem.com",
          role: "admin",
        },
        JWT_SECRET,
        { expiresIn: "24h" },
      )

      // Return success response
      return NextResponse.json(
        {
          access_token: token,
          user: {
            id: 1,
            email: "admin@securitysystem.com",
            firstName: "Admin",
            lastName: "User",
            role: "admin",
          },
        },
        { headers },
      )
    }

    // If credentials don't match
    return NextResponse.json({ message: "Invalid email or password" }, { status: 401, headers })
  } catch (error) {
    console.error("Login error:", error)

    // Return a simple error response
    return NextResponse.json({ message: "An error occurred during login" }, { status: 500, headers })
  }
}
