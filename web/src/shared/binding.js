/**
 * @typedef {Object} GitCommit
 * @property {string} hash
 * @property {string} parentHash
 * @property {string} name
 * @property {string} authorName
 * @property {string} authorDate
 */

/**
 * @typedef {Object} GitBranch
 * @property {string} name
 * @property {string} commitHash
 */

export const Binding = {
	// keep alphabetical order
	/** @type {(path: string) => Promise<GitBranch[]>} */
	getGitBranches: window.getGitBranches,
	/** @type {(path: string, limit: number, offset: number) => Promise<GitCommit[]>} */
	getGitCommits: window.getGitCommits,
	/** @type {() => Promise<string>} */
	getGitVersion: window.getGitVersion,
	/** @type {(link: string) => Promise<void>} */
	openLink: window.openLink,
}
