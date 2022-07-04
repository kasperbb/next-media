import { UseQueryOptionsWithParams } from '@interfaces/query'

export function getKey(...args: (string[] | undefined)[]) {
  return args.filter(Boolean).flat()
}

export function createQueryKey(query: string, options?: UseQueryOptionsWithParams) {
  const key = query.split('/').filter((str) => str.length)

  const { params } = options ?? {}

  return getKey(key, params)
}
