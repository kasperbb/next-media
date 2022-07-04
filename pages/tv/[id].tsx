import { prefetchMedia, useMedia } from '@hooks/useMedia'

import { GetServerSideProps } from 'next/types'
import { Media } from '@interfaces/media.interfaces'
import { ParsedUrlQuery } from 'querystring'
import { TVShowDetails } from '@components/Details/TVShowDetails'
import { useRouter } from 'next/router'

interface Params extends ParsedUrlQuery {
  id: string
}
export const getServerSideProps: GetServerSideProps<{}, Params> = async ({ params }) => {
  const { id } = params!

  return await prefetchMedia({
    queries: [`/tv/${id}`],
    params: ['append_to_response=watch/providers'],
  })
}

export default function TVShowDetailsPage() {
  const router = useRouter()
  const { id } = router.query

  const { data } = useMedia<Media.Details.TVShow>(`/tv/${id}`, { params: ['append_to_response=watch/providers'] })

  if (!data) return null

  return <TVShowDetails {...data} />
}
