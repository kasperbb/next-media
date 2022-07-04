import 'dayjs/locale/en-gb'

import { IoArrowBack, IoArrowForward } from 'react-icons/io5'
import { useMemo, useState } from 'react'

import { Modal } from '@components/Modal'
import { Sonarr } from '@interfaces/sonarr'
import { Spinner } from '@components/Spinner'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { generateCalendar } from '@utils/date'
import localeData from 'dayjs/plugin/localeData'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useDownloadEpisode } from '@queries/sonarr.mutations'
import { useSonarr } from '@queries/sonarr.queries'
import { useWebhookListener } from '@hooks/useWebhookListener'

dayjs.locale('en-gb')
dayjs.extend(localeData)
dayjs.extend(relativeTime)

function groupDays(episodes: Sonarr.Episode[] | undefined, dates: string[]) {
  const group = dates.reduce<Group>((acc, date) => {
    return { ...acc, [date]: [] }
  }, {})

  for (const episode of episodes || []) {
    const airDate = dayjs(episode.airDateUtc).format('YYYY-MM-DD')
    if (group[airDate]) group[airDate].push(episode)
  }

  return group
}

const today = dayjs().format('YYYY-MM-DD')

function getDateValues(dates: string[]) {
  return { start: dates[0], end: dates[dates.length - 1] }
}

interface Group {
  [airDate: string]: Sonarr.Episode[]
}

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(dayjs())
  const calendar = useMemo(() => generateCalendar({ year: selectedDate.year(), month: selectedDate.month() }).flat(), [selectedDate])
  const { start, end } = getDateValues(calendar)

  useWebhookListener()

  const { data } = useSonarr<Sonarr.Calendar>('/calendar', {
    params: [`start=${start}`, `end=${end}`],
  })

  const { data: queue } = useSonarr<Sonarr.Queue>('/queue')

  const { mutate: download, isLoading: isMutating } = useDownloadEpisode()

  const episodes = useMemo(() => {
    return data?.map((episode) => ({
      ...episode,
      downloading: Boolean(queue?.find((item) => item.episode.id === episode.id)),
    }))
  }, [data, queue])

  const weekdays = dayjs.weekdaysShort(true)
  const groupedEpisodes = useMemo(() => groupDays(episodes, calendar), [episodes, calendar])

  const [isOpen, setIsOpen] = useState(false)
  const [selectedEpisode, setSelectedEpisode] = useState<Sonarr.Episode | undefined>(undefined)

  function handleEventClick(episode: Sonarr.Episode) {
    setIsOpen(true)
    setSelectedEpisode(episode)
  }

  function handleDownload(id: number | undefined) {
    download({ id })
    setIsOpen(false)
  }

  function isBeforeTheFirstDayOfMonth(date: string) {
    return dayjs(date).isBefore(selectedDate.startOf('month'))
  }

  function isAfterTheLastDayOfMonth(date: string) {
    return dayjs(date).isAfter(selectedDate.endOf('month'))
  }

  return (
    <>
      <Modal
        className="p-4 text-white w-[500px] rounded shadow-lg bg-card -mt-60"
        overlayClassName="flex items-center justify-center bg-black bg-opacity-50 fixed inset-0"
        closeTimeoutMS={250}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <h3>{selectedEpisode?.series.title}</h3>
        <h4 className="text-xs text-gray-400">
          {selectedEpisode?.title} - S{selectedEpisode?.seasonNumber} E{selectedEpisode?.episodeNumber}
        </h4>

        <div className="flex gap-2 py-4">
          <span className="px-2 py-1 text-xs bg-blue-500 rounded-full">
            <span>{dayjs(selectedEpisode?.airDate).fromNow()}</span>
          </span>
          {selectedEpisode?.hasFile ? (
            <span className="px-2 py-1 text-xs bg-blue-500 rounded-full">downloaded</span>
          ) : (
            <span className="px-2 py-1 text-xs bg-red-900 rounded-full">missing</span>
          )}
        </div>

        <p className="mb-4 text-sm text-gray-400">{selectedEpisode?.overview}</p>

        <button
          disabled={isMutating}
          onClick={() => handleDownload(selectedEpisode?.id)}
          className="inline-flex items-center px-4 py-2 mr-2 text-sm font-medium text-gray-400 bg-gray-800 border border-gray-600 rounded focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 hover:text-white hover:bg-gray-700"
        >
          {isMutating ? (
            <span>
              <Spinner size=".75rem" />
              Loading...
            </span>
          ) : (
            'Download'
          )}
        </button>
      </Modal>

      <main className="mx-auto my-10 max-w-screen-2xl">
        <div className="flex items-center justify-center w-full gap-8 mb-8">
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
            onClick={() => setSelectedDate((date) => date.subtract(1, 'month'))}
          >
            <IoArrowBack />
          </button>

          <h1 className="text-2xl">{selectedDate.format('MMMM YYYY')}</h1>

          <button
            className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
            onClick={() => setSelectedDate((date) => date.add(1, 'month'))}
          >
            <IoArrowForward />
          </button>
        </div>

        <div className="flex items-center justify-center w-full gap-8 my-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-4 bg-gray-500 rounded-xs"></div>
            <p className="text-sm">Unaired</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-4 bg-green-500 rounded-xs"></div>
            <p className="text-sm">Downloaded</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-4 bg-violet-500 rounded-xs"></div>
            <p className="text-sm">Downloading</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-4 bg-red-500 rounded-xs"></div>
            <p className="text-sm">Missing</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-4 bg-blue-500 rounded-xs"></div>
            <p className="text-sm">Unaired Premiere</p>
          </div>
        </div>

        <div className="border border-gray-700">
          <div className="grid grid-cols-7 border-gray-700">
            {weekdays.map((weekday) => (
              <div key={weekday} className="p-2 text-center border-r border-gray-700 last:border-r-0">
                {weekday}
              </div>
            ))}
          </div>
          <div className="grid h-full grid-cols-7">
            {calendar.map((day) => (
              <div key={day} className="flex flex-col border-r border-gray-700">
                <div
                  className={clsx(
                    'px-4 pt-2 text-sm text-right border-gray-700 border-t',
                    day === today && 'text-primary-400 bg-card bg-opacity-25',
                    (isBeforeTheFirstDayOfMonth(day) || isAfterTheLastDayOfMonth(day)) && 'text-gray-400'
                  )}
                >
                  {dayjs(day).format('DD')}
                </div>

                {Boolean(groupedEpisodes[day]) && (
                  <ul className={clsx('p-4 h-full', day === today && 'bg-card bg-opacity-25')}>
                    {groupedEpisodes[day].map((episode) => (
                      <li
                        key={episode.series.cleanTitle + episode.episodeNumber}
                        title={`${episode.series.title}- S${episode.seasonNumber} E${episode.episodeNumber}`}
                      >
                        <button
                          className={clsx(
                            'focus:ring-2 focus:ring-gray-700 focus:outline-none w-full text-left px-3 py-2 mb-2 text-xs border-l-4 shadow rounded-xs bg-card',
                            getColor(episode)
                          )}
                          onClick={() => handleEventClick(episode)}
                        >
                          <span className="text-gray-300">{dayjs(episode.airDateUtc).format('HH:mm')}</span>
                          <div className="flex gap-1">
                            <span className="truncate">{episode.series.title}</span>
                            <span className="overflow-hidden whitespace-nowrap shrink-0">
                              - S{episode.seasonNumber} E{episode.episodeNumber}
                            </span>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

function getColor(item: Sonarr.Episode) {
  if (item.hasFile) {
    return 'border-green-500'
  }

  if (item.downloading) {
    return 'border-violet-500'
  }

  if (!item.hasFile && dayjs(item.airDate).isBefore(today)) {
    return 'border-red-500'
  }

  if (!item.hasFile && item.episodeNumber === 1) {
    return 'border-blue-500'
  }

  return 'border-gray-500'
}
