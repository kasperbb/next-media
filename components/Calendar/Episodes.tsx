import { Media } from '@interfaces/media'
import { FC } from 'react'

interface Props {
	episodes: Media.Details.TVShow[]
	type: 'next' | 'previous'
	size?: 'small' | 'medium' | 'large'
}

enum SizePadding {
	small = 1,
	medium = 2,
	large = 3,
}

enum SizeFont {
	small = 'xs',
	medium = 'sm',
	large = 'base',
}

export const Episodes: FC<Props> = ({ episodes, type, size = 'small' }) => {
	if (!episodes.length) return null

	const renderSeasonAndEpisodeLabel = (episode: Media.Details.TVShow) => {
		switch (type) {
			case 'next':
				return (
					<span className="">
						{episode.next_episode_to_air?.season_number}x{episode.next_episode_to_air?.episode_number}
					</span>
				)
			case 'previous':
				return (
					<span className="">
						{episode.last_episode_to_air?.season_number}x{episode.last_episode_to_air?.episode_number}
					</span>
				)
		}
	}

	return (
		<ul className="flex flex-col gap-1 mt-2">
			{episodes.map(episode => (
				<li
					key={episode.id}
					className={`flex justify-between p-${SizePadding[size]} text-${SizeFont[size]} text-left text-white rounded-sm bg-primary-500`}
				>
					{episode.name} {renderSeasonAndEpisodeLabel(episode)}
				</li>
			))}
		</ul>
	)
}
