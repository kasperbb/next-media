import { User } from '@supabase/supabase-js'

export namespace User {
	export interface UserObject extends User {
		avatar_url?: string
	}

	export interface Identity {
		created_at: string
		id: string
		identity_data: {
			sub: string
		}
		last_sign_in_at: string
		provider: string
		updated_at: string
		user_id: string
	}
}
