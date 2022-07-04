import { Locations } from './location'

export namespace WatchProviders {
  export enum Links {
    'Amazon Prime Video' = 'https://www.primevideo.com/',
    'HBO Max' = 'https://play.hbomax.com/',
    'Strim' = 'https://www.strim.no/',
    'SumoTV' = 'https://play.tv2.no/',
    'Viaplay' = 'https://viaplay.com/',
    'HBO' = 'https://www.hbo.com/',
    'Horizon' = 'https://www.horizon.tv/',
    'Paramount Plus' = 'https://www.paramountplus.com/',
    'Stan' = 'https://www.stan.com.au/',
    'Sky Go' = 'https://www.sky.com/',
    'Now TV' = 'https://www.nowtv.com/',
    'Virgin TV Go' = 'https://virgintvgo.virginmedia.com/',
    'Paramount+ Amazon Channel' = 'https://www.amazon.com/',
    'CBS' = 'https://www.cbs.com/',
    'DIRECTV' = 'https://www.directv.com/',
    'Smithsonian Channel' = 'https://www.smithsonianchannel.com/',
    'fuboTV' = 'https://www.fubo.tv/',
    'Disney Plus' = 'https://www.disneyplus.com/',
    'AMC Plus' = 'https://www.amcplus.com/',
    'BritBox' = 'https://www.britbox.com/',
    'AMC+ Roku Premium Channel' = 'https://therokuchannel.roku.com/',
    'Sling TV' = 'https://watch.sling.com/',
    'BBC America' = 'https://www.bbcamerica.com/',
    'Spectrum On Demand' = 'https://ondemand.spectrum.net/',
    'Foxtel Now' = 'https://www.foxtel.com.au/',
    'Canal+' = 'https://boutique.canalplus.com/',
    'Hulu' = 'https://www.hulu.com/',
    'BINGE' = 'https://binge.com.au/',
    'Netflix' = 'https://www.netflix.com',
  }

  export type List = {
    [key in Locations]: Types
  }

  export interface Types {
    flatrate: Contents[]
    buy: Contents[]
    free: Contents[]
    link: string
  }

  export interface Contents {
    display_priority: number
    logo_path: string
    provider_id: number
    provider_name: keyof typeof Links
  }
}
