import { ToastContext } from './toast.provider'
import { useContext } from 'react'

export function useToast() {
  const context = useContext(ToastContext)

  if (!context) throw new Error('useToast used outside of ToastProvider')

  return context
}
