import { prefetchMedia, useMedia } from '@hooks/useMedia'

import { GetServerSideProps } from 'next/types'
import { Media } from '@interfaces/media.interfaces'
import { MovieDetails } from '@components/Details/MovieDetails'
import { ParsedUrlQuery } from 'querystring'
import { useRouter } from 'next/router'

interface Params extends ParsedUrlQuery {
  id: string
}
export const getServerSideProps: GetServerSideProps<{}, Params> = async ({ params }) => {
  const { id } = params!

  return await prefetchMedia({
    queries: [`/movie/${id}`],
    params: ['append_to_response=watch/providers'],
  })
}

export default function TVShowDetailsPage() {
  const {
    query: { id },
  } = useRouter()

  const { data } = useMedia<Media.Details.Movie>(`/movie/${id}`, { params: ['append_to_response=watch/providers'] })

  if (!data) return null

  return <MovieDetails {...data} />
}
