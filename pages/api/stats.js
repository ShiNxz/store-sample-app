import db from '@/utils/db'
import Purchase from '@/models/Purchase'
import Item from '@/models/Item'
//
const handler = async (req, res) => {
	await db()

	const { method } = req

	switch (method) {
		case 'GET': {
			const stats = []
			const purchases = await Purchase.where()

			let itemsPurchases = purchases.map(({ items }) => {
				return items.map(({ itemId, quantity }) => ({ itemId, quantity }))
			})

			// Top 5 sold products
			{
				let stat = []

				await Promise.all(
					itemsPurchases.map(
						async (i) =>
							await Promise.all(
								i.map(async ({ itemId, quantity }) => {
									const item = await Item.where('itemId').equals(itemId).limit(1)
									if(item.length < 1) return
									
									stat.findIndex((o) => o.item === itemId) < 0
										? stat.push({ item: itemId, title: item[0].title, purchases: quantity })
										: (stat[stat.findIndex((o) => o.item === itemId)].purchases += quantity)
								})
							)
					)
				)

				stat = stat.sort(({ purchases: a }, { purchases: b }) => b - a).slice(0, 5)

				stats.push({ title: 'Top 5 Sold Products:', stats: stat })
			}

			// Top 5 Unique sold products
			{
				let stat = []

				await Promise.all(
					itemsPurchases.map(
						async (i) =>
							await Promise.all(
								i.map(async ({ itemId }) => {
									const item = await Item.where('itemId').equals(itemId).limit(1)
									if(item.length < 1) return

									stat.findIndex((o) => o.item === itemId) < 0
										? stat.push({ item: itemId, title: item[0].title, purchases: 1 })
										: (stat[stat.findIndex((o) => o.item === itemId)].purchases += 1)
								})
							)
					)
				)

				stat = stat.sort(({ purchases: a }, { purchases: b }) => b - a).slice(0, 5)

				stats.push({ title: 'Top 5 Unique Products:', stats: stat })
			}

			// Sales on a daily basis for the past 5 days
			{
				let stat = []
				// get the current day:
				const date = new Date().toISOString().slice(0, 10).split('-')
				const currentDay = date[2]
				const days = 5 // days to loop through
				console.log(currentDay)

				const promises = await Promise.all(
					[...Array(days)].map(async (a, b) => {
						const statDate = `${date[0]}-${date[1]}-${currentDay - b}`
						const purchases = await Purchase.where('date').equals(statDate)
						console.log({date: statDate, sells: purchases.length})
						return { date: statDate, sells: purchases }
					})
				)

				await Promise.all(
					promises.map(async ({ date, sells }) => {
						// for each day check and modify sells
						await Promise.all(
							sells.map(async ({ items }) => {
								// for each item inside -> check the item price and add it
								await Promise.all(
									await items.map(async ({ itemId, quantity }) => {
										let item = await Item.where('itemId').equals(itemId) 
										if(item.length < 1) return
										
										item = item[0]

										stat.findIndex((o) => o.date === date) < 0
											? stat.push({ date, sells, total: item.price * quantity })
											: (stat[stat.findIndex((o) => o.date === date)].total +=
													item.price * quantity)
									})
								)
							})
						)
					})
				)

				stat = stat.sort(({ date: a }, { date: b }) => b - a).slice(0, 5)
				stats.push({ title: 'Sales on a daily basis:', stats: stat })
			}

			return res.status(200).json({ success: true, stats })
		}

		default:
			return res.status(401).end()
	}
}

export default handler
