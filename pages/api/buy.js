import db from '@/utils/db'
import Purchase from '@/models/Purchase'
import { v4 } from 'uuid'

const handler = async (req, res) => {
	await db()

	const { method } = req

	switch (method) {
		case 'POST': {
			if (!req.body) return res.status(200).send({ error: 'missing information' })

			const { items } = req.body

			const createdPurchase = await Purchase.create({
				purchaseId: v4(),
				items
			})

			return res.status(200).json({ success: true, createdPurchase })
		}

		default:
			return res.status(401).end()
	}
}

export default handler
