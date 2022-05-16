import db from '@/utils/db'
import Item from '@/models/Item'

const handler = async (req, res) => {
	await db()

	const { method } = req

	switch (method) {
		case 'GET': {
			const items = await Item.find()

			return res.status(200).json({ success: true, items })
		}

		default:
			return res.status(401).end()
	}
}

export default handler
