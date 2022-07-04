import { UseQueryOptionsWithParams } from '@interfaces/query'
import { fetchSonarr } from '@queries/sonarr.api'
import { getKey } from '@utils/queryKey'
import { useQuery } from 'react-query'

export function useSonarr<T>(query: string, options?: UseQueryOptionsWithParams<T>) {
  const key = query.split('/').filter((str) => str.length)

  const { params, ...rest } = options ?? {}

  return useQuery<T>(getKey(key, params), () => fetchSonarr({ query, params }), { staleTime: Infinity, ...rest })
}
