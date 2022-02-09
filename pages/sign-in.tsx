import { useState } from 'react'
import { useAuth } from '@context/AuthContext'

export default function LoginPage() {
	const { login } = useAuth()
	const [values, setValues] = useState({
		email: '',
		password: '',
	})

	return (
		<div className="w-full max-w-md px-4 mx-auto mt-20 sm:px-6 md:px-8">
			<div className="flex flex-col gap-4">
				<h1 className="text-3xl font-heading text-accent">Sign in</h1>
				<div>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						className="w-full p-2 text-sm bg-gray-100 rounded text-accent focus:outline-none"
						onChange={e => {
							setValues(prev => {
								return { ...prev, email: e.target.value }
							})
						}}
					/>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						id="password"
						className="w-full p-2 text-sm bg-gray-100 rounded text-accent focus:outline-none"
						onChange={e => {
							setValues(prev => {
								return { ...prev, password: e.target.value }
							})
						}}
					/>
				</div>
				<button
					className="px-3 py-2 text-white rounded bg-accent"
					onClick={async () => {
						const res = await login(values.email, values.password)
						console.log(res)
					}}
				>
					Sign in
				</button>
			</div>
		</div>
	)
}
