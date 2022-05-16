import { Modal, Button, Text, Input, Textarea } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import Axios from '@/utils/functions/Axios'

const ItemModal = ({ open, setOpen, mutate }) => {
	const { enqueueSnackbar } = useSnackbar()

	const [title, setTitle] = useState('')
	const [price, setPrice] = useState(1)
	const [description, setDescription] = useState('')
	const [image, setImage] = useState('')

	useEffect(() => {
		setTitle(open.title || '')
		setPrice(open.price || '')
		setDescription(open.description || '')
		setImage(open.image || '')
	}, [open])

	const handleAddItem = async () => {
		const data = {
			title,
			image,
			price,
			description,
		}

		if (open?.itemId) await Axios('/api/edit', { ...data, itemId: open.itemId }, 'POST')
		else await Axios('/api/new', data, 'POST')
		await mutate()
		enqueueSnackbar(open?.itemId ? 'Item Edited Successfully' : 'Item Added Successfully!')
		setOpen(false)
	}

	return (
		<div>
			<Modal
				closeButton
				open={open}
				onClose={() => setOpen(false)}
			>
				<Modal.Header>
					<Text
						id='modal-title'
						size={18}
					>
						{ open?.itemId ? `Edit Item ${open.title}` : 'Add Item' }
					</Text>
				</Modal.Header>
				<Modal.Body>
					<Input
						clearable
						bordered
						fullWidth
						color='primary'
						size='lg'
						placeholder='Title'
						initialValue={title}
						value={title}
						onChange={(i) => setTitle(i.target.value)}
					/>
					<Input
						clearable
						bordered
						fullWidth
						color='primary'
						size='lg'
						placeholder='Price'
						type='number'
						initialValue={price}
						value={price}
						onChange={(i) => setPrice(i.target.value)}
					/>
					<Textarea
						clearable
						bordered
						fullWidth
						color='primary'
						size='lg'
						placeholder='Description'
						initialValue={description}
						value={description}
						onChange={(i) => setDescription(i.target.value)}
					/>
					<Input
						clearable
						bordered
						fullWidth
						color='primary'
						size='lg'
						placeholder='Image URL'
						initialValue={image}
						value={image}
						onChange={(i) => setImage(i.target.value)}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button
						auto
						flat
						color='error'
						onClick={() => setOpen(false)}
					>
						Close
					</Button>
					<Button
						auto
						onClick={handleAddItem}
					>
						Add
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default ItemModal
