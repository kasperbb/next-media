import { GetServerSideProps } from 'next/types'
import { MediaCard } from '@components/MediaCard'
import { getWatchlist } from '@utils/watchlist'
import { Media } from '@interfaces/media'
import moment from 'moment'
import { DateString } from '@interfaces/date'
import { Episodes } from '@components/Calendar/Episodes'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const list = await getWatchlist(req)
	return { props: { list } }
}

interface WatchlistPageProps {
	list: Media.Details.TVShow[]
}

type Acc = {
	[key in DateString]: Media.Details.TVShow[]
}

export default function WatchlistPage({ list }: WatchlistPageProps) {
	const getSortedEpisodes = () => {
		return list.sort((a, b) => {
			return new Date(a.next_episode_to_air?.air_date).getTime() - new Date(b.next_episode_to_air?.air_date).getTime()
		})
	}

	const getEpisodeList = () => {
		const sorted = getSortedEpisodes()

		const reduced: Acc = sorted.reduce((acc, episode) => {
			const key = episode.next_episode_to_air?.air_date as DateString

			if (!key) return acc

			if (!acc[key]) {
				return {
					...acc,
					[key]: [episode],
				}
			}

			return {
				...acc,
				[key]: [...acc[key], episode],
			}
		}, {} as Acc)

		return reduced
	}

	const episodeList = getEpisodeList()

	return (
		<div className="px-10 mx-auto my-20 max-w-screen-xxl">
			<h1 className="mb-6 text-4xl font-bold font-heading">Watchlist</h1>
			<div className="grid grid-cols-8 gap-8">
				<ul className="grid grid-cols-6 col-span-6 gap-3">
					{list.map(item => (
						<li key={item.id}>
							<MediaCard {...item} type={Media.Types.TV} />
						</li>
					))}
				</ul>
				<div className="flex flex-col col-span-2 gap-5">
					{Object.keys(episodeList).map(key => (
						<div>
							<h2 className="flex items-center justify-between font-semibold">
								{moment(key).format('DD MMM YYYY')} <span className="">{moment(key).format('ddd')}</span>
							</h2>
							<Episodes episodes={episodeList[key as DateString]} type="next" size="medium" />
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
