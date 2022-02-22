import React from 'react'
import { FC } from 'react'

interface Props {
	isCurrentDay?: boolean
}

export const Cell: FC<Props> = ({ children, isCurrentDay = false }) => {
	function doesChildrenExist() {
		return React.Children.count(children)
	}

	if (!doesChildrenExist()) {
		return <td className="p-3 font-medium border bg-gray-50"></td>
	}

	if (isCurrentDay) {
		return <td className="p-3 font-medium text-right align-top border min-w-[150px] bg-gray-200">{children}</td>
	}

	return <td className="p-3 font-medium text-right align-top border min-w-[150px]">{children}</td>
}
