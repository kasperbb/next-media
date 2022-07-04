import { MOVIEDB_API_KEY, MOVIEDB_BASE_URL, SONARR_API_KEY, SONARR_BASE_URL } from '@constants/api'

export function constructMediaUrl(query: string, params: string[] = []) {
  const queryParams = [`api_key=${MOVIEDB_API_KEY}`, ...params]
  return `${MOVIEDB_BASE_URL}${query}?${queryParams.join('&')}`
}

export function constructSonarrUrl(query: string, params: string[] = []) {
  const queryParams = [`apikey=${SONARR_API_KEY}`, ...params]
  return `${SONARR_BASE_URL}${query}?${queryParams.join('&')}`
}
