export class Pagination {
	/**
	 * @param {number} limit
	 * @param {number?} offset
	 */
	constructor(limit, offset = 0) {
		this.limit = limit
		this.offset = offset
	}

	/**
	 * @returns {Pagination}
	 */
	next() {
		return new Pagination(this.limit, this.offset + this.limit)
	}

	/**
	 * @returns {[number, number]}
	 */
	get asArray() {
		return [this.limit, this.offset]
	}
}
