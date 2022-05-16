/*
This page will display all the products that were added on the previous page. The items will be
displayed as a grid with all relevant details. Clicking the “Buy” button will add the product to the
user’s cart. The cart will display the number of contained products (When greater than 0)
Clicking on the shopping cart button will open a drop down that will display all current products
in it with prices and the total price. At the bottom of the drop down will be a “Pay” button that will
clear all the elements from the shopping cart and send the transaction to the server.
*/

/*
1. /admin (Working time estimate 1.5h) Required
This page will display all available products, one item in a row.
Each item consists of the following:
• Title (name of product)
• Price (USD)
• Description (Up to X characters)
• Image - when editing/adding use an input field to paste urls from google (as opposed to
a file uploader)
Clicking the edit button will open a modal box to edit all product data.
Clicking the add button will open a modal box that will allow the user to add a new product that
will show in the list.
*/
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
						{data?.items.map(({ itemId, title, image, description, price }) => (
							<Item
								key={itemId}
								itemId={itemId}
								title={title}
								description={description}
								price={price}
								image={image}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default HomePage
