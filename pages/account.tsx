import { useEffect, useState } from 'react'

import { supabase } from '@lib/supabase'
import { useAuth } from '@context/AuthContext'

async function getProfile(userId: string) {
	try {
		const { data, error, status } = await supabase.from('profiles').select(`username, website, avatar_url`).eq('id', userId).single()

		if (error && status !== 406) {
			throw error
		}

		return data
	} catch (error) {
		return error.message
	}
}

export default function Account({}) {
	const { user } = useAuth()
	const [loading, setLoading] = useState(true)
	const [username, setUsername] = useState('')
	const [website, setWebsite] = useState('')
	const [avatar_url, setAvatarUrl] = useState('')

	useEffect(() => {
		getProfile(user.id)
			.then(data => {
				setUsername(data.username)
				setWebsite(data.website)
				setAvatarUrl(data.avatar_url)
				setLoading(false)
			})
			.catch(err => {
				alert(err.message)
				setLoading(false)
			})
	}, [user])

	async function updateProfile({ username, website, avatar_url }: { [param: string]: string }) {
		try {
			setLoading(true)

			const updates = {
				id: user.id,
				username,
				website,
				avatar_url,
				updated_at: new Date(),
			}

			let { error } = await supabase.from('profiles').upsert(updates, {
				returning: 'minimal',
			})

			if (error) {
				throw error
			}
		} catch (error) {
			alert(error.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="flex flex-col w-full max-w-md gap-4 px-4 mx-auto mt-20 sm:px-6 md:px-8">
			<div>
				<label htmlFor="email">Email</label>
				<input className="w-full p-2 text-sm bg-gray-100 rounded text-accent focus:outline-none" id="email" type="text" value={user?.email} disabled />
			</div>
			<div>
				<label htmlFor="username">Username</label>
				<input
					className="w-full p-2 text-sm bg-gray-100 rounded text-accent focus:outline-none"
					id="username"
					type="text"
					value={username || ''}
					onChange={e => setUsername(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="website">Website</label>
				<input
					className="w-full p-2 text-sm bg-gray-100 rounded text-accent focus:outline-none"
					id="website"
					type="website"
					value={website || ''}
					onChange={e => setWebsite(e.target.value)}
				/>
			</div>

			<button className="px-3 py-2 text-white rounded bg-accent" onClick={() => updateProfile({ username, website, avatar_url })} disabled={loading}>
				{loading ? 'Loading ...' : 'Update'}
			</button>

			<button className="px-3 py-2 text-white rounded bg-accent" onClick={() => supabase.auth.signOut()}>
				Sign Out
			</button>
		</div>
	)
}
