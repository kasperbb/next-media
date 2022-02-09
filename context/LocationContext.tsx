import { axios } from '@lib/axios'
import React, { useContext, useState, useEffect, FC } from 'react'

interface LocationContextValues {
	location: string
	setLocation: React.Dispatch<React.SetStateAction<string>>
}

const LocationContext = React.createContext<LocationContextValues | null>(null)

export const useLocation = () => {
	return useContext(LocationContext) as LocationContextValues
}

export const LocationProvider: FC = ({ children }) => {
	const [location, setLocation] = useState('NO')
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(getLocation)
		}

		setLoading(false)
	}, [])

	const getLocation = async (pos: GeolocationPosition) => {
		const { data } = await axios.get(
			`http://api.geonames.org/countryCodeJSON?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}&username=${process.env.NEXT_PUBLIC_GEONAMES_USERNAME}`
		)
		if (data.countryCode) setLocation(data.countryCode)
	}

	const value = {
		location,
		setLocation,
	}

	return <LocationContext.Provider value={value}>{!loading && children}</LocationContext.Provider>
}
