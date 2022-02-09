import { useAuth } from '@context/AuthContext'
import { supabase } from '@lib/supabase'
import { useState, useEffect } from 'react'

export default function WatchlistPage() {
	const { user } = useAuth()
	const [media, setMedia] = useState<any[]>([])

	useEffect(() => {
		fetchMedia()
	}, [])

	const fetchMedia = async () => {
		const { data, error } = await supabase.from('user_media').select('media_id').eq('user_id', user.id)
		const test = data?.map(item => item.media_id)!
		console.log(test)
		setMedia(test)
		if (error) console.log('error', error)
	}

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
