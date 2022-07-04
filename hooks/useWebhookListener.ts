import { QueryClient, useQueryClient } from 'react-query'

import { Sonarr } from '@interfaces/sonarr'
import { Webhook } from '@interfaces/webhooks'
import { sonarrGrab } from '@lib/pusher'
import { useEffect } from 'react'
import { useToast } from '@components/toast'

export function useWebhookListener() {
  const queryClient = useQueryClient()
  const { toast, removeToast } = useToast()

  useEffect(() => {
    sonarrGrab.bind('download', async ({ message: { episodes } }: Webhook.Sonarr.Download) => {
      const episode = episodes[0]
      if (!episode) return

      const arrivedEpisode = await waitUntilNewEpisodeArrived(queryClient, episode.id)
      if (!arrivedEpisode) return

      removeToast('grab-loading')
      toast({
        id: `grab-success-${episode.id}`,
        content: `Added to queue: ${arrivedEpisode.series.title} - S${episode.seasonNumber} E${episode.episodeNumber}`,
        type: 'success',
        duration: 1000 * 12,
      })
    })

    return () => {
      sonarrGrab.unbind('download')
    }
  }, [queryClient, removeToast, toast])
}

const MAX_RETRIES = 10
async function waitUntilNewEpisodeArrived(queryClient: QueryClient, id: number | undefined): Promise<Sonarr.QueueItem | undefined> {
  let retries = 1

  return await new Promise((resolve) => {
    const interval = setInterval(() => {
      const queue = queryClient.getQueryData<Sonarr.Queue>('queue')
      const episode = queue?.find((item) => item.episode.id === id)

      if (episode || retries === MAX_RETRIES) {
        clearInterval(interval)
        resolve(episode)
      }

      retries++
      queryClient.invalidateQueries('queue')
    }, 1000 * 5)
  })
}
