import { Media } from '@interfaces/media'
import Link from 'next/link'
import { FC } from 'react'
import { Image } from '@components/Image'

export const MovieSearchCard: FC<Media.Search.Movie> = ({ id, media_type, poster_path, title, release_date }) => {
	return (
		<Link href={`/${media_type}/${id}`}>
			<a className="flex items-center p-1 -ml-1 rounded hover:bg-gray-50">
				<Image src={poster_path} className="object-cover h-16 mr-4 rounded w-11" />
				<div>
					<p className="font-medium">{title}</p>
					<p className="text-sm text-gray-500 capitalize">
						{media_type}, {release_date?.slice(0, 4)}
					</p>
				</div>
			</a>
		</Link>
	)
}
