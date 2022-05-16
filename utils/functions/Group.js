const GroupBy = (xs, key) => {
	var helper = {}
	console.log(helper)
	return xs.reduce(function (r, o) {
		if (!helper[o[key]]) {
			helper[o[key]] = Object.assign({}, o)
			r.push(helper[o[key]])
		} else {
			helper[o[key]].quantity += o.quantity
		}

		return r
	}, [])
}

export default GroupBy
