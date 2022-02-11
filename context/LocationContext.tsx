import React, { FC, useContext, useEffect, useState } from 'react'

import { Locations } from '@interfaces/location'
import { axios } from '@lib/axios'

interface LocationContextValues {
	location: keyof typeof Locations
	setLocation: React.Dispatch<React.SetStateAction<keyof typeof Locations>>
}

const LocationContext = React.createContext<LocationContextValues | null>(null)

export const useLocation = () => {
	return useContext(LocationContext) as LocationContextValues
}

export const LocationProvider: FC = ({ children }) => {
	const [location, setLocation] = useState<keyof typeof Locations>('NO')
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
