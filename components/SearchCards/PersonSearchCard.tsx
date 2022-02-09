import { Media } from '@interfaces/media'
import Link from 'next/link'
import { FC } from 'react'
import { Image } from '@components/Image'

export const PersonSearchCard: FC<Media.Search.Person> = ({ id, media_type, profile_path, name, known_for_department }) => {
	return (
		<Link href={`/${media_type}/${id}`}>
			<a className="flex items-center p-1 -ml-1 rounded hover:bg-gray-50">
				<Image src={profile_path} className="object-cover h-16 mr-4 rounded w-11" />
				<div>
					<p className="font-medium">{name}</p>
					<p className="text-sm text-gray-500 capitalize">
						{media_type}, {known_for_department?.slice(0, 4)}
					</p>
				</div>
			</a>
		</Link>
	)
}
