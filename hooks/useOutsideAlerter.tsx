import { RefObject, useEffect } from 'react'

/**
 * Run a function when you click outside of the specified ref/refs.
 *
 * @param {function} func
 * @param {RefObject<any>  | RefObject<any>[]} ref
 * @functions
 */
export function useOutsideAlerter(func: () => any, ref: RefObject<any> | RefObject<any>[]) {
	useEffect(() => {
		function handleClickOutside(event: any) {
			if (Array.isArray(ref)) {
				for (let i = 0; i < ref.length; i++) {
					if (ref[i].current && ref[i].current.contains(event.target)) return
				}

				return func()
			}

			if (ref.current && !ref.current.contains(event.target)) {
				func()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [ref])
}
