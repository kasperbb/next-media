import { DateString } from './date'

export namespace Sonarr {
  interface Image {
    coverType: 'banner' | 'poster' | 'fanart'
    url: string
  }

  interface Season {
    seasonNumber: number
    monitored: boolean
    statistics: {
      previousAiring: string
      episodeFileCount: number
      episodeCount: number
      totalEpisodeCount: number
      sizeOnDisk: number
      percentOfEpisodes: number
    }
  }

  enum TVContentRating {
    TV_MA = 'TV-MA',
    TV_14 = 'TV-14',
    TV_PG = 'TV-PG',
    TV_G = 'TV-G',
    TV_Y7 = 'TV-Y7',
    TV_Y = 'TV-Y',
  }

  enum Genres {
    Action = 'Action',
    Adventure = 'Adventure',
    Animation = 'Animation',
    Biography = 'Biography',
    Comedy = 'Comedy',
    Crime = 'Crime',
    Documentary = 'Documentary',
    Drama = 'Drama',
    Family = 'Family',
    Fantasy = 'Fantasy',
    History = 'History',
    Horror = 'Horror',
    Music = 'Music',
    Mystery = 'Mystery',
    News = 'News',
    Reality = 'Reality',
    Romance = 'Romance',
    ScienceFiction = 'Science Fiction',
    Sport = 'Sport',
    Thriller = 'Thriller',
    War = 'War',
  }

  interface Ratings {
    votes: number
    value: number
  }

  export interface Series {
    title: string
    alternateTitles: {
      title: string
      seasonNumber: number
    }[]
    sortTitle: string
    seasonCount: number
    totalEpisodeCount: number
    episodeCount: number
    episodeFileCount: number
    sizeOnDisk: number
    status: string
    overview: string
    previousAiring: string
    network: string
    airTime: string
    images: [banner: Image, poster: Image, fanart: Image]
    seasons: Season[]
    year: number
    path: string
    profileId: number
    seasonFolder: boolean
    monitored: boolean
    useSceneNumbering: boolean
    runtime: number
    tvdbId: number
    tvRageId: number
    tvMazeId: number
    firstAired?: string
    lastInfoSync: string
    seriesType: 'standard'
    cleanTitle: string
    imdbId: string
    titleSlug: string
    certification: TVContentRating
    genres: Genres[]
    tags: never[]
    added: string
    ratings: Ratings
    qualityProfileId: number
    id: number
  }

  export interface Episode {
    id: number
    seriesId: number
    episodeFileId: number
    seasonNumber: number
    episodeNumber: number
    title: string
    airDate: DateString
    airDateUtc: string
    overview: string
    episodeFile: {
      seriesId: number
      seasonNumber: number
      relativePath: string
      path: string
      size: number
      dateAdded: DateString
      sceneName: string
      quality: {
        quality: {
          id: number
          name: string
          source: string
          resolution: string
        }
        revision: {
          version: number
          real: number
        }
      }
      mediaInfo: {
        audioChannels: number
        audioCodec: string
        videoCodec: string
      }
      originalFilePath: string
      qualityCutoffNotMet: boolean
      id: number
    }
    hasFile: boolean
    monitored: boolean
    downloading: boolean
    absoluteEpisodeNumber: number
    unverifiedSceneNumbering: boolean
    series: Series
  }

  export interface QueueItem {
    series: {
      title: string
      sortTitle: string
      seasonCount: number
      status: string
      overview: string
      network: string
      airTime: string
      images: Image[]
      seasons: {
        seasonNumber: number
        monitored: boolean
      }[]
      year: number
      path: string
      profileId: number
      seasonFolder: boolean
      monitored: boolean
      useSceneNumbering: boolean
      runtime: number
      tvdbId: number
      tvRageId: number
      tvMazeId: number
      firstAired: string
      lastInfoSync: string
      seriesType: string
      cleanTitle: string
      imdbId: string
      titleSlug: string
      certification: TVContentRating
      genres: string[]
      tags: never[]
      added: string
      ratings: Ratings
      qualityProfileId: number
      id: number
    }
    episode: {
      overview: string
      hasFile: boolean
      monitored: boolean
      absoluteEpisodeNumber: number
      unverifiedSceneNumbering: boolean
      lastSearchTime: string
      id: number
    }
    quality: {
      quality: {
        id: number
        name: string
        source: string
        resolution: 1080 | 720 | 480 | 360 | 240
      }
      revision: {
        version: number
        real: number
      }
    }
    size: number
    title: string
    sizeleft: number
    timeleft: string
    estimatedCompletionTime: string
    status: string
    trackedDownloadStatus: string
    statusMessages: never[]
    downloadId: string
    protocol: string
    id: number
  }

  export type Queue = QueueItem[]

  export type Calendar = Episode[]
}
