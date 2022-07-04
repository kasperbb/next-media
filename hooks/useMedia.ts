import { QueryClient, dehydrate, useQuery } from 'react-query'

import { UseQueryOptionsWithParams } from '@interfaces/query'
import { constructMediaUrl } from '@utils/common'
import { getKey } from '@utils/queryKey'

export function useMedia<T>(query: string, options?: UseQueryOptionsWithParams<T>) {
  const key = query.split('/').filter((str) => str.length)

  const { params, ...rest } = options ?? {}

  return useQuery<T>(getKey(key, params), () => fetchMedia(query, params), { staleTime: Infinity, ...rest })
}

interface WithProps {
  [key: string]: unknown
}

interface PrefetchMediaQueryArguments {
  queries: string[]
  params?: string[]
  props?: WithProps
}

export async function prefetchMedia({ queries, params, props }: PrefetchMediaQueryArguments) {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['configuration'], () => fetchMedia('/configuration'), { staleTime: Infinity })

  for (const query of queries) {
    const key = query.split('/').filter((str) => str.length)
    await queryClient.prefetchQuery(getKey(key, params), () => fetchMedia(query, params), { staleTime: Infinity })
  }

  const dehydratedState = dehydrate(queryClient)

  if (props) {
    return {
      props: {
        ...props,
        dehydratedState,
      },
    }
  }

  return {
    props: {
      dehydratedState,
    },
  }
}

async function fetchMedia<T>(query: string, params?: string[]) {
  const res = await fetch(constructMediaUrl(query, params))
  return (await res.json()) as T
}
