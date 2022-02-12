import { useEffect, useState } from 'react'

import { supabase } from '@lib/supabase'
import { useAuth } from '@context/AuthContext'

const fetchMedia = async (userId: string) => {
	const { data, error } = await supabase.from('user_media').select('media_id').eq('user_id', userId)
	if (error) throw error
	return data?.map(item => item.media_id)!
}

export default function WatchlistPage() {
	const { user } = useAuth()
	const [media, setMedia] = useState<any[]>([])

	useEffect(() => {
		fetchMedia(user.id)
			.then(data => {
				setMedia(data)
			})
			.catch(err => {
				console.log(err)
			})
	}, [fetchMedia, user])

	return (
		<div className="max-w-6xl px-10 mx-auto my-20">
			<h1 className="text-4xl font-bold">Watchlist</h1>
			<ul>
				{media.map(item => (
					<li key={item}>{item}</li>
				))}
			</ul>
		</div>
	)
}
