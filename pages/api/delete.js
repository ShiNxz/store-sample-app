import db from '@/utils/db'
import Item from '@/models/Item'

const handler = async (req, res) => {
	await db()

	const { method } = req

	switch (method) {
		case 'POST': {
			if (!req.body) return res.status(200).send({ error: 'missing information' })

			const { itemId, title, image, price, description } = req.body

			const item = (await Item.where('itemId').equals(itemId).limit(1))[0]
			if (!item) return res.status(404).send({ error: 'Item not found!' })
			
			await item.delete()

			return res.status(200).json({ success: true })
		}

		default:
			return res.status(401).end()
	}
}

export default handler
