import React, { useContext, useState, useEffect, FC } from 'react'
import { supabase } from '@lib/supabase'
import { ApiError, User } from '@supabase/supabase-js'
import { useRouter } from 'next/router'

interface AuthContextValues {
	user: any
	setUser: React.Dispatch<React.SetStateAction<any>>
	login: (email: string, password: string) => Promise<ApiError | User | null>
	register: (email: string, password: string) => Promise<ApiError | User | null>
	logout: () => Promise<void>
}

const AuthContext = React.createContext<AuthContextValues | null>(null)

export const useAuth = () => {
	return useContext(AuthContext) as AuthContextValues
}

export const AuthProvider: FC = ({ children }) => {
	const [user, setUser] = useState<any>(null)
	const [loading, setLoading] = useState(true)
	const router = useRouter()

	useEffect(() => {
		const { data: authListener } = supabase.auth.onAuthStateChange(async () => checkUser())

		checkUser()

		return () => {
			authListener?.unsubscribe()
		}
	}, [])

	const getAvatar = async user => {
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
			return { ...prev, avatar_url: url }
		})
	}

	const checkUser = async () => {
		const user = supabase.auth.user()
		setUser(user)

		if (user) await getAvatar(user)

		setLoading(false)
	}

	const login = async (email: string, password: string) => {
		const { user, error } = await supabase.auth.signIn({
			email,
			password,
		})

		if (error) return error
		checkUser()
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
		checkUser()
		return user
	}

	const value: any = {
		user,
		setUser,
		login,
		register,
		logout,
	}

	return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
