import { Media } from '@interfaces/media'
import Link from 'next/link'
import { FC } from 'react'
import { Image } from '@components/Image'

export const TVShowSearchCard: FC<Media.Search.TVShow> = ({ id, media_type, poster_path, name, first_air_date }) => {
	return (
		<Link href={`/${media_type}/${id}`}>
			<a className="flex items-center p-1 -ml-1 rounded hover:bg-gray-50">
				<Image src={poster_path} className="object-cover h-16 mr-4 rounded w-11" />
				<div>
					<p className="font-medium">{name}</p>
					<p className="text-sm text-gray-500 capitalize">
						{media_type}, {first_air_date?.slice(0, 4)}
					</p>
				</div>
			</a>
		</Link>
	)
}
