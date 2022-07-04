import { IoCalendarClear, IoLanguage, IoPricetag } from 'react-icons/io5'

import { DetailsHeader } from './DetailsHeader'
import Head from 'next/head'
import { Media } from '@interfaces/media.interfaces'

interface TVShowDetailsProps extends Media.Details.TVShow {}

export function TVShowDetails({
  name,
  first_air_date,
  poster_path,
  backdrop_path,
  overview,
  status,
  original_language,
  genres,
  'watch/providers': watchproviders,
}: TVShowDetailsProps) {
  const providers = watchproviders?.results?.['NO']

  if (!name) {
    return <h3 className="my-20 text-3xl font-semibold text-center">Not found.</h3>
  }

  return (
    <>
      <Head>
        <title>{name} – Next Media</title>
      </Head>

      <DetailsHeader
        title={name}
        overview={overview}
        date={first_air_date?.slice(0, 4)}
        backdrop_path={backdrop_path}
        poster_path={poster_path}
        providers={providers}
        information={[
          { icon: IoCalendarClear, value: first_air_date || status },
          { icon: IoLanguage, value: original_language },
          { icon: IoPricetag, value: genres?.map((genre) => genre.name).join(', ') },
        ]}
      />
    </>
  )
}
