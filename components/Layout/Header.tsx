import { FC, Fragment } from 'react'
import { LogoutIcon, UserIcon } from '@heroicons/react/solid'
import { Menu, Transition } from '@headlessui/react'

import Link from 'next/link'
import { SearchBar } from '@components/SearchBar'
import { useAuth } from '@context/AuthContext'

const navigation = [
	{ name: 'Home', href: '/' },
	{ name: 'New', href: '/' },
	{ name: 'Popular', href: '/' },
	{ name: 'Watchlist', href: '/watchlist' },
	{ name: 'Calendar', href: '/calendar' },
]

export const Header = () => {
	const { user, logout } = useAuth()

	return (
		<div className="mx-auto max-w-screen-xxl">
			<nav className="fixed z-30 flex items-center w-full gap-5 px-10 py-2 bg-white text-accent">
				<Link href="/">
					<a>
						<img src="/logo.svg" alt="" className="w-8" />
					</a>
				</Link>
				<ul className="flex gap-4 text-xs font-bold uppercase font-heading">
					{navigation.map(({ name, href }) => (
						<li key={name}>
							<Link href={href}>{name}</Link>
						</li>
					))}
				</ul>
				<SearchBar />
				{user ? (
					<AccountDropdown avatar_url={user.avatar_url!} logout={logout} />
				) : (
					<Link href="/sign-in">
						<a className="px-3 py-2 text-sm bg-gray-100 rounded text-accent">Sign In</a>
					</Link>
				)}
			</nav>
		</div>
	)
}

interface AccountDropdownProps {
	avatar_url: string
	logout: () => Promise<void>
}

export const AccountDropdown: FC<AccountDropdownProps> = ({ avatar_url, logout }) => {
	return (
		<Menu as="div" className="relative">
			<div className="flex items-center justify-center">
				<Menu.Button className="inline-flex items-center justify-center w-[30px] h-[30px] overflow-hidden rounded-full focus:outline-none focus:ring-2 focus:ring-primary">
					<img src={avatar_url || '/placeholder.png'} className="object-cover w-full h-full" alt="" />
				</Menu.Button>
			</div>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="px-1 py-1 ">
						<Menu.Item>
							{({ active }) => (
								<Link href="/account">
									<a
										className={`${
											active ? 'bg-gray-50' : ''
										} flex rounded items-center w-full px-2 py-2 text-sm text-accent hover:bg-gray-50`}
									>
										<UserIcon className="w-5 h-5 mr-2" aria-hidden="true" />
										My account
									</a>
								</Link>
							)}
						</Menu.Item>
					</div>
					<div className="px-1 py-1">
						<Menu.Item>
							{({ active }) => (
								<button
									className={`${active ? 'bg-gray-50' : ''} flex rounded items-center w-full px-2 py-2 text-sm text-accent`}
									onClick={logout}
								>
									<LogoutIcon className="w-5 h-5 mr-2 text-red-500" aria-hidden="true" />
									Sign out
								</button>
							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	)
}
