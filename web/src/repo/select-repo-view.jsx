import { useState, useCallback, memo } from 'react'
import { Binding } from '../shared/binding'
import { View } from '../shared/view'

export function SelectRepoView({ setView }) {
	const [path, setPath] = useState(null)
	const [dirList, setDirList] = useState(null)
	const [selectedDir, setSelectedDir] = useState(null)

	const openRepoSelection = useCallback(async () => {
		const newPath = await Binding.getCurrentPath()
		const newDirList = await Binding.listDir(newPath)
		setPath(newPath)
		setDirList(newDirList)
	}, [])

	const moveUp = useCallback(
		async (by = 1) => {
			const newPath = path.slice(0, path.length - by)
			const newDirList = await Binding.listDir(newPath)
			setSelectedDir(null)
			setPath(newPath)
			setDirList(newDirList)
		},
		[path],
	)

	const moveDown = useCallback(
		async (dirName) => {
			const newPath = [...path]
			newPath.push(dirName)
			const newDirList = await Binding.listDir(newPath)
			setSelectedDir(null)
			setPath(newPath)
			setDirList(newDirList)
		},
		[path],
	)

	const selectRepo = useCallback(async () => {
		const selectedPath = [...path, selectedDir]
		setView({ name: View.tree, data: { path: await Binding.serializePath(selectedPath) } })
	}, [path, selectedDir, setView])

	const resolvePath = useCallback((entryName) => `${path.join('/')}/${entryName}`, [path])

	if (path == null || dirList == null) {
		return (
			<div className='background'>
				<button
					type='button'
					className='button'
					style={{ position: 'fixed', bottom: 5, right: 5 }}
					onClick={openRepoSelection}
				>
					Select Repo
				</button>
			</div>
		)
	}

	// todo:
	// select if is git repo
	return (
		<div className='background' style={{ display: 'grid', gridTemplateRows: 'auto auto 1fr' }}>
			<div style={{ display: 'flex', padding: '5px', justifyContent: 'space-between' }}>
				<button type='button' className='button' onClick={() => moveUp()} disabled={path.length < 2}>
					Back
				</button>
				<button type='button' className='button' onClick={() => moveDown(selectedDir)} disabled={selectedDir == null}>
					Open
				</button>
				<button type='button' className='button' onClick={selectRepo} disabled={selectedDir == null}>
					Select
				</button>
			</div>
			<div style={{ display: 'flex', gap: '5px' }}>
				{path.map((dirName, index) => (
					<button
						key={`dir-${dirName}`}
						type='button'
						className='all-unset link'
						onClick={() => moveUp(path.length - index - 1)}
					>
						{dirName}
					</button>
				))}
			</div>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				{dirList.map((dirName) => (
					<Dir
						key={resolvePath(dirName)}
						dirName={dirName}
						selected={selectedDir === dirName}
						onClick={setSelectedDir}
						onDoubleClick={moveDown}
					/>
				))}
			</div>
		</div>
	)
}

const Dir = memo(({ dirName, selected, onClick, onDoubleClick }) => (
	<button
		type='button'
		className='all-unset'
		style={{ cursor: 'pointer', backgroundColor: selected ? 'yellow' : 'transparent' }}
		onClick={() => onClick(dirName)}
		onDoubleClick={() => onDoubleClick(dirName)}
	>
		{dirName}
	</button>
))
