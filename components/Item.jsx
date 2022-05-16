import { Button } from '@nextui-org/react'
import { useContext } from 'react'
import CartContext from '@/data/CartContext'
import { useSnackbar } from 'notistack'

const Item = ({ itemId, title, image, description, price }) => {
	const { enqueueSnackbar } = useSnackbar()
	const { cart, setCart } = useContext(CartContext)

	const handleAdd = ({ itemId, title, image, description, price }) => {
		setCart(cart => [...cart, { itemId, title, image, description, price, quantity: 1 }])
		enqueueSnackbar('Item Added Successfully')
	}

	return (
		<div className='overflow-hidden relative shadow-md duration-500 hover:shadow-xl hover:-translate-y-1 rounded-lg cursor-pointer m-auto mx-0 w-full h-full block text-left'>
			<img
				alt={title}
				src={image}
				className='max-h-40 w-full object-cover'
			/>
			<div className='bg-slate-100 dark:bg-primary-dark w-full p-4 h-40'>
				<p className='text-gray-800 dark:text-white text-lg font-medium mb-1 mt-0'>{title}</p>
				<p className='text-gray-700 dark:text-gray-300 font-light text-base truncate'>{description || 'asd'}</p>
				<div className='absolute bottom-4'>
					<div className='flex flex-wrap justify-starts items-center mt-5 '>
						<Button
							color='default'
							size='xs'
							onClick={() => handleAdd({ itemId, title, image, description, price })}
						>
							Add to Cart ({price}$)
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Item
