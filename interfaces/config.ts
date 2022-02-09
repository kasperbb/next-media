export namespace Config {
	export interface Data {
		change_keys: string[]
		images: Images
	}

	export interface Images {
		backdrop_sizes: string[]
		logo_sizes: string[]
		poster_sizes: string[]
		profile_sizes: string[]
		still_sizes: string[]
		base_url: string
		secure_base_url: string
	}

	export type ImageTypes = 'backdrop' | 'logo' | 'poster' | 'profile' | 'still'
}
