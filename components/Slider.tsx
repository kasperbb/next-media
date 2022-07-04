import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
import React, { HTMLAttributes, useCallback, useEffect, useRef, useState } from 'react'

import { Key } from 'ts-key-enum'
import clsx from 'clsx'
import { useGesture } from '@use-gesture/react'

enum SCROLL_POSITION {
  LEFT = -1,
  MIDDLE = 0,
  RIGHT = 1,
}

const dragThreshold = 5
const simulatedDragDistance = 800 // Distance in pixels

interface SliderDefaultProps {
  title: string
  children: React.ReactNode
  shouldNotResize?: boolean
  rememberPositionKey?: string
  oldMargin?: boolean
  className?: string
  isLoading?: boolean
}

interface SliderWithLinkProps extends SliderDefaultProps {
  link?: string
  onClick?: never
}

interface SliderWithButtonProps extends SliderDefaultProps {
  link?: never
  onClick?: () => void
}

type SliderProps = (SliderWithLinkProps | SliderWithButtonProps) & HTMLAttributes<HTMLElement>

interface ArrowButtonProps {
  scrollPosition: SCROLL_POSITION
  simulateDrag: (direction: boolean) => void
  direction: 'right' | 'left'
}

const ArrowButton: React.FC<ArrowButtonProps> = ({ direction, scrollPosition, simulateDrag }) => {
  const isDisabled = direction === 'right' ? scrollPosition === SCROLL_POSITION.RIGHT : scrollPosition === SCROLL_POSITION.LEFT

  return (
    <button
      className={clsx(
        'flex items-center justify-center absolute top-0 mt-12 h-[calc(100%-24px-48px)] w-20 ',
        direction === 'right' ? 'right-0' : 'left-0',
        isDisabled && 'opacity-0'
      )}
      style={{
        backgroundImage: `linear-gradient(${direction === 'right' ? '90deg' : '-90deg'}, transparent 0%, #1d1d27)`,
      }}
      onClick={() => {
        simulateDrag(direction === 'right' ?? true)
      }}
      disabled={isDisabled}
      onKeyDown={(e) => {
        if (e.key === Key.Enter) {
          simulateDrag(direction === 'right' ?? true)
        }
      }}
    >
      {direction === 'right' ? <IoChevronForward className="scale-150" /> : <IoChevronBack className="scale-150" />}
    </button>
  )
}

const CACHE: { [rememberPositionKey: string]: number } = {}

export function Slider({
  title,
  link,
  onClick,
  children,
  shouldNotResize,
  rememberPositionKey,
  oldMargin,
  className = '',
  isLoading = false,
  ...rest
}: SliderProps) {
  const ref = useRef<HTMLUListElement>(null)

  const [isDragging, setIsDragging] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [xOffset, setXOffset] = useState(rememberPositionKey ? CACHE[rememberPositionKey] ?? 0 : 0)
  const [scrollPosition, setScrollPosition] = useState(SCROLL_POSITION.LEFT)
  const [width, setWidth] = useState(1920)

  const shouldRenderArrows = useCallback(() => {
    return ref.current && ref.current.scrollWidth > ref.current.offsetWidth
  }, [])

  useEffect(() => {
    setWidth(window.innerWidth)

    window.addEventListener('resize', () => setWidth(window.innerWidth), {
      passive: false,
    })

    if (!shouldNotResize) {
      return () => window.removeEventListener('resize', () => setWidth(window.innerWidth))
    }
  }, [width, shouldNotResize, shouldRenderArrows])

  useEffect(() => {
    return () => {
      if (rememberPositionKey) {
        CACHE[rememberPositionKey] = xOffset
      }
    }
  }, [rememberPositionKey, xOffset])

  useEffect(() => {
    if (rememberPositionKey && ref.current) {
      ref.current.scrollLeft = CACHE[rememberPositionKey] ?? 0
    }
  }, [rememberPositionKey])

  const onDragCallback = (x: number, last: boolean, dragging: boolean) => {
    const newPos = xOffset + -x
    const maxScrollWidth = scrollWhileDragging(newPos, dragging)

    handleLastDragEvent(last, newPos, maxScrollWidth)
  }

  function scrollWhileDragging(newPos: number, dragging: boolean) {
    // Keep track of dragging state to make sure that ´pointer-events: 'none'´ while dragging
    if (dragging) {
      setIsClicking(false)
      setIsDragging(true)
    }

    if (ref && ref.current) {
      const clientWidth = ref.current.clientWidth
      const scrollWidth = ref.current.scrollWidth
      const maxScrollWidth = scrollWidth - clientWidth

      // Scroll freely between the limits
      if (newPos > 0 && newPos < scrollWidth) {
        ref.current.scrollLeft = newPos
      }

      // Set initial position if user is dragging all the way to the left
      if (newPos <= 0) {
        ref.current.scrollLeft = 0
      }

      return maxScrollWidth
    }
  }

  function handleLastDragEvent(isLastEvent: boolean, newPos: number, maxScrollWidth: number | undefined) {
    if (isLastEvent) {
      // If the offset is negative scrollLeft should be set to 0 to avoid "negative" scrolling.
      if (newPos < 0) {
        setXOffset(0)
        setScrollPosition(SCROLL_POSITION.LEFT)
        if (ref && ref.current && isClicking) {
          ref.current.scrollLeft = 0
        }
        // If the offset is has reached max scroll width "over-scrolling" should not happen
      } else if (maxScrollWidth && newPos > maxScrollWidth) {
        if (ref && ref.current) {
          setXOffset(maxScrollWidth)
          setScrollPosition(SCROLL_POSITION.RIGHT)
          if (isClicking) {
            ref.current.scrollLeft = maxScrollWidth
          }
        }
      } else {
        setScrollPosition(SCROLL_POSITION.MIDDLE)
        setXOffset(newPos)
      }
      setIsDragging(false)
    }
  }

  const handleSimulateDrag = (direction: boolean) => {
    setIsClicking(true)
    if (ref && ref.current) {
      // Smooth scrolling for button scrolling.
      ref.current.style.scrollBehavior = 'smooth'
    }
    onDragCallback(simulatedDragDistance * (direction ? -1 : 1), true, false)
  }

  const bindGestures = useGesture(
    {
      onDrag: ({ movement: [x], last, dragging, event }) => {
        if (ref && ref.current) {
          ref.current.style.scrollBehavior = 'auto'
        }
        if (event) {
          switch (event.type) {
            case 'touchmove':
            case 'touchend':
              if (ref && ref.current) {
                setXOffset(ref.current.scrollLeft)
              }
              break
            default:
              onDragCallback(x, last, Boolean(dragging))
          }
        }
      },
      onWheel: ({ last }) => {
        if (ref && ref.current) {
          setXOffset(ref.current.scrollLeft)

          if (last) {
            if (ref.current.scrollLeft <= 0) {
              setScrollPosition(SCROLL_POSITION.LEFT)
            } else if (ref.current.scrollLeft === ref.current.scrollWidth - ref.current.clientWidth) {
              setScrollPosition(SCROLL_POSITION.RIGHT)
            } else {
              setScrollPosition(SCROLL_POSITION.MIDDLE)
            }
          }
        }
      },

      // Mouse enter and leave to prevent back and forward navigation for trackpads.
      onMouseEnter: () => {
        document.body.style.overscrollBehaviorX = 'contain'
      },
      onMouseLeave: () => {
        document.body.style.overscrollBehaviorX = ''
      },
    },
    {
      // pixel threshold in order to destinguish between click and drag.
      drag: { threshold: dragThreshold },
      domTarget: ref,
      eventOptions: { passive: false },
    }
  )

  return (
    <section className="relative mb-14" {...rest}>
      <h1 className="mx-20 mb-4 text-2xl font-semibold font-heading">{title}</h1>

      <ul
        className={clsx('flex max-w-full gap-4 overflow-x-auto no-scrollbar', isDragging && 'cursor-grabbing')}
        style={{
          pointerEvents: isDragging ? 'none' : 'auto',
          userSelect: isDragging ? 'none' : 'auto',
        }}
        ref={ref}
        {...bindGestures()}
      >
        {children}
      </ul>

      <ArrowButton scrollPosition={scrollPosition} simulateDrag={handleSimulateDrag} direction="left" />
      <ArrowButton scrollPosition={scrollPosition} simulateDrag={handleSimulateDrag} direction="right" />
    </section>
  )
}
