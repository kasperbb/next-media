import { CSSProperties, ImgHTMLAttributes, useEffect, useMemo, useRef, useState } from 'react'

import { SONARR_IMAGE_BASE_URL } from '@constants/api'
import { useConfig } from '@hooks/useConfig'

interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string | undefined | null
  fallback?: string
  transition?: number
  type?: 'backdrop' | 'profile' | 'still' | 'logo' | 'poster'
  size?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  preventDrag?: boolean
  isSonarr?: boolean
  isAbsolute?: boolean
}

const imageLoadedStyle = {
  opacity: '1',
}

export function Image({
  src,
  fallback = '/images/placeholder.jpg',
  alt = '',
  className,
  style,
  transition = 400,
  type = 'poster',
  size = 3,
  preventDrag = false,
  isSonarr = false,
  isAbsolute = false,
  ...rest
}: ImageProps) {
  const { data: config } = useConfig()
  const [hasLoaded, setHasLoaded] = useState(false)
  const componentMounted = useRef(false)

  const imageSrc = useMemo(() => {
    if (isAbsolute) return src
    if (isSonarr) return SONARR_IMAGE_BASE_URL + src

    return config ? config.images.secure_base_url + config.images[`${type}_sizes`][size] + src : fallback
  }, [config, fallback, isAbsolute, isSonarr, size, src, type])

  useEffect(() => {
    if (imageSrc) {
      const image = new window.Image()
      image.src = imageSrc
      image.onload = onImageLoad
      componentMounted.current = true
    }

    return () => {
      componentMounted.current = false
    }
  }, [imageSrc])

  function onImageLoad() {
    if (componentMounted.current) {
      setHasLoaded(true)
    }
  }

  let imageStyle: CSSProperties = {
    opacity: '0',
    transition: `opacity ${transition}ms ease-in 0s`,
  }

  return (
    <object
      className={className || ''}
      style={hasLoaded ? { ...style, ...imageStyle, ...imageLoadedStyle } : { ...style, ...imageStyle }}
      data={imageSrc ? imageSrc : undefined}
      type="image/png"
      draggable={!preventDrag}
      onMouseDown={(e) => preventDrag && e.preventDefault()}
    >
      <img
        className={className || ''}
        style={hasLoaded ? { ...style, ...imageStyle, ...imageLoadedStyle } : { ...style, ...imageStyle }}
        src={fallback}
        alt={alt}
        draggable={!preventDrag}
        onMouseDown={(e) => preventDrag && e.preventDefault()}
        {...rest}
      />
    </object>
  )
}
