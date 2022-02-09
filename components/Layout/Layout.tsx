import { FC } from 'react'
import { Header } from './Header'

export const Layout: FC = ({ children }) => {
	return (
		<>
			<div className="">
				<Header />
				<div className="pt-[52px]">{children}</div>
			</div>
		</>
	)
}
