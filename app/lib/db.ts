import { sql } from "@vercel/postgres"

// Execute a query with parameters
export async function executeQuery(query: string, params: any[] = []) {
  try {
    const result = await sql.query(query, params)
    return result.rows
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}
