import { Media } from '@interfaces/media'
import { axios } from '@lib/axios'
import { supabase } from '@lib/supabase'
import { IncomingMessage } from 'http'
import { NextApiRequestCookies } from 'next/dist/server/api-utils'
import { getAuthData } from './auth'

interface Response {
	data: Media.Details.All
}

export async function getWatchlist(
	req: IncomingMessage & {
		cookies: NextApiRequestCookies
	}
) {
	const { id } = await getAuthData(req)
	const { data, error } = await supabase.from('user_media').select('media_id, media(type)').eq('user_id', id)

	if (error) throw error

	const items = data?.map(item => {
		return { id: item.media_id, type: item.media.type }
	})!

	const promises: Response[] = []
	items.forEach(({ id, type }) => {
		const promise = axios.get(`/${type}/${id}`)
		promises.push(promise)
	})

	let res = await Promise.all(promises)
	const list = res.map(item => item.data)

	return list
}
