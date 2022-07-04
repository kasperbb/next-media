import React, { useEffect, useRef, useState } from 'react'

import { createPortal } from 'react-dom'

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  /**
   * the html tag you want to create.
   * @default "section"
   */
  as: keyof JSX.IntrinsicElements
  id: string
  className: string
  children: React.ReactNode
}

export function Portal({ as, id, className, children, ...rest }: Props) {
  const wrapper = useRef<HTMLElement | null>(null)

  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)

    return () => setHasMounted(false)
  }, [])

  useEffect(() => {
    const el = document.createElement(as)
    wrapper.current = el
  }, [as])

  useEffect(() => {
    const current = wrapper.current as HTMLElement
    if (!current) return

    current.setAttribute('id', id)
    current.setAttribute('class', className)

    Object.keys(rest).forEach((attribute) => {
      const val: keyof typeof rest = rest[attribute as keyof typeof rest]
      current.setAttribute(attribute, val)
    })
    document.body.appendChild(current)

    return () => {
      document.body.removeChild(current)
    }
  }, [wrapper, id, className, rest, as])

  return hasMounted && wrapper.current ? createPortal(children, wrapper.current) : null
}
