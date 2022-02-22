import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid'
import { DateString } from '@interfaces/date'
import { Media } from '@interfaces/media'
import { getCurrentMonth, getCurrentMonthIndex, getCurrentYear, getDaysInMonth, getFirstDayOfMonth } from '@utils/calendar'
import moment from 'moment'
import { FC, useState } from 'react'
import { Cell } from './Cell'
import { Episodes } from './Episodes'
import { Row } from './Row'

interface Props {
	episodeList: Media.Details.TVShow[]
}

export const Calendar: FC<Props> = ({ episodeList }) => {
	const [momentObj, setMomentObj] = useState(moment())
	const [currentDay] = useState(+momentObj.format('D'))
	const [currentMonth] = useState(new Date().getMonth())

	const setMonth = (index: number) => {
		let dateObject = Object.assign({}, momentObj)
		dateObject = moment(dateObject).set('month', index)
		setMomentObj(dateObject)
	}

	const getThisMonthsEpisodes = () => {
		return episodeList.filter(item => {
			const month = +item.next_episode_to_air?.air_date?.split('-')[1]
			const year = +item.next_episode_to_air?.air_date?.split('-')[0]
			return month === getCurrentMonth(momentObj) && year === getCurrentYear(momentObj)
		})
	}

	const getNextEpisodesForDay = (day: number, episodes: Media.Details.TVShow[]) => {
		return episodes.filter(episode => {
			return +episode.next_episode_to_air?.air_date?.split('-')[2]! === day
		})
	}

	const getPreviousEpisodesForDay = (day: number, episodes: Media.Details.TVShow[]) => {
		return episodes.filter(episode => {
			return +episode.last_episode_to_air?.air_date?.split('-')[2]! === day
		})
	}

	const blanks = Array.from({ length: getFirstDayOfMonth(momentObj) }, (_, i) => i).map(el => {
		return <Cell key={el + 500}></Cell>
	})

	const thisMonthsEpisodes = getThisMonthsEpisodes()
	const sorted = thisMonthsEpisodes.sort((a, b) => {
		return new Date(a.next_episode_to_air?.air_date).getTime() - new Date(b.next_episode_to_air?.air_date).getTime()
	})

	type Acc = {
		[key in DateString]: Media.Details.TVShow[]
	}
	const reduced: Acc = sorted.reduce<Acc>((acc, episode) => {
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

	console.log('sorted', sorted)
	console.log('reduced', reduced)

	const daysInMonth = Array.from({ length: getDaysInMonth(momentObj) }, (_, i) => i + 1).map(el => {
		const nextEpisodes = getNextEpisodesForDay(el, thisMonthsEpisodes)
		const previousEpisodes = getPreviousEpisodesForDay(el, thisMonthsEpisodes)

		return (
			<Cell key={el} isCurrentDay={el === currentDay && getCurrentMonthIndex(momentObj) === currentMonth}>
				<span className="block">{el}</span>
				<Episodes episodes={nextEpisodes} type="next" />
				<Episodes episodes={previousEpisodes} type="previous" />
			</Cell>
		)
	})

	const totalSlots = [...blanks, ...daysInMonth]
	const rows: any[] = []
	let cells: any[] = []

	totalSlots.forEach((row, i) => {
		if (i % 7 !== 0) {
			cells.push(row)
		} else {
			rows.push(cells)
			cells = []
			cells.push(row)
		}
		if (i === totalSlots.length - 1) {
			rows.push(cells)
		}
	})

	return (
		<div className="px-10 mx-auto my-20 max-w-7xl">
			<div className="flex items-center justify-between mb-5">
				<h1 className="text-3xl font-heading">{momentObj.format('MMMM YYYY')}</h1>

				<div className="flex gap-2">
					<button
						className="p-2 text-gray-500 border rounded hover:bg-gray-50"
						onClick={() => {
							setMonth(getCurrentMonthIndex(momentObj) - 1)
						}}
					>
						<ArrowLeftIcon className="w-4 h-4" />
					</button>
					<button
						className="p-2 text-gray-500 border rounded hover:bg-gray-50"
						onClick={() => {
							setMonth(getCurrentMonthIndex(momentObj) + 1)
						}}
					>
						<ArrowRightIcon className="w-4 h-4" />
					</button>
				</div>
			</div>

			<table className="w-full">
				<thead>
					<tr>
						{moment.weekdaysShort().map(day => (
							<th key={day} className="p-3 font-medium border">
								{day}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((day, i) => {
						return day.length ? <Row key={i}>{day}</Row> : null
					})}
				</tbody>
			</table>
		</div>
	)
}
