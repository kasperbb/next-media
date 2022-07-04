import { Config } from '@interfaces/config'
import { useMedia } from './useMedia'

export function useConfig() {
  return useMedia<Config.Data>('/configuration', {
    staleTime: Infinity,
  })
}
