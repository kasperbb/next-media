import { GetServerSideProps } from 'next/types'
import { Media } from '@interfaces/media'
import { MovieDetails } from '@components/Details/MovieDetails'
import { PersonDetails } from '@components/Details/PersonDetails'
import { TVShowDetails } from '@components/Details/TVShowDetails'
import { axios } from '@lib/axios'

interface TVShowDetailsPageProps {
	data: Media.Details.Movie | Media.Details.TVShow | Media.Details.Person
	type: string
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const [type, id] = params?.query as string[]

	const { data } = await axios.get(`/${type}/${id}`, {
		params: {
			append_to_response: 'watch/providers,credits,recommendations',
		},
	})

	return { props: { data, type } }
}

export default function TVShowDetailsPage({ data, type }: TVShowDetailsPageProps) {
	switch (type) {
		case 'movie':
			return <MovieDetails {...(data as Media.Details.Movie)} />
		case 'tv':
			return <TVShowDetails {...(data as Media.Details.TVShow)} />
		case 'person':
			return <PersonDetails {...(data as Media.Details.Person)} />
		default:
			return null
	}
}
