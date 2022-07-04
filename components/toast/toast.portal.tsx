import { Toast as IToast } from '@interfaces/toast'
import { Portal } from '@components/Portal'
import React from 'react'
import { Toast } from './toast'

interface ToastPortalProps {
  toasts: IToast[]
}

export function ToastPortal({ toasts }: ToastPortalProps) {
  console.log('toasts', toasts)
  return (
    <Portal id="toast-portal" as="div" className="fixed flex flex-col items-center w-full gap-4 bottom-6">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </Portal>
  )
}
