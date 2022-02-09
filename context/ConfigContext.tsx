import { Config } from '@interfaces/config'
import { createContext, useContext } from 'react'

export const ConfigContext = createContext<Config.Data | null>(null)

export const useConfig = () => {
	return useContext(ConfigContext) as Config.Data
}
