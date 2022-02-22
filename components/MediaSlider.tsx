import 'swiper/css'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'

import { FC } from 'react'
import { Media } from '@interfaces/media'
import { MediaCard } from './MediaCard'

interface TvProps {
	media: Media.Search.TVShow[]
	type: 'tv'
}

interface MovieProps {
	media: Media.Search.Movie[]
	type: 'movie'
}

interface MixProps {
	media: (Media.Search.TVShow & Media.Search.Movie)[]
}

export const MediaSlider: FC<TvProps | MovieProps | MixProps> = ({ media, ...props }) => {
	return (
		<Swiper spaceBetween={5} slidesPerView={8} slidesPerGroup={4} navigation className="relative h-[300px] group rounded overflow-hidden">
			<SlidePrevButton />

			{media.map(item => (
				<SwiperSlide key={item.id}>
					<MediaCard {...item} {...props} />
				</SwiperSlide>
			))}

			<SlideNextButton />
		</Swiper>
	)
}

function SlideNextButton() {
	const swiper = useSwiper()

	return (
		<button
			className="absolute top-0 right-0 z-10 flex items-center justify-center w-10 h-full text-white bg-gray-800 opacity-0 bg-opacity-70 group-hover:opacity-100"
			onClick={() => swiper?.slideNext()}
		>
			<ChevronRightIcon className="w-10" />
		</button>
	)
}

function SlidePrevButton() {
	const swiper = useSwiper()

	return (
		<button
			className="absolute top-0 left-0 z-10 flex items-center justify-center w-10 h-full text-white bg-gray-800 opacity-0 bg-opacity-70 group-hover:opacity-100"
			onClick={() => swiper?.slidePrev()}
		>
			<ChevronLeftIcon className="w-10" />
		</button>
	)
}
