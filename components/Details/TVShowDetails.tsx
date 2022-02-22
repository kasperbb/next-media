import { BookmarkIcon, CalendarIcon, TagIcon, TranslateIcon } from '@heroicons/react/solid'
import { FC, useEffect, useState } from 'react'

import Head from 'next/head'
import { Image } from '@components/Image'
import { Media } from '@interfaces/media'
import { StringMap } from '@interfaces/map'
import { WatchProviders } from '@interfaces/watchProviders'
import moment from 'moment'
import { supabase } from '@lib/supabase'
import { useAuth } from '@context/AuthContext'
import { useLocation } from '@context/LocationContext'

const getWatchlistId = async (userId: string, mediaId: number) => {
	const { data, error } = await supabase.from('user_media').select('*').filter('user_id', 'eq', userId).filter('media_id', 'eq', mediaId)

	if (error) {
		console.log('%c TVShowDetails 33', 'color:yellow', '%c getWatchlist:', 'color:red', error)
	}

	if (data?.length) {
		return data[0].id
	}

	return null
}

export const TVShowDetails: FC<Media.Details.TVShow> = ({
	id,
	name,
	first_air_date,
	poster_path,
	backdrop_path,
	overview,
	status,
	original_language,
	genres,
	'watch/providers': watchproviders,
}) => {
	const { location } = useLocation()
	const { user } = useAuth()

	const [watchlistId, setWatchlistId] = useState<string | null>(null)

	const providers = watchproviders.results[location]

	useEffect(() => {
		getWatchlistId(user.id, id).then(id => {
			setWatchlistId(id)
		})
	}, [])

	const addMedia = async () => {
		return await supabase.from('media').upsert([{ id, type: 'tv' }], { returning: 'minimal' })
	}

	const addToWatchlist = async () => {
		if (watchlistId) {
			return console.log('%c TVShowDetails 53', 'color:yellow', 'Item already exists in watchlist', watchlistId)
		}

		await addMedia()
		const { data, error } = await supabase.from('user_media').insert([{ user_id: user.id, media_id: id }])
		console.log('%c data:\n', 'color: yellow', data, error)
		setWatchlistId(id.toString())
	}

	return (
		<>
			<Head>
				<title>{name} – Next Media</title>
			</Head>

			<Image src={backdrop_path} type="backdrop" size={2} className="object-cover object-top w-full max-h-[400px]" />

			<div className="relative flex max-w-6xl gap-8 mx-auto overflow-hidden bg-white rounded shadow-lg p-7 -mt-60">
				<button
					className={`absolute flex items-start w-16 h-16  -top-3 right-4  ${
						watchlistId ? 'text-primary hover:text-primary-500' : 'text-gray-300 hover:text-gray-400'
					}`}
					onClick={addToWatchlist}
				>
					<BookmarkIcon className="w-full h-full" />
				</button>

				<Image src={poster_path} alt={`Poster for ${name}`} className="object-cover w-64 rounded" />

				<div>
					<h1 className="mb-4 text-4xl font-bold text-accent font-heading">
						{name} <span className="text-xl font-medium text-gray-500">({first_air_date?.slice(0, 4)})</span>
					</h1>

					<div className="flex gap-4 mb-4">
						<div className="flex gap-2 text-sm font-medium">
							<CalendarIcon className="w-5 h-5 text-primary" />
							{moment(first_air_date).format('MMM Do YYYY') || status}
						</div>

						<div className="flex gap-2 text-sm font-medium uppercase">
							<TranslateIcon className="w-5 h-5 text-primary" />
							{original_language}
						</div>

						<div className="flex gap-2 text-sm font-medium">
							<TagIcon className="w-5 h-5 text-primary" />
							{genres.map(genre => genre.name).join(', ')}
						</div>
					</div>

					<p className="mb-6 text-gray-600">{overview}</p>

					{providers && (
						<div className="">
							<h2 className="mb-1 text-lg text-accent font-heading">Stream now</h2>
							<ul className="flex flex-wrap gap-4 -ml-1">
								{providers?.flatrate?.map((provider: WatchProviders.Contents) => (
									<li key={provider.provider_id}>
										<a
											href={(WatchProviders.Links as StringMap)[provider.provider_name]}
											target="_blank"
											rel="noreferrer noopener"
											className="flex items-center gap-2 p-1 text-sm rounded hover:bg-gray-50"
										>
											<Image src={provider.logo_path} type="logo" className="w-8 rounded" />
											<p>{provider.provider_name}</p>
										</a>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>
		</>
	)
}
