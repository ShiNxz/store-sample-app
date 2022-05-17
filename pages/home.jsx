import AppContext from '@/data/AppContext'
import { useContext, useState, useEffect } from 'react'
import { Button } from '@nextui-org/react'
import CartContext from '@/data/CartContext'
import Cart from '@/components/Cart'
import Item from '@/components/Item'
import fetcher from '@/utils/fetcher'
import useSWR from 'swr'

const HomePage = () => {
	const { cart, cartItems } = useContext(CartContext)
	const [openCart, setOpenCart] = useState(false)
	const { loader } = useContext(AppContext)
	const { data } = useSWR('/api/items', fetcher)

	useEffect(() => {
		!data ? loader.start() : loader.complete()
	}, [data])

	return (
		<div className='flex justify-center items-center mt-24 container'>
			<div className='rounded-3xl'>
				<div className='mb-4'>
					<Button onClick={() => setOpenCart((cart) => !cart)}>Cart ({cartItems.length})</Button>
					<Cart
						open={openCart}
						setOpen={setOpenCart}
						items={cart}
					/>
				</div>
				<div className='bg-white p-8 rounded-3xl'>
					<div className='grid grid-cols-3 gap-5'>
						{data ? data.items.map(({ itemId, title, image, description, price }) => (
							<Item
								key={itemId}
								itemId={itemId}
								title={title}
								description={description}
								price={price}
								image={image}
							/>
						)) : (<>Loading Please Wait...</>)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default HomePage
