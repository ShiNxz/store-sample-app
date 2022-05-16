import mongoose from 'mongoose'

Date.prototype.toUnixTime = function() {
    return this.getTime()/1000|0
}

Date.time = function() {
    return new Date().toUnixTime()
}

const PurchaseSchema = new mongoose.Schema({
	purchaseId: String,
    items: [{
		itemId: String,
		quantity: Number
	}],
    created_time: {
        type: Number,
        default: Date.time()
    },
	date: {
		type: Array,
		default: new Date().toISOString().slice(0, 10).split('-')
	}
}, {
    collection: 'Purchases'
})

export default mongoose.models.Purchase || mongoose.model('Purchase', PurchaseSchema)