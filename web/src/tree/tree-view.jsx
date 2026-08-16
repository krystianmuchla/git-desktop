import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Binding } from '../shared/binding'
import { LoadingView } from '../shared/loading-view'
import { ErrView } from '../shared/err-view'
import { Pagination } from '../shared/pagination'
import { GitCommits } from './git-commits'
import { Loading } from '../shared/loading'

// todo: remove
const path = ''

export function TreeView() {
	const [error, setError] = useState(null)
	const [commits, setCommits] = useState(null)
	const commitsRef = useRef(null)
	const loadingCommits = useRef(false)
	const moreCommits = useRef(true)
	const [selectedCommits, setSelectedCommits] = useState(new Set())
	const lastSelectedCommit = useRef(null)
	const pagination = useRef(new Pagination(10))

	commitsRef.current = commits

	const loadCommits = useCallback(async () => {
		if (loadingCommits.current) {
			return
		}
		loadingCommits.current = true
		try {
			const commits = await Binding.getGitCommits(path, ...pagination.current.asArray)
			if (commits.length < pagination.current.limit) {
				moreCommits.current = false
			}
			setCommits((prev) => {
				const next = prev != null ? prev.clone() : new GitCommits([])
				next.addCommits(commits)
				return next
			})
		} catch (err) {
			setError(err)
		} finally {
			loadingCommits.current = false
		}
	}, [])

	const loadMoreCommits = useCallback(async () => {
		if (loadingCommits.current || !moreCommits.current) {
			return moreCommits.current
		}
		pagination.current = pagination.current.next()
		await loadCommits()
		return moreCommits.current
	}, [loadCommits])

	const handleCommitClick = useCallback((event, hash) => {
		const shiftKey = event.shiftKey
		const cmdOrCtrlKey = event.metaKey || event.ctrlKey
		setSelectedCommits((prev) => {
			if (shiftKey) {
				const anchor =
					lastSelectedCommit.current != null ? commitsRef.current.indexOfHash(lastSelectedCommit.current) : 0
				const target = commitsRef.current.indexOfHash(hash)
				const next = new Set()
				for (let index = Math.min(anchor, target); index <= Math.max(anchor, target); index++) {
					next.add(commitsRef.current.asArray[index].hash)
				}
				return next
			} else {
				lastSelectedCommit.current = hash
				if (cmdOrCtrlKey) {
					const next = new Set(prev)
					if (prev.has(hash)) {
						next.delete(hash)
					} else {
						next.add(hash)
					}
					return next
				} else {
					return new Set([hash])
				}
			}
		})
	}, [])

	useEffect(() => {
		;(async () => {
			try {
				const _branches = await Binding.getGitBranches(path)
				await loadCommits()
			} catch (err) {
				setError(err)
			}
		})()
	}, [loadCommits])

	if (error != null) {
		return <ErrView />
	}

	if (commits == null) {
		return <LoadingView />
	}

	return (
		<div className='background' style={{ display: 'grid', gridTemplateColumns: '1fr auto auto' }}>
			{commits.asArray.map((commit) => (
				<Commit
					key={commit.hash}
					commit={commit}
					selected={selectedCommits.has(commit.hash)}
					handleClick={handleCommitClick}
				/>
			))}
			<CommitsLoader onIntersect={loadMoreCommits} loading={loadingCommits} />
		</div>
	)
}

const Commit = memo(({ commit, selected, handleClick }) => {
	return (
		<button
			type='button'
			className='all-unset cursor-pointer'
			style={{
				display: 'grid',
				gridColumn: 'span 3',
				gridTemplateColumns: 'subgrid',
				columnGap: '15px',
				padding: '3px 0',
				backgroundColor: selected ? 'yellow' : 'transparent',
			}}
			onClick={(event) => handleClick(event, commit.hash)}
		>
			<div>{commit.name}</div>
			<div>{commit.authorName}</div>
			<div>{formatAuthorDate(commit.authorDate)}</div>
		</button>
	)
})

const CommitsLoader = memo(({ onIntersect, loading }) => {
	const [finished, setFinished] = useState(false)
	const intersection = useRef(null)
	const loader = useRef(null)

	useEffect(() => {
		if (finished) {
			return
		}
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting && !loading.current) {
				loader.current.show()
				onIntersect().then((more) => {
					if (more) {
						loader.current.hide()
					} else {
						setFinished(true)
					}
				})
			}
		})
		observer.observe(intersection.current)
		return () => observer.unobserve(intersection.current)
	}, [onIntersect, loading, finished])

	return (
		<div
			ref={intersection}
			style={{
				display: 'grid',
				gridColumn: 'span 3',
				alignItems: 'center',
				justifyItems: 'center',
				color: 'gray',
				height: '50px',
			}}
		>
			{finished ? <span>No more commits</span> : <Loading ref={loader} hidden={true} />}
		</div>
	)
})

/**
 * @param {string} date
 * @returns {string}
 */
function formatAuthorDate(date) {
	return new Date(date).toLocaleTimeString(undefined, {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	})
}
