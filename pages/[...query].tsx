import { axios } from '@lib/axios'
import { Media } from '@interfaces/media'
import { MovieDetails } from '@components/Details/MovieDetails'
import { TVShowDetails } from '@components/Details/TVShowDetails'
import { PersonDetails } from '@components/Details/PersonDetails'

interface TVShowDetailsPageProps {
	data: Media.Details.Movie | Media.Details.TVShow | Media.Details.Person
	type: string
}

export const getServerSideProps = async ({ params }) => {
	const [type, id] = params.query

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
