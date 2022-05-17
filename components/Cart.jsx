import { Button } from '@nextui-org/react'
import { useContext } from 'react'
import CartContext from '@/data/CartContext'
import { useSnackbar } from 'notistack'
import Axios from '@/utils/functions/Axios'

const Cart = ({ open, setOpen }) => {
	const { cartItems, setCart } = useContext(CartContext)
	const { enqueueSnackbar } = useSnackbar()

	const total = 0

	const handleBuy = async () => {
		await Axios('/api/buy', { items: cartItems }, 'POST')
		setOpen(false)
		enqueueSnackbar('Purchase made.')
		setCart([])
	}

	const handleDelete = itemId => setCart(cartItems.filter(item => item.itemId !== itemId))

	return cartItems ? (
		<div className='absolute w-full rounded-b border-t-0 z-10'>
			<div className={`shadow-xl w-64 rounded-lg ${open ? 'relative' : 'hidden'}`}>
				{cartItems.length > 0 ? (
					cartItems.map(({ itemId, title, description, price, image, quantity }) => {
						total += price * quantity
						return (
							<div
								key={itemId}
								className='p-2 flex bg-white hover:bg-gray-100 cursor-pointer border-b border-gray-100'
							>
								<div className='p-2 w-12'>
									<img
										src={image}
										alt={title}
									/>
								</div>
								<div className='flex-auto text-sm w-32'>
									<div className='font-bold'>{title}</div>
									<div className='truncate'>{description}</div>
									<div className='text-gray-400'>Qt: {quantity}</div>
								</div>
								<div className='flex flex-col w-18 font-medium items-end'>
									<div className='w-4 h-4 mb-6 hover:bg-red-200 rounded-full cursor-pointer text-red-700'>
										<DeleteButton onClick={() => handleDelete(itemId)} />
									</div>
									{price}$
								</div>
							</div>
						)
					})
				) : (
					<div className='p-4 flex bg-white cursor-pointer border-b border-gray-100'>
						Add Some Items First...
					</div>
				)}

				<div className='p-4 justify-center flex bg-white'>
					<Button
						color='success'
						size='sm'
						onClick={handleBuy}
						className='z-50'
					>
						Buy ({total}$)
					</Button>
				</div>
			</div>
		</div>
	) : (
		<></>
	)
}

const DeleteButton = ({ onClick }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='100%'
			height='100%'
			fill='none'
			viewBox='0 0 24 24'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
			className='feather feather-trash-2 '
			onClick={onClick}
		>
			<polyline points='3 6 5 6 21 6'></polyline>
			<path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>
			<line
				x1='10'
				y1='11'
				x2='10'
				y2='17'
			></line>
			<line
				x1='14'
				y1='11'
				x2='14'
				y2='17'
			></line>
		</svg>
	)
}

export default Cart
