export interface Toast {
  id: string | number
  content: React.ReactNode
  type: 'loading' | 'success' | 'error' | 'warning'
  duration?: number
}
