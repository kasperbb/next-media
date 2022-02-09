import axiosClient from 'axios'

export const axios: any = axiosClient.create({
	baseURL: 'https://api.themoviedb.org/3',
	params: { api_key: '870f7fa6589ad507b6a4ca3fbc01d7ff' },
})
