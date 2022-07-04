import { IoArrowForward, IoSearch } from 'react-icons/io5'
import { useEffect, useState } from 'react'

import { Image } from '@components/Image'
import Link from 'next/link'
import { Sonarr } from '@interfaces/sonarr'
import { Spinner } from './Spinner'
import { useDebounce } from '@hooks/useDebounce'
import { useSonarr } from '@queries/sonarr.queries'

const RECENT_SEARCHES_LENGTH = 20

export function SearchBar() {
  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce(searchValue)

  const [isOpen, setIsOpen] = useState(false)
  const [isHidden, setIsHidden] = useState(true)
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  const { data: results, isLoading } = useSonarr<Sonarr.Series[]>('/series/lookup', {
    enabled: Boolean(debouncedValue),
    params: [`term=${encodeURI(debouncedValue)}`],
    onSuccess: () => {
      if (!recentSearches.includes(debouncedValue)) {
        setRecentSearches((prev) => [debouncedValue, ...prev])
      }
    },
  })

  useEffect(() => {
    const local: string[] = JSON.parse(localStorage.getItem('recentSearches')!) || []
    setRecentSearches(local)
  }, [])

  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches.slice(0, RECENT_SEARCHES_LENGTH)))
  }, [recentSearches])

  function handleOpen() {
    setTimeout(() => setIsOpen(true), 100)
    setIsHidden(false)
  }

  function handleClose() {
    setIsOpen(false)
    setTimeout(() => setIsHidden(true), 300)
  }

  return (
    <div className="relative flex-1 w-full">
      <div className="relative flex items-center w-full">
        <IoSearch className="absolute w-5 h-5 text-white left-2" />
        <input
          className="py-2 z-10 rounded-sm [padding-inline-start:40px] [padding-inline-end:10px] bg-card text-white text-sm w-full focus:outline-none"
          type="search"
          name="search"
          id="search"
          onFocus={handleOpen}
          onBlur={handleClose}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        {!isHidden && (
          <>
            <div
              className="absolute z-10 w-full transition-all duration-300 ease-in-out rounded-sm top-10 bg-card"
              style={{ transform: isOpen ? 'translateY(0%)' : 'translateY(3%)', opacity: isOpen ? '1' : '0' }}
            >
              <ul className="flex flex-col gap-2 p-6 overflow-y-auto min-h-[226px] max-h-[500px]">
                {isLoading && (
                  <div className="flex items-center justify-center flex-1 w-full h-full">
                    <Spinner />
                  </div>
                )}

                {!Boolean(results?.length) && (
                  <>
                    <div className="flex items-center justify-between mb-5">
                      <div className="font-heading">Recent searches</div>
                      <button className="text-sm font-medium" onClick={() => setRecentSearches([])}>
                        Clear all
                      </button>
                    </div>
                    <div className="relative flex flex-wrap gap-2 text-sm">
                      {recentSearches.slice(0, RECENT_SEARCHES_LENGTH).map((search) => (
                        <button
                          key={search}
                          className="flex items-center gap-1 px-2 py-1 border border-gray-600 rounded-sm hover:bg-bg hover:bg-opacity-30 focus:bg-bg focus:bg-opacity-30 focus:outline-none"
                          onClick={() => setSearchValue(search)}
                        >
                          <IoSearch className="w-4 h-4 text-gray-400" />
                          {search}
                        </button>
                      ))}
                    </div>
                  </>
                )}
                {results?.slice(0, 25).map(({ imdbId, tvdbId, title, images, firstAired }) => (
                  <li key={imdbId ? imdbId : tvdbId}>
                    <Link href={imdbId ? `/imdb/${imdbId}` : `/tvdb/${tvdbId}`}>
                      <a className="flex items-center p-1 rounded hover:bg-bg hover:bg-opacity-30">
                        <Image src={images[1]?.url || images[0]?.url} className="object-cover h-16 mr-4 rounded-xs w-11" isAbsolute />
                        <div>
                          <p className="font-medium">{title}</p>
                          <p className="text-sm text-gray-500 capitalize">TV, {firstAired?.slice(0, 4)}</p>
                        </div>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>

              {Boolean(results?.length) && (
                <div className="p-5 text-sm text-center border-t border-bg">
                  <Link href={`/search?q=${debouncedValue}`}>
                    <a className="inline-flex items-center justify-center gap-2">
                      See all results for {debouncedValue} <IoArrowForward className="w-4 h-4" />
                    </a>
                  </Link>
                </div>
              )}
            </div>

            <div
              className="fixed inset-0 w-full h-full transition-all duration-300 ease-in-out pointer-events-none z-"
              style={{ backgroundColor: isOpen ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0)' }}
            ></div>
          </>
        )}
      </div>
    </div>
  )
}
