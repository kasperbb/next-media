import { FC } from 'react'
import { Image } from '@components/Image'
import Link from 'next/link'
import { Media } from '@interfaces/media'

type SearchTypes = Media.Search.TVShow | Media.Search.Movie

type DetailsType = {
	type: Media.Types.TV | Media.Types.MOVIE
} & (Media.Details.TVShow | Media.Details.Movie)

type MediaCardProps = SearchTypes | DetailsType

function hasMediaType(
	arg: Media.Search.TVShow | Media.Search.Movie | Media.Details.TVShow | Media.Details.Movie
): arg is Media.Search.TVShow | Media.Search.Movie {
	return (arg as Media.Search.TVShow | Media.Search.Movie).hasOwnProperty('media_type')
}

export const MediaCard: FC<MediaCardProps> = media => {
	if (hasMediaType(media)) {
		return (
			<Link href={`/${media.media_type}/${media.id}`}>
				<a className="w-full h-full overflow-hidden rounded">
					<Image src={media.poster_path} className="object-cover w-full h-full rounded" />
				</a>
			</Link>
		)
	}

	return (
		<Link href={`/${media.type}/${media.id}`}>
			<a className="w-full h-full overflow-hidden rounded">
				<Image src={media.poster_path} className="object-cover w-full h-full rounded" />
			</a>
		</Link>
	)
}
