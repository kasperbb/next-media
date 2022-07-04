import { constructSonarrUrl } from '@utils/common'

interface FetchSonarrArguments {
  query: string
  params?: string[]
  options?: RequestInit
}

export async function fetchSonarr<T>({ query, params, options }: FetchSonarrArguments): Promise<T> {
  const res = await fetch(constructSonarrUrl(query, params), options)
  return res.json()
}

export async function downloadEpisode(id: number) {
  return await fetchSonarr({
    query: '/command',
    options: {
      method: 'POST',
      body: JSON.stringify({
        episodeIds: [id],
        name: 'episodesearch',
      }),
    },
  })
}

export async function getQueue(sortBy: 'timeleft') {
  return await fetchSonarr({
    query: '/queue',
    params: [`timeleft=${sortBy}`, `order=asc`],
  })
}
