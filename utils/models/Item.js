import mongoose from 'mongoose'

Date.prototype.toUnixTime = function () {
	return (this.getTime() / 1000) | 0
}

Date.time = function () {
	return new Date().toUnixTime()
}

const ItemSchema = new mongoose.Schema(
	{
		itemId: String,
		title: {
			type: String,
			unique: true,
			required: true,
		},
		image: String,
		price: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		created_time: {
			type: Number,
			default: Date.time(),
		},
		updatedAt: {
			type: Number,
			default: Date.time(),
		},
	},
	{
		collection: 'Items',
	}
)

ItemSchema.pre('save', function (next) {
	this.updatedAt = Date.time()
	next()
})

export default mongoose.models.Item || mongoose.model('Item', ItemSchema)
