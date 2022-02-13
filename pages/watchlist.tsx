import { GetServerSideProps } from 'next/types'
import { TVShowSearchCard } from '@components/SearchCards/TVShowSearchCard'
import { axios } from '@lib/axios'
import { getAuthData } from '@utils/auth'
import { supabase } from '@lib/supabase'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const { id } = await getAuthData(req)

	const { data, error } = await supabase.from('user_media').select('media_id').eq('user_id', id)

	if (error) throw error

	const allIds = data?.map(item => item.media_id)!

	const promises: any[] = []
	allIds.forEach(id => {
		const promise = axios.get(`/tv/${id}`)
		promises.push(promise)
	})

	let list = await Promise.all(promises)
	list = list.map(item => item.data)
	console.log(list)

	return { props: { list } }
}

interface WatchlistPageProps {
	list: any[]
}

export default function WatchlistPage({ list }: WatchlistPageProps) {
	return (
		<div className="max-w-6xl px-10 mx-auto my-20">
			<h1 className="mb-6 text-4xl font-bold font-heading">Watchlist</h1>
			<ul className="grid grid-cols-3 gap-3">
				{list.map(item => (
					<li key={item.id}>
						<TVShowSearchCard {...item} />
					</li>
				))}
			</ul>
		</div>
	)
}
