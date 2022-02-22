import { Calendar } from '@components/Calendar/Calendar'
import { Media } from '@interfaces/media'
import { getWatchlist } from '@utils/watchlist'

import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const list = await getWatchlist(req)
	return { props: { list } }
}

interface CalendarPageProps {
	list: Media.Details.TVShow[]
}

export default function CalendarPage({ list }: CalendarPageProps) {
	return <Calendar episodeList={list} />
}
