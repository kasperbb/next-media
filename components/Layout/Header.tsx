import { IoAlbums } from 'react-icons/io5'
import Link from 'next/link'
import { SearchBar } from '@components/SearchBar'
import { navigation } from '@constants/navigation'

export function Header() {
  return (
    <>
      <div className="fixed z-30 flex items-center w-full gap-5 px-16 py-2 text-white bg-bg">
        <Link href="/">
          <a>
            <IoAlbums className="scale-125 w-14 text-primary-400" />
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
      </div>
    </>
  )
}
