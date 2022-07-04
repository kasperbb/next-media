import { createContext, useCallback, useState } from 'react'

import { Toast } from '@interfaces/toast'
import { ToastPortal } from '@components/toast/toast.portal'

interface ToastProviderProps {
  children: React.ReactNode
}

interface ToastProviderValues {
  toast: (toast: Toast) => void
  removeToast: (toastId: Toast['id']) => void
}

export const ToastContext = createContext<ToastProviderValues | null>(null)

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback(
    (toastId: Toast['id']) => {
      setToasts((toasts) => toasts.filter(({ id }) => id.toString() !== toastId.toString()))
    },
    [setToasts]
  )

  const toast = useCallback(
    (toast: Toast) => {
      setToasts((toasts) => [...toasts, toast])

      if (toast.duration) setTimeout(() => removeToast(toast.id), toast.duration)
    },
    [setToasts, removeToast]
  )

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      <ToastPortal toasts={toasts} />
      {children}
    </ToastContext.Provider>
  )
}
