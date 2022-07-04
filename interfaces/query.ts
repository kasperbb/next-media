import { UseQueryOptions } from 'react-query'

type Options<T extends unknown> = Omit<UseQueryOptions<T, unknown, T>, 'queryKey' | 'queryFn'>

export interface UseQueryOptionsWithParams<T extends unknown = unknown> extends Options<T> {
  params?: string[]
}
