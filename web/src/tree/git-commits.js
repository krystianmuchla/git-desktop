export class GitCommits {
	/**
	 * @param {GitCommit[]} commits
	 */
	constructor(commits) {
		/** @type {GitCommit[]} */
		this.commits = []
		/** @type {Map<string, number>} */
		this.commitIndexes = new Map()
		this.addCommits(commits)
	}

	/**
	 * @returns {GitCommits}
	 */
	clone() {
		return new GitCommits(this.commits)
	}

	/**
	 * @returns {GitCommit[]}
	 */
	get asArray() {
		return this.commits
	}

	/**
	 * @param {string} hash
	 * @returns {number}
	 */
	indexOfHash(hash) {
		return this.commitIndexes.get(hash) ?? -1
	}

	/**
	 * @param {GitCommit[]} commits
	 * @returns {void}
	 */
	addCommits(commits) {
		this.commits.push(...commits)
		const indexBase = this.commitIndexes.size
		for (const [commitIndex, commit] of commits.entries()) {
			this.commitIndexes.set(commit.hash, indexBase + commitIndex)
		}
	}
}
