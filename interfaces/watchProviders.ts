import { Map } from './map'

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
	}

	export interface List {
		AE?: Contents
		AR?: Contents
		AT?: Contents
		AU?: Contents
		BE?: Contents
		BG?: Contents
		BR?: Contents
		CA?: Contents
		CH?: Contents
		CZ?: Contents
		DE?: Contents
		DK?: Contents
		EE?: Contents
		ES?: Contents
		FI?: Contents
		FR?: Contents
		GB?: Contents
		HK?: Contents
		HR?: Contents
		HU?: Contents
		ID?: Contents
		IE?: Contents
		IN?: Contents
		IT?: Contents
		JP?: Contents
		KR?: Contents
		LT?: Contents
		MX?: Contents
		NL?: Contents
		NO?: Contents
		NZ?: Contents
		PH?: Contents
		PL?: Contents
		PT?: Contents
		RU?: Contents
		SE?: Contents
		SK?: Contents
		TR?: Contents
		US?: Contents
		ZA?: Contents
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
		provider_name: string
	}
}
