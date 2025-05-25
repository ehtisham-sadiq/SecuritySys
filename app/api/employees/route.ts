import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/app/lib/db"

export async function GET(request: NextRequest) {
  try {
    // For now, return mock data instead of querying the database
    const mockEmployees = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        role: "Security Officer",
        status: "active",
        location: "London",
        joinDate: "2023-01-15",
        documents: [
          { id: 1, name: "SIA License", status: "approved", expiryDate: "2025-01-15" },
          { id: 2, name: "ID Verification", status: "approved", expiryDate: "2025-01-15" },
        ],
      },
      // Add more mock employees as needed
    ]

    return NextResponse.json({ employees: mockEmployees })
  } catch (error) {
    console.error("Error fetching employees:", error)
    return NextResponse.json({ message: "Failed to fetch employees" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const employeeData = await request.json()

    // Validate required fields
    const requiredFields = [
      "first_name",
      "last_name",
      "email",
      "phone",
      "address",
      "postal_code",
      "location",
      "role",
      "status",
      "availability",
    ]
    for (const field of requiredFields) {
      if (!employeeData[field]) {
        return NextResponse.json({ message: `${field.replace("_", " ")} is required` }, { status: 400 })
      }
    }

    // Check if email already exists
    const existingEmployee = await executeQuery("SELECT id FROM employees WHERE email = $1", [employeeData.email])

    if (existingEmployee && existingEmployee.length > 0) {
      return NextResponse.json({ message: "An employee with this email already exists" }, { status: 400 })
    }

    // Insert employee
    const result = await executeQuery(
      `INSERT INTO employees (
        first_name, last_name, email, phone, address, postal_code, location, 
        role, status, join_date, availability, rating, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW())
      RETURNING *`,
      [
        employeeData.first_name,
        employeeData.last_name,
        employeeData.email,
        employeeData.phone,
        employeeData.address,
        employeeData.postal_code,
        employeeData.location,
        employeeData.role,
        employeeData.status,
        employeeData.join_date || new Date(),
        employeeData.availability,
        employeeData.rating || 0.0,
      ],
    )

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error creating employee:", error)
    return NextResponse.json({ message: "An error occurred while creating the employee" }, { status: 500 })
  }
}
