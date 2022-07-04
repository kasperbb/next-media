import { IoCalendarClear, IoLanguage, IoPricetag } from 'react-icons/io5'

import { DetailsHeader } from './DetailsHeader'
import Head from 'next/head'
import { Media } from '@interfaces/media.interfaces'

interface MovieDetailsProps extends Media.Details.Movie {}

export function MovieDetails({
  title,
  release_date,
  poster_path,
  backdrop_path,
  overview,
  status,
  original_language,
  genres,
  'watch/providers': watchproviders,
}: MovieDetailsProps) {
  const providers = watchproviders?.results['NO']

  return (
    <>
      <Head>
        <title>{title} – Next Media</title>
      </Head>

      <DetailsHeader
        title={title}
        overview={overview}
        date={release_date}
        backdrop_path={backdrop_path}
        poster_path={poster_path}
        providers={providers}
        information={[
          { icon: IoCalendarClear, value: release_date || status },
          { icon: IoLanguage, value: original_language },
          { icon: IoPricetag, value: genres.map((genre) => genre.name).join(', ') },
        ]}
      />
    </>
  )
}
