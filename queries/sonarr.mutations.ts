import { useMutation, useQueryClient } from 'react-query'

import { downloadEpisode } from './sonarr.api'
import { useToast } from '@components/toast'

interface UseDownloadEpisodeMutateArguments {
  id: number | undefined
}

export function useDownloadEpisode() {
  const queryClient = useQueryClient()
  const { toast, removeToast } = useToast()

  return useMutation(
    async ({ id }) => {
      if (!id) {
        throw new Error('The useDownloadEpisode mutation expects an id.')
      }

      toast({
        id: 'grab-loading',
        content: 'Adding to queue...',
        type: 'loading',
      })

      return await downloadEpisode(id)
    },
    {
      onMutate: async ({}: UseDownloadEpisodeMutateArguments) => {},
      onError: () => {
        removeToast('grab-loading')
        queryClient.invalidateQueries('queue')
      },
      onSuccess: () => {
        queryClient.invalidateQueries('queue')
      },
      onSettled: () => {
        queryClient.invalidateQueries('queue')
      },
    }
  )
}
