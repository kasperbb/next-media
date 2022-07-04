import { prefetchMedia, useMedia } from '@hooks/useMedia'

import { GetServerSideProps } from 'next'
import { Image } from '@components/Image'
import Link from 'next/link'
import { Media } from '@interfaces/media.interfaces'
import { Slider } from '@components/Slider'
import { Sonarr } from '@interfaces/sonarr'
import { useSonarr } from '@queries/sonarr.queries'

export const getServerSideProps: GetServerSideProps = async () => {
  return await prefetchMedia({
    queries: ['/tv/popular', '/movie/popular'],
  })
}

export default function Index() {
  const { data: shows } = useMedia<Media.Search.Results<Media.Search.TVShow>>('/tv/popular')
  const { data: movies } = useMedia<Media.Search.Results<Media.Search.Movie>>('/movie/popular')

  const { data } = useSonarr<Sonarr.Series[]>('/series')
  console.log('data', data)

  return (
    <>
      <main className="my-20">
        <Slider title="Popular tv-shows" rememberPositionKey="Popular tv-shows">
          {shows?.results.map(({ id, name, backdrop_path }) => (
            <li key={id} className="first:pl-20 last:pr-20" title={name}>
              <Link href={`/tv/${id}`} passHref>
                <a>
                  <div className="h-40 rounded shadow w-[282px] bg-card">
                    <Image src={backdrop_path} alt={name} className="object-cover w-full h-full rounded" preventDrag />
                  </div>
                  <p className="pt-2 text-xs text-center truncate">{name}</p>
                </a>
              </Link>
            </li>
          ))}
        </Slider>

        <Slider title="Popular movies" rememberPositionKey="Popular movies">
          {movies?.results.map(({ id, title, backdrop_path }) => (
            <li key={id} className="first:pl-20 last:pr-20" title={title}>
              <Link href={`/movie/${id}`} passHref>
                <a>
                  <div className="h-40 rounded shadow w-[282px] bg-card">
                    <Image src={backdrop_path} alt={title} className="object-cover w-full h-full rounded" preventDrag />
                  </div>
                  <p className="pt-2 text-xs text-center truncate">{title}</p>
                </a>
              </Link>
            </li>
          ))}
        </Slider>

        <Slider title="Sonarr" rememberPositionKey="Sonarr">
          {data?.map(({ id, title, images }) => (
            <li key={id} className="first:pl-20 last:pr-20" title={title}>
              <Link href={`/sonarr/${id}`} passHref>
                <a>
                  <div className="h-96 rounded shadow w-[282px] bg-card">
                    <Image
                      src={images.find((image) => image.coverType === 'poster')?.url}
                      alt={title}
                      className="object-cover w-full h-full rounded"
                      preventDrag
                      isSonarr
                    />
                  </div>
                </a>
              </Link>
            </li>
          ))}
        </Slider>
      </main>
    </>
  )
}
