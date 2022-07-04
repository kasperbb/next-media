export namespace Webhook {
  export namespace Sonarr {
    export interface Download {
      message: {
        episodes: {
          id: number
          episodeNumber: number
          seasonNumber: number
          title: string
          qualityVersion: number
        }[]
        eventType: string
        series: {
          id: number
          title: string
          path: string
          tvdbId: number
        }
      }
    }
  }
}
