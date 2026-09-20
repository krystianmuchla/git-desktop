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
	/** @type {() => Promise<string[]>} */
	getCurrentPath: window.getCurrentPath,
	/** @type {(path: string) => Promise<GitBranch[]>} */
	getGitBranches: window.getGitBranches,
	/** @type {(path: string, limit: number, offset: number) => Promise<GitCommit[]>} */
	getGitCommits: window.getGitCommits,
	/** @type {() => Promise<string>} */
	getGitVersion: window.getGitVersion,
	/** @type {() => Promise<string>} */
	getPathSeparator: window.getPathSeparator,
	/** @type {(path: string[]) => Promise<string[]>} */
	listDir: window.listDir,
	/** @type {(link: string) => Promise<void>} */
	openLink: window.openLink,
	/** @type {(path: string[]) => Promise<string>} */
	serializePath: window.serializePath,
}
