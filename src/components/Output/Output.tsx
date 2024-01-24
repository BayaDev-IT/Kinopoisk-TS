import React, { FC } from 'react'
import { useAppSelector } from '../../stores/hook'
import FilmCard from '../FilmCard/FilmCard'
import './Output.css'

const Output: FC = () => {
	const { error, list, loading } = useAppSelector(state => state.kinopoisk)
	return (
		<div className='output'>
			<div className='content'>
				{loading ? (
					<h1>Loading...</h1>
				) : error ? (
					<span className='error'>{error}</span>
				) : (
					list?.length > 0 &&
					list.map(el => <FilmCard key={el.kinopoiskId || el.filmId} {...el} />)
				)}
			</div>
		</div>
	)
}

export default Output
