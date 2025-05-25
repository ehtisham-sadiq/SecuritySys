"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useAuth } from "@/app/context/auth-context"
import { notificationApi } from "@/app/api/api"
import { useToast } from "@/components/ui/use-toast"

interface Notification {
  id: number
  title: string
  message: string
  type: string
  is_read: boolean
  created_at: string
  reference_id?: number
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  loading: boolean
  error: string | null
  markAsRead: (id: number) => Promise<void>
  markAllAsRead: () => Promise<void>
  refreshNotifications: () => Promise<void>
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  loading: true,
  error: null,
  markAsRead: async () => {},
  markAllAsRead: async () => {},
  refreshNotifications: async () => {},
})

export const useNotifications = () => useContext(NotificationContext)

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [socket, setSocket] = useState<WebSocket | null>(null)

  const { user, isAuthenticated } = useAuth()
  const { toast } = useToast()

  const fetchNotifications = useCallback(async () => {
    if (!isAuthenticated) return

    try {
      setLoading(true)
      const response = await notificationApi.getNotifications()
      setNotifications(response.items || [])
      setUnreadCount(response.items.filter((n: Notification) => !n.is_read).length)
    } catch (err) {
      console.error("Error fetching notifications:", err)
      setError("Failed to load notifications")
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated])

  const markAsRead = async (id: number) => {
    try {
      await notificationApi.markAsRead(id)
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)))
      setUnreadCount((prev) => Math.max(0, prev - 1))
    } catch (err) {
      console.error("Error marking notification as read:", err)
    }
  }

  const markAllAsRead = async () => {
    try {
      await notificationApi.markAllAsRead()
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })))
      setUnreadCount(0)
    } catch (err) {
      console.error("Error marking all notifications as read:", err)
    }
  }

  // Setup WebSocket connection
  useEffect(() => {
    if (!isAuthenticated || !user) return

    const token = localStorage.getItem("token")
    const wsUrl = `${process.env.NEXT_PUBLIC_API_URL?.replace("http", "ws") || "ws://localhost:8000"}/ws/notifications?token=${token}`

    const newSocket = new WebSocket(wsUrl)

    newSocket.onopen = () => {
      console.log("WebSocket connection established")
    }

    newSocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)

        if (data.type === "new_notification") {
          // Add new notification to the list
          const newNotification = data.notification
          setNotifications((prev) => [newNotification, ...prev])
          setUnreadCount((prev) => prev + 1)

          // Show toast notification
          toast({
            title: newNotification.title,
            description: newNotification.message,
          })
        }
      } catch (err) {
        console.error("Error processing WebSocket message:", err)
      }
    }

    newSocket.onerror = (error) => {
      console.error("WebSocket error:", error)
    }

    newSocket.onclose = () => {
      console.log("WebSocket connection closed")
    }

    setSocket(newSocket)

    // Cleanup on unmount
    return () => {
      if (newSocket.readyState === WebSocket.OPEN) {
        newSocket.close()
      }
    }
  }, [isAuthenticated, user, toast])

  // Fetch notifications on mount and when auth state changes
  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        error,
        markAsRead,
        markAllAsRead,
        refreshNotifications: fetchNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
