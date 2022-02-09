import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { countryList } from '@utils/countries'
import { useLocation } from '@context/LocationContext'

const classNames = (...classes: string[]) => {
	return classes.filter(Boolean).join(' ')
}

const CountrySelect = () => {
	const { location, setLocation } = useLocation()

	return (
		<Listbox
			value={location}
			onChange={code => {
				setLocation(code)
			}}
		>
			{({ open }) => (
				<>
					<div className="relative">
						<Listbox.Button className="relative w-full py-1 pl-1 pr-8 text-left bg-white border border-gray-100 rounded focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm">
							<span className="flex items-center">
								<img src={`https://flagcdn.com/w80/${location.toLowerCase()}.jpg`} alt="" className="flex-shrink-0 rounded max-h-6" />
								<span className="block ml-3 truncate">{location}</span>
							</span>
							<span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
								<SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
							</span>
						</Listbox.Button>

						<Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
							<Listbox.Options
								static
								className="absolute z-10 w-full min-w-[300px] right-0 py-1 mt-3 overflow-auto text-base bg-white rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
							>
								{countryList.map(country => (
									<Listbox.Option
										key={country.code}
										className={({ active }) =>
											classNames(active ? 'bg-accent text-white' : 'text-accent', 'cursor-default select-none relative py-2 pl-3 pr-9')
										}
										value={country.code}
									>
										{({ selected, active }) => (
											<>
												<div className="flex items-center">
													<img
														src={`https://flagcdn.com/w80/${country.code.toLowerCase()}.jpg`}
														alt=""
														className="flex-shrink-0 w-8 h-5 rounded"
													/>
													<span className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
														{country.name}
													</span>
												</div>

												{selected ? (
													<span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary">
														<CheckIcon className="w-5 h-5" aria-hidden="true" />
													</span>
												) : null}
											</>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				</>
			)}
		</Listbox>
	)
}

export default CountrySelect
