import { GetServerSideProps } from 'next/types'
import { Media } from '@interfaces/media'
import { MediaSlider } from '@components/MediaSlider'
import { axios } from '@lib/axios'

export const getServerSideProps: GetServerSideProps = async () => {
	const { data: popularShows }: { data: Media.Search.Results } = await axios.get(`/tv/popular`)
	const { data: popularMovies }: { data: Media.Search.Results } = await axios.get(`/movie/popular`)

	const { data: trending }: { data: Media.Search.Results } = await axios.get(`/trending/all/week`)

	const { data: tvGenres }: { data: Media.Search.Results } = await axios.get(`/genre/tv/list`)
	console.log(tvGenres)

	return { props: { popularShows: popularShows.results, popularMovies: popularMovies.results, trending: trending.results } }
}

interface IndexPageProps {
	popularShows: Media.Search.TVShow[]
	popularMovies: Media.Search.Movie[]
	trending: (Media.Search.TVShow & Media.Search.Movie)[]
}

export default function IndexPage({ popularShows, popularMovies, trending }: IndexPageProps) {
	return (
		<>
			<main className="px-10 mx-auto my-20 max-w-screen-xxl">
				<section className="mb-20">
					<h1 className="mb-3 text-3xl font-bold font-heading text-accent">Trending</h1>
					<MediaSlider media={trending} />
				</section>

				<section className="mb-20">
					<h1 className="mb-3 text-3xl font-bold font-heading text-accent">TV Shows - Popular</h1>
					<MediaSlider media={popularShows} type={Media.Types.TV} />
				</section>

				<section>
					<h1 className="mb-3 text-3xl font-bold font-heading text-accent">Movies - Popular</h1>
					<MediaSlider media={popularMovies} type={Media.Types.MOVIE} />
				</section>
			</main>
		</>
	)
}
