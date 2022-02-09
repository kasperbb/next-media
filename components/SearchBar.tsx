import { Popover, Transition } from '@headlessui/react'
import { ArrowSmRightIcon, SearchIcon } from '@heroicons/react/solid'
import { useOutsideAlerter } from '@hooks/useOutsideAlerter'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Loader } from '@components/Loader'
import { useDebounce } from '@hooks/useDebounce'
import { axios } from '@lib/axios'
import { MediaSearchCard } from './SearchCards/MediaSearchCard'
import Link from 'next/link'
import { Media } from '@interfaces/media'

const RECENT_SEARCHES_LENGTH = 20

export const SearchBar = () => {
	// Panel state
	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)
	const panelRef = useRef<HTMLDivElement>(null)

	const openMenu = () => {
		setOpen(true)
	}

	// TODO: Accept an array of refs to the hook
	useOutsideAlerter([panelRef, inputRef], () => {
		setOpen(false)
	})

	// Search state
	const [searchValue, setSearchValue] = useState('')
	const debounedSearchValue = useDebounce(searchValue, 500)

	const [mediaResults, setMediaResults] = useState<any[]>([])
	const [peopleResults, setPeopleResults] = useState<any[]>([])

	const [recentSearches, setRecentSearches] = useState<string[]>([])

	const searchMedia = async () => {
		if (!debounedSearchValue) return

		setLoading(true)

		const { data }: { data: Media.Search.Results } = await axios.get(`/search/multi`, { params: { query: debounedSearchValue } })

		const media = data.results.filter(result => result.media_type === 'movie' || result.media_type === 'tv')
		const people = data.results.filter(result => result.media_type === 'person')

		setMediaResults(media)
		setPeopleResults(people)

		setLoading(false)

		if (!recentSearches.includes(debounedSearchValue)) {
			setRecentSearches(prev => [debounedSearchValue, ...prev])
		}
	}

	useEffect(() => {
		const local: string[] = JSON.parse(localStorage.getItem('recentSearches')!) || []
		setRecentSearches(local)
	}, [])

	useEffect(() => {
		localStorage.setItem('recentSearches', JSON.stringify(recentSearches.slice(0, RECENT_SEARCHES_LENGTH)))
	}, [recentSearches])

	useEffect(() => {
		if (!debounedSearchValue.length) {
			setMediaResults([])
			setPeopleResults([])
			return
		}
		searchMedia()
	}, [debounedSearchValue])

	return (
		<Popover className="relative flex-1 w-full">
			<div className="relative z-40 flex items-center w-full">
				<SearchIcon className="absolute w-5 h-5 text-accent left-2" />
				<input
					className="bg-gray-100 py-2 rounded [padding-inline-start:40px] [padding-inline-end:10px] text-accent text-sm w-full focus:outline-none"
					type="search"
					name="search"
					id="search"
					ref={inputRef}
					value={searchValue}
					onFocus={openMenu}
					onChange={e => {
						setSearchValue(e.target.value)
					}}
				/>
			</div>

			<div className={`${open ? 'opacity-30 fixed inset-0 z-30' : 'opacity-0'} bg-black`} />

			<Transition
				as={Fragment}
				show={open}
				enter="transition ease-out duration-200"
				enterFrom="opacity-0 translate-y-1"
				enterTo="opacity-100 translate-y-0"
				leave="transition ease-in duration-150"
				leaveFrom="opacity-100 translate-y-0"
				leaveTo="opacity-0 translate-y-1"
			>
				<Popover.Panel className="absolute left-0 z-[999] w-full px-4 mt-3 transform sm:px-0">
					<div className="relative w-full z-[999] overflow-hidden bg-white rounded shadow-lg ring-1 ring-black ring-opacity-5" ref={panelRef}>
						<div className={`flex flex-col p-7 min-h-[226px] min-h-[${panelRef?.current?.clientHeight}px]`}>
							{loading && (
								<div className="flex items-center justify-center flex-1 w-full h-full">
									<Loader />
								</div>
							)}

							{(!!mediaResults.length || !!peopleResults.length) && !loading && (
								<div className="grid flex-1 grid-cols-2 gap-4">
									<div>
										<div className="pb-2 mb-2 uppercase border-b text-accent font-heading">Movies & TV Shows</div>
										<ul className="flex flex-col gap-2">
											{mediaResults.slice(0, 4).map(result => (
												<li
													key={result.id}
													onClick={() => {
														setOpen(false)
													}}
												>
													<MediaSearchCard result={result} />
												</li>
											))}
										</ul>
									</div>
									<div>
										<div className="pb-2 mb-2 uppercase border-b text-accent font-heading">People</div>
										<ul className="flex flex-col gap-2">
											{peopleResults.slice(0, 4).map(result => (
												<li
													key={result.id}
													onClick={() => {
														setOpen(false)
													}}
												>
													<MediaSearchCard result={result} />
												</li>
											))}
										</ul>
									</div>
								</div>
							)}

							{!mediaResults.length && !peopleResults.length && !!debounedSearchValue.length && !loading && (
								<p className="flex-1">No search results</p>
							)}

							{!mediaResults.length && !peopleResults.length && !!recentSearches.length && (
								<>
									<div className="flex items-center justify-between mb-5">
										<div className="text-accent font-heading">Recent searches</div>
										<button
											className="text-sm font-medium text-accent"
											onClick={() => {
												setRecentSearches([])
											}}
										>
											Clear all
										</button>
									</div>
									<div className="relative flex flex-wrap gap-2 text-sm">
										{recentSearches.slice(0, RECENT_SEARCHES_LENGTH).map(item => (
											<button
												key={item}
												className="flex items-center gap-1 px-2 py-1 border rounded hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
												onClick={() => {
													setSearchValue(item)
												}}
											>
												<SearchIcon className="w-4 h-4 text-gray-400" />
												{item}
											</button>
										))}
									</div>
								</>
							)}
						</div>

						{(!!mediaResults.length || !!peopleResults.length) && (
							<div className="p-5 text-sm text-center border-t">
								<Link href={`/search?q=${debounedSearchValue}`}>
									<a className="inline-flex items-center justify-center gap-2">
										See all results for {debounedSearchValue} <ArrowSmRightIcon className="w-4 h-4" />
									</a>
								</Link>
							</div>
						)}
					</div>
				</Popover.Panel>
			</Transition>
		</Popover>
	)
}
