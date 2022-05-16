import { Modal, Button, Text } from '@nextui-org/react'
import { useSnackbar } from 'notistack'
import Axios from '@/utils/functions/Axios'

const DeleteItemModal = ({ open, setOpen, mutate }) => {
	const { enqueueSnackbar } = useSnackbar()

	const handleDelete = async () => {
		await Axios('/api/delete', { itemId: open?.itemId }, 'POST')

		await mutate()
		enqueueSnackbar('Item deleted successfully.')
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
						Delete Item "{open?.title}"
					</Text>
				</Modal.Header>
				<Modal.Body>
					Are you sure you want to delete item "{open?.title}"
					<Button
						auto
						flat
						color='error'
						onClick={handleDelete}
					>
						Delete
					</Button>
					<Button
						auto
						onClick={() => setOpen(false)}
					>
						Cancel
					</Button>
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default DeleteItemModal
