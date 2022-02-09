import { Media } from '@interfaces/media'
import { FC } from 'react'
import { MovieSearchCard } from './MovieSearchCard'
import { PersonSearchCard } from './PersonSearchCard'
import { TVShowSearchCard } from './TVShowSearchCard'

export const MediaSearchCard: FC<{ result: Media.Search.Movie | Media.Search.TVShow | Media.Search.Person }> = ({ result }) => {
	switch (result.media_type) {
		case 'movie':
			return <MovieSearchCard {...result} />
		case 'tv':
			return <TVShowSearchCard {...result} />
		case 'person':
			return <PersonSearchCard {...result} />
		default:
			return null
	}
}
