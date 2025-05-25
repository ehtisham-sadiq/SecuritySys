import axios from "axios"

// Create axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
})

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await axios.post("/api/auth/login", { email, password })
    return response.data
  },
  getCurrentUser: async () => {
    const response = await api.get("/users/me")
    return response.data
  },
}

// Employee API
export const employeeApi = {
  getEmployees: async (params: any = {}) => {
    const response = await api.get("/employees", { params })
    return response.data
  },
  getEmployee: async (id: number) => {
    const response = await api.get(`/employees/${id}`)
    return response.data
  },
  createEmployee: async (employee: any) => {
    const response = await api.post("/employees", employee)
    return response.data
  },
  updateEmployee: async (id: number, employee: any) => {
    const response = await api.put(`/employees/${id}`, employee)
    return response.data
  },
}

// Document API
export const documentApi = {
  getDocuments: async (params: any = {}) => {
    const response = await api.get("/documents", { params })
    return response.data
  },
  uploadDocument: async (formData: FormData) => {
    const response = await api.post("/documents/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  },
}

// Shift API
export const shiftApi = {
  getShifts: async (params: any = {}) => {
    const response = await api.get("/shifts", { params })
    return response.data
  },
  getShift: async (id: number) => {
    const response = await api.get(`/shifts/${id}`)
    return response.data
  },
  createShift: async (shift: any) => {
    const response = await api.post("/shifts", shift)
    return response.data
  },
  updateShift: async (id: number, shift: any) => {
    const response = await api.put(`/shifts/${id}`, shift)
    return response.data
  },
  assignEmployees: async (id: number, employeeIds: number[]) => {
    const response = await api.post(`/shifts/${id}/assign`, { employee_ids: employeeIds })
    return response.data
  },
}

// Client API
export const clientApi = {
  getClients: async (params: any = {}) => {
    const response = await api.get("/clients", { params })
    return response.data
  },
  getClient: async (id: number) => {
    const response = await api.get(`/clients/${id}`)
    return response.data
  },
}

// Notification API
export const notificationApi = {
  getNotifications: async (params: any = {}) => {
    const response = await api.get("/notifications", { params })
    return response.data
  },
  markAsRead: async (id: number) => {
    const response = await api.put(`/notifications/${id}/read`)
    return response.data
  },
}

export default api
