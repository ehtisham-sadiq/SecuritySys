# SecuritySys

A modern, responsive frontend for a Security Company Management System built with TypeScript and React. This application provides a comprehensive interface for managing security company operations, including authentication, dashboards, shift management, employee management, document management, client management, reports, and invoicing.

## Features

### Authentication System
- Login page with email and password fields for secure access

### Dashboard Layout
- Responsive sidebar navigation
- Role-based navigation for admin, employee, and client users
- User profile dropdown with account management options
- Dark/light mode toggle for user preference

### Admin Dashboard
- Overview with key metrics (shifts, employees, hours worked, revenue)
- Upcoming shifts display
- Recent alerts section
- Tab navigation for different dashboard views

### Shift Management
- List of upcoming, active, and completed shifts
- Filtering by location, client, and status
- Shift details including location, time, and assigned officers
- Actions to view details, assign officers, and edit shifts

### Employee Management
- Employee listing with search and filtering
- Status indicators for active, pending, and inactive employees
- Document verification status
- Actions to view and edit employee details

### Document Management
- Document review system with pending, approved, and expiring categories
- Document type filtering
- Document approval workflow
- Upload functionality

### Client Management
- Client cards with key information
- Status indicators and site counts
- Filtering by location and client type

### Reports & Analytics
- Overview metrics and charts
- Filtering by time period, location, and client
- Different report types (shifts, employees, financial)

### Invoicing & Payroll
- Invoice listing with status indicators
- Filtering by client, status, and time period
- Payroll management section

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ehtisham-sadiq/SecuritySys.git
   ```
2. Navigate to the project directory:
   ```bash
   cd SecuritySysFrontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Technology Stack
- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context or Redux (depending on implementation)
- **Routing**: React Router

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License
This project is licensed under the MIT License.
