import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../../Pages/Home/Home'
import DetailFilm from '../../Pages/DetailFilm/DetailFilm'

const Main: FC = () => {
	return (
		<main>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/detail-film/:name' element={<DetailFilm />} />
			</Routes>
		</main>
	)
}

export default Main
