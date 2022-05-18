import AppContext from '@/data/AppContext'
import { useContext, useState, useEffect } from 'react'
import fetcher from '@/utils/fetcher'
import useSWR from 'swr'
//
const HomePage = () => {
	const { loader } = useContext(AppContext)
	const { data } = useSWR('/api/stats', fetcher)

	useEffect(() => {
		!data ? loader.start() : loader.complete()
		data && console.log(data?.stats)
	}, [data])

	return (
		<div className='flex justify-center items-center mt-24 container'>
			<div className='rounded-3xl'>
				<div className='bg-white p-8 rounded-3xl'>
					<div className='grid grid-cols-3 gap-5'>
						{data ?
							data.stats.map(({ title, stats }) =>
								title === 'Sales on a daily basis:' ? (
									<div
										key={title}
										className='bg-slate-200 rounded-3xl shadow-lg py-10 px-12 text-center'
									>
										<span className='font-semibold text-lg block'> {title} </span>
										{stats.map(({ date, total }) => (
											<span
												key={date}
												className='font-thin text-xl block'
											>
												{date} - {total}$
											</span>
										))}
									</div>
								) : (
									<div
										key={title}
										className='bg-slate-200 rounded-3xl shadow-lg py-10 px-12 text-center'
									>
										<span className='font-semibold text-lg block'> {title} </span>
										{stats.map(({ item, title, purchases }) => (
											<span
												key={item}
												className='font-thin text-xl block'
											>
												{title} - {purchases}
											</span>
										))}
									</div>
								)
							) : (<>Loading Please Wait...</>)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default HomePage
