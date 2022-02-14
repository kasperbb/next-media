import 'swiper/css'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'

import { GetServerSideProps } from 'next/types'
import { Image } from '@components/Image'
import Link from 'next/link'
import { Media } from '@interfaces/media'
import { axios } from '@lib/axios'

export const getServerSideProps: GetServerSideProps = async () => {
	const { data: popularShows }: { data: Media.Search.Results } = await axios.get(`/tv/popular`)
	const { data: popularMovies }: { data: Media.Search.Results } = await axios.get(`/movie/popular`)

	const { data: tvGenres }: { data: Media.Search.Results } = await axios.get(`/genre/tv/list`)
	console.log(tvGenres)

	return { props: { popularShows: popularShows.results, popularMovies: popularMovies.results } }
}

interface IndexPageProps {
	popularShows: Media.Search.TVShow[]
	popularMovies: Media.Search.Movie[]
}

export default function IndexPage({ popularShows, popularMovies }: IndexPageProps) {
	return (
		<>
			<main className="px-10 mx-auto my-20 max-w-screen-xxl">
				<section className="mb-20">
					<h1 className="mb-3 text-3xl font-bold font-heading text-accent">TV Shows - Popular</h1>
					<Swiper spaceBetween={5} slidesPerView={8} slidesPerGroup={8} navigation className="relative h-[300px] group rounded overflow-hidden">
						<SlidePrevButton />

						{popularShows.map(show => (
							<SwiperSlide key={show.id}>
								<Link href={`/tv/${show.id}`}>
									<a className="w-full h-full overflow-hidden rounded">
										<Image src={show.poster_path} className="object-cover w-full h-full rounded" />
									</a>
								</Link>
							</SwiperSlide>
						))}

						<SlideNextButton />
					</Swiper>
				</section>

				<section>
					<h1 className="mb-3 text-3xl font-bold font-heading text-accent">Movies - Popular</h1>
					<Swiper spaceBetween={5} slidesPerView={8} slidesPerGroup={8} navigation className="relative h-[300px] group rounded overflow-hidden">
						<SlidePrevButton />

						{popularMovies.map(movie => (
							<SwiperSlide key={movie.id}>
								<Link href={`/movie/${movie.id}`}>
									<a className="w-full h-full overflow-hidden rounded">
										<Image src={movie.poster_path} className="object-cover w-full h-full rounded" />
									</a>
								</Link>
							</SwiperSlide>
						))}

						<SlideNextButton />
					</Swiper>
				</section>
			</main>
		</>
	)
}

export function SlideNextButton() {
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

export function SlidePrevButton() {
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
