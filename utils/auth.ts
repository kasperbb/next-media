export const postAuthData = async (data = {}) => {
	const res = await fetch('http://localhost:3000/api/auth', {
		method: 'POST',
		headers: new Headers({ 'Content-Type': 'application/json' }),
		credentials: 'same-origin',
		body: JSON.stringify(data),
	})

	return res.json()
}

export const getAuthData = async (req: any) => {
	const res = await fetch('http://localhost:3000/api/getUser', {
		method: 'GET',
		headers: new Headers({ 'Content-Type': 'application/json', Cookie: req.headers.cookie }),
		credentials: 'same-origin',
	})

	return res.json()
}
