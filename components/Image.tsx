import { FC } from 'react'
import { useConfig } from '@context/ConfigContext'

interface ImagePropsLarge extends React.HTMLAttributes<HTMLImageElement> {
	src: string | null
	size?: 0 | 1 | 2 | 3 | 4 | 5 | 6
	alt?: string
	type?: 'logo' | 'poster'
	className?: string
}

interface ImagePropsSmall extends React.HTMLAttributes<HTMLImageElement> {
	src?: string | null
	size?: 0 | 1 | 2 | 3
	alt?: string
	type?: 'backdrop' | 'profile' | 'still'
	className?: string
}

export const Image: FC<ImagePropsLarge | ImagePropsSmall> = ({ src, size = 3, alt = '', type = 'poster', className = '', ...props }) => {
	const config = useConfig()
	const url = config.images.secure_base_url + config.images[`${type}_sizes`][size]

	if (!src) return <img src="/placeholder.png" alt="Placeholder image" className={className} />

	return <img src={url + src} className={className} {...props} />
}
