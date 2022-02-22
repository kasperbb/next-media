import { WatchProviders } from './watchProviders'

export namespace Media {
	export namespace Search {
		export interface Results {
			page: number
			results: (Movie | TVShow | Person)[]
			total_results: number
			total_pages: number
		}

		export interface Movie {
			poster_path: string | null
			adult: boolean
			overview: string
			release_date: string
			original_title: string
			genre_ids: number[]
			id: number
			media_type?: 'movie'
			original_language: string
			title: string
			backdrop_path: string | null
			popularity: number
			vote_count: number
			video: boolean
			vote_average: number
		}

		export interface TVShow {
			poster_path: string | null
			popularity: number
			id: number
			overview: string
			backdrop_path: string | null
			vote_average: number
			media_type?: 'tv'
			first_air_date: string
			origin_country: string[]
			genre_ids: number[]
			original_language: string
			vote_count: number
			name: string
			original_name: string
		}

		export interface Person {
			profile_path: string | null
			adult: boolean
			id: number
			media_type?: 'person'
			known_for: (Movie | TVShow)[]
			known_for_department: (Movie | TVShow)[]
			name: string
			popularity: number
		}
	}

	export namespace Details {
		export interface Movie {
			adult: boolean
			backdrop_path: string | null
			belongs_to_collection: null
			budget: number
			genres: {
				id: number
				name: string
			}[]
			homepage: string | null
			id: number
			imdb_id: string | null
			original_language: string
			original_title: string
			overview: string | null
			popularity: number
			poster_path: string | null
			production_companies: {
				name: string
				id: number
				logo_path: string | null
				origin_country: string
			}[]
			production_countries: {
				iso_3166_1: string
				name: string
			}[]
			release_date: string
			revenue: number
			runtime: number | null
			spoken_languages: {
				iso_639_1: string
				name: string
			}[]
			status: 'Rumored' | 'Planned' | 'In Production' | 'Post Production' | 'Released' | 'Canceled'
			tagline: string | null
			title: string
			video: boolean
			vote_average: number
			vote_count: number
		}

		export interface TVShow {
			backdrop_path: string | null
			created_by: {
				id: number
				credit_id: string
				name: string
				gender: number
				profile_path: string | null
			}[]
			episode_run_time: number[]
			first_air_date: string
			genres: {
				id: number
				name: string
			}[]
			homepage: string
			id: number
			in_production: boolean
			languages: string[]
			last_air_date: string
			last_episode_to_air: {
				air_date: string
				episode_number: number
				id: number
				name: string
				overview: string
				production_code: string
				season_number: number
				still_path: string | null
				vote_average: number
				vote_count: number
			}
			name: string
			next_episode_to_air: {
				air_date: string
				episode_number: number
				id: number
				name: string
				overview: string
				production_code: string
				season_number: number
				still_path: string | null
				vote_average: number
				vote_count: number
			}
			networks: {
				name: string
				id: number
				logo_path: string | null
				origin_country: string
			}[]
			number_of_episodes: number
			number_of_seasons: number
			origin_country: string[]
			original_language: string
			original_name: string
			overview: string
			popularity: number
			poster_path: string | null
			production_companies: {
				name: string
				id: number
				logo_path: string | null
				origin_country: string
			}[]
			production_countries: {
				iso_3166_1: string
				name: string
			}[]
			seasons: {
				air_date: string
				episode_count: number
				id: number
				name: string
				overview: string
				poster_path: string
				season_number: number
			}[]
			spoken_languages: {
				english_name: string
				iso_3166_1: string
				name: string
			}[]
			status: string
			tagline: string
			type: string
			vote_average: number
			vote_count: number
			imdb_id: string
			'watch/providers': {
				results: WatchProviders.List
			}
		}

		export interface Person {
			birthday: string | null
			known_for_department: string
			deathday: string | null
			id: number
			name: string
			also_known_as: string[]
			gender: 0 | 1 | 2 | 3
			biography: string
			popularity: number
			place_of_birth: string | null
			profile_path: string | null
			adult: boolean
			imdb_id: string
			homepage: string | null
		}

		export type All = Movie | TVShow | Person
	}

	export enum Types {
		TV = 'tv',
		MOVIE = 'movie',
		PERSON = 'person',
	}
}
