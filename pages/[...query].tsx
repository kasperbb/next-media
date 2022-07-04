import { GetServerSideProps } from 'next/types'
import { Media } from '@interfaces/media.interfaces'
import { MovieDetails } from '@components/Details/MovieDetails'
import { ParsedUrlQuery } from 'querystring'
import { PersonDetails } from '@components/Details/PersonDetails'
import { TVShowDetails } from '@components/Details/TVShowDetails'
import { prefetchMedia } from '@hooks/useMedia'

interface TVShowDetailsPageProps {
  data: Media.Details.Movie | Media.Details.TVShow | Media.Details.Person
  type: string
}

interface Params extends ParsedUrlQuery {
  id: string
  type: string
}

export const getServerSideProps: GetServerSideProps<{}, Params> = async ({ params }) => {
  const { id, type } = params!

  return await prefetchMedia({
    queries: [`/${type}/${id}`],
  })
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
