import { IoAlert, IoCheckmarkCircle, IoClose } from 'react-icons/io5'

import { Toast as IToast } from '@interfaces/toast'
import { Spinner } from '@components/Spinner'
import { useToast } from './toast.hook'

export function Toast({ id, content, type }: IToast) {
  const { removeToast } = useToast()

  let leftContent = null

  switch (type) {
    case 'success':
      leftContent = <IoCheckmarkCircle className="w-4 h-4 text-green-500" />
      break
    case 'error':
      leftContent = <IoCheckmarkCircle className="w-4 h-4 text-red-500" />
      break
    case 'warning':
      leftContent = <IoCheckmarkCircle className="w-4 h-4 text-orange-500" />
      break
    case 'loading':
      leftContent = <Spinner size="1rem" />
      break
    default:
      leftContent = <IoAlert className="w-4 h-4 text-blue-500" />
  }

  return (
    <div id={id.toString()} className="flex items-center w-full max-w-xs gap-4 px-4 py-2 text-gray-400 bg-gray-800 rounded shadow" role="alert">
      {leftContent}

      <div className="pl-4 text-sm font-normal truncate border-l border-gray-700">{content}</div>

      <button
        className="rounded-full focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8 text-gray-500 hover:text-white bg-gray-800 hover:bg-gray-700"
        aria-label="Close"
        onClick={() => removeToast(id)}
      >
        <span className="sr-only">Close</span>
        <IoClose className="w-5 h-5" />
      </button>
    </div>
  )
}
