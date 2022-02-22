import { ApiError, Session, User as SupabaseUser } from '@supabase/supabase-js'
import React, { FC, useContext, useEffect, useState } from 'react'

import { User } from '@interfaces/user'
import { postAuthData } from '@utils/auth'
import { supabase } from '@lib/supabase'
import { useRouter } from 'next/router'

interface AuthContextValues {
	user: User.UserObject
	setUser: React.Dispatch<React.SetStateAction<User.UserObject>>
	login: (email: string, password: string) => Promise<ApiError | SupabaseUser | null>
	register: (email: string, password: string) => Promise<ApiError | SupabaseUser | null>
	logout: () => Promise<void>
}

const AuthContext = React.createContext<AuthContextValues | null>(null)

export const useAuth = () => {
	return useContext(AuthContext) as AuthContextValues
}

export const AuthProvider: FC = ({ children }) => {
	const [session, setSession] = useState<Session | null>(null)
	const [user, setUser] = useState<User.UserObject | null>(null)
	const [loading, setLoading] = useState(true)
	const router = useRouter()

	useEffect(() => {
		const authSession = supabase.auth.session()
		setSession(authSession)
		setUser(authSession?.user ?? null)

		const { data: authListener } = supabase.auth.onAuthStateChange(async (event, changeAuthSession) => {
			console.log('%c Supbase auth event:', 'color:#ffa500', event)

			await postAuthData({
				event,
				token: changeAuthSession?.access_token ?? null,
				maxAge: changeAuthSession?.expires_in ?? null,
			})

			setSession(changeAuthSession)
			setUser(changeAuthSession?.user ?? null)
			await getAvatar(changeAuthSession?.user)
			setLoading(false)
		})

		return () => {
			authListener?.unsubscribe()
		}
	}, [])

	const getAvatar = async (user: SupabaseUser | null | undefined) => {
		if (!user) return

		const {
			data: { avatar_url },
			error,
			status,
		} = await supabase.from('profiles').select(`avatar_url`).eq('id', user.id).single()

		if (error && status !== 406) {
			throw error
		}

		const { data, error: error2 } = await supabase.storage.from('avatars').download(avatar_url)
		if (error2 || !data) {
			throw error
		}
		const url = URL.createObjectURL(data)
		setUser(prev => {
			return { ...prev, avatar_url: url } as User.UserObject
		})
	}

	const login = async (email: string, password: string) => {
		const { user, error } = await supabase.auth.signIn({
			email,
			password,
		})

		if (error) return error

		router.push('/account')
		return user
	}

	const logout = async () => {
		await supabase.auth.signOut()
		router.push('/')
	}

	const register = async (email: string, password: string) => {
		const { user, error } = await supabase.auth.signUp({
			email,
			password,
		})

		if (error) return error

		return user
	}

	const value: any = {
		session,
		user,
		setUser,
		login,
		register,
		logout,
	}

	return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
