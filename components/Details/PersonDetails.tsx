import { Image } from '@components/Image'
import { Media } from '@interfaces/media'
import { CalendarIcon } from '@heroicons/react/solid'
import Head from 'next/head'
import moment from 'moment'
import { FC } from 'react'

export const PersonDetails: FC<Media.Details.Person> = ({ name, profile_path, biography, known_for_department, birthday, deathday }) => {
	return (
		<>
			<Head>
				<title>{name} – Next Media</title>
			</Head>

			<Image src="" type="backdrop" size={2} className="object-cover object-top w-full max-h-[400px]" />

			<div className="relative flex max-w-6xl gap-8 mx-auto bg-white rounded shadow-lg p-7 -mt-60">
				<Image src={profile_path} className="object-cover w-64 rounded" />

				<div>
					<h1 className="mb-4 text-4xl font-bold text-accent font-heading">
						{name} <span className="text-xl font-medium text-gray-500">({known_for_department})</span>
					</h1>
					<div className="flex gap-4 mb-4">
						<div className="flex gap-2 text-sm font-medium">
							<CalendarIcon className="w-5 h-5 text-primary" />
							{moment(birthday).format('MMM Do YYYY')} - {moment(deathday).format('MMM Do YYYY')}
						</div>
					</div>
					<p className="text-gray-600">{biography}</p>
				</div>
			</div>
		</>
	)
}
