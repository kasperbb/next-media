import { IconType } from 'react-icons'
import { Image } from '@components/Image'
import { WatchProviders } from '@interfaces/watchProviders'

interface DetailsHeaderProps {
  title: string
  date: string
  overview: string | null
  backdrop_path: string | null
  poster_path: string | null
  information: {
    icon: IconType
    value: string
  }[]
  providers?: WatchProviders.Types
}

export function DetailsHeader({ title, date, overview, backdrop_path, poster_path, information, providers }: DetailsHeaderProps) {
  return (
    <>
      <div className="relative w-full h-[562px] bg-card overflow-hidden">
        <Image src={backdrop_path} type="backdrop" size={2} className="object-cover object-top w-full h-full" />
        <div
          className="absolute top-0 right-0 w-full h-full"
          style={{
            backgroundImage:
              'linear-gradient(180deg, transparent 36.5%, #1d1d27), radial-gradient(79.1% 140.62% at 74.18% 38.75%, transparent 0, rgba(29,29,39,.7) 100%)',
          }}
        ></div>
      </div>

      <div className="relative flex max-w-6xl gap-8 mx-auto text-white rounded shadow bg-card p-7 -mt-96">
        <div className="w-64 rounded h-96 bg-card">
          <Image src={poster_path} alt={`Poster for ${title}`} className="object-cover w-64 rounded" />
        </div>

        <div className="">
          <h1 className="mb-4 text-4xl font-bold font-heading">
            {title} <span className="text-xl font-medium text-gray-400">({date?.slice(0, 4)})</span>
          </h1>

          <div className="flex gap-4 mb-4">
            {information.map(({ icon: Icon, value }) => (
              <div key={Icon.toString() + value} className="flex gap-2 text-sm font-medium">
                <Icon className="w-5 h-5 text-primary" />
                {value}
              </div>
            ))}
          </div>

          <p className="mb-8 text-gray-400">{overview}</p>

          {providers && (
            <div className="">
              <h3 className="mb-1 text-lg font-heading">Stream now</h3>
              <ul className="flex flex-wrap gap-4 -ml-1">
                {providers?.flatrate?.map((provider: WatchProviders.Contents) => (
                  <li key={provider.provider_id}>
                    <a
                      href={WatchProviders.Links[provider.provider_name]}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center gap-2 p-2 -ml-1 text-sm rounded-sm hover:bg-white hover:bg-opacity-5"
                    >
                      <Image src={provider.logo_path} type="logo" className="w-6 rounded-xs" />
                      <p className="text-xs">{provider.provider_name}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
