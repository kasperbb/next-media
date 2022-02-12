import { CalendarIcon, TagIcon, TranslateIcon } from '@heroicons/react/solid'

import { FC } from 'react'
import Head from 'next/head'
import { Image } from '@components/Image'
import { Media } from '@interfaces/media'
import moment from 'moment'

export const MovieDetails: FC<Media.Details.Movie> = ({ title, release_date, poster_path, backdrop_path, overview, status, original_language, genres }) => {
	return (
		<>
			<Head>
				<title>{title} – Next Media</title>
			</Head>

			<Image src={backdrop_path} type="backdrop" size={2} className="object-cover object-top w-full max-h-[400px]" />

			<div className="relative flex max-w-6xl gap-8 mx-auto bg-white rounded shadow-lg p-7 -mt-60">
				<Image src={poster_path} alt={`Poster for ${title}`} className="object-cover w-64 rounded" />

				<div>
					<h1 className="mb-4 text-4xl font-bold text-accent font-heading">
						{title} <span className="text-xl font-medium text-gray-500">({release_date?.slice(0, 4)})</span>
					</h1>
					<div className="flex gap-4 mb-4">
						<div className="flex gap-2 text-sm font-medium">
							<CalendarIcon className="w-5 h-5 text-primary" />
							{moment(release_date).format('MMM Do YYYY') || status}
						</div>

						<div className="flex gap-2 text-sm font-medium uppercase">
							<TranslateIcon className="w-5 h-5 text-primary" />
							{original_language}
						</div>

						<div className="flex gap-2 text-sm font-medium">
							<TagIcon className="w-5 h-5 text-primary" />
							{genres?.map(genre => genre.name).join(', ')}
						</div>
					</div>
					<p className="text-gray-600">{overview}</p>
				</div>
			</div>
		</>
	)
}
