import React, { FC } from 'react'
import { IFilms } from '../../stores/modules'
import { Link } from 'react-router-dom'
import './FilmCard.css'

const FilmCard: FC<IFilms> = ({
	kinopoiskId,
	nameOriginal,
	posterUrlPreview,
	filmId,
}) => {
	return (
		<Link
			className='filmcard'
			to={`/detail-film/${nameOriginal}?film=${
				kinopoiskId ? kinopoiskId : filmId
			}`}
		>
			<img className='img-card' src={posterUrlPreview} alt={nameOriginal} />
			<h2 className='text-card' title={nameOriginal}>
				{nameOriginal?.length > 15
					? nameOriginal.slice(0, 15) + '...'
					: nameOriginal}
			</h2>
		</Link>
	)
}

export default FilmCard
