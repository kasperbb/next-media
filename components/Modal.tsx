import ReactModal from 'react-modal'
import { useEffect } from 'react'

export function Modal(props: ReactModal.Props) {
  useEffect(() => {
    ReactModal.setAppElement('#__next')
  }, [])

  return <ReactModal {...props} />
}
