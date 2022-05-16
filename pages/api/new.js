import db from '@/utils/db'
import Item from '@/models/Item'
import { v4 } from 'uuid'

const handler = async (req, res) => {
	await db()

	const { method } = req

	switch (method) {
		case 'POST': {
			if (!req.body) return res.status(200).send({ error: 'missing information' })

			const { title, image, price, description } = req.body

			const createdItem = await Item.create({
				itemId: v4(),
				title,
				image,
				price,
				description,
			})

			return res.status(200).json({ success: true, createdItem })
		}

		default:
			return res.status(401).end()
	}
}

export default handler
