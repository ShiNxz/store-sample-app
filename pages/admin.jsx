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
import fetcher from '@/utils/fetcher'
import { useContext, useEffect, useState } from 'react'
import useSWR from 'swr'
import { Table, Button } from '@nextui-org/react'
import AddItemModal from '@/components/ItemModal'
import DeleteItemModal from '@/components/DeleteItem'

const AdminPage = () => {
	const { loader } = useContext(AppContext)
	const { data, mutate } = useSWR('/api/items', fetcher)
	const [addItem, setAddItem] = useState(false)
	const [deleteItem, setDeleteItem] = useState(false)

	useEffect(() => {
		!data ? loader.start() : loader.complete()
	}, [data])

	return (
		<div className='flex justify-center items-center mt-24 container'>
			<div className='rounded-3xl'>
				<div className='mb-4'>
					<Button onClick={() => setAddItem(true)}>Add Item</Button>
					<AddItemModal
						open={addItem}
						setOpen={setAddItem}
						mutate={mutate}
					/>
					<DeleteItemModal
						open={deleteItem}
						setOpen={setDeleteItem}
						mutate={mutate}
					/>
				</div>
				<Table
					css={{
						height: 'auto',
						minWidth: '100%',
						width: '700px',
					}}
					className='bg-white'
				>
					<Table.Header>
						<Table.Column>Title</Table.Column>
						<Table.Column>Price</Table.Column>
						<Table.Column>Image</Table.Column>
						<Table.Column>Actions</Table.Column>
					</Table.Header>
					<Table.Body>
						{data?.items?.map((i) => {
							return (
								<Table.Row key={i.itemId}>
									<Table.Cell>{i.title}</Table.Cell>
									<Table.Cell>{i.price}</Table.Cell>
									<Table.Cell>
										<img
											src={i.image}
											alt={i.title}
											className='w-12 h-12'
										/>
									</Table.Cell>
									<Table.Cell>
										<Button
											size='xs'
											color='success'
											className='mb-1'
											onClick={() => setAddItem(i)}
										>
											Edit
										</Button>
										<Button
											size='xs'
											color='error'
											onClick={() => setDeleteItem(i)}
										>
											Delete
										</Button>
									</Table.Cell>
								</Table.Row>
							)
						})}
					</Table.Body>
				</Table>
			</div>
		</div>
	)
}

export default AdminPage
