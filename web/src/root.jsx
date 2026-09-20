import './shared/style.css'
import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Binding } from './shared/binding'
import { View } from './shared/view'
import { NoGitView } from './no-git-view'
import { TreeView } from './tree/tree-view'
import { LoadingView } from './shared/loading-view.jsx'
import { SelectRepoView } from './repo/select-repo-view'

function Root() {
	const [view, setView] = useState({ name: View.loading })

	useEffect(() => {
		;(async () => {
			try {
				const _gitVersion = await Binding.getGitVersion()
				setView({ name: View.selectRepo, data: { setView } })
			} catch {
				setView({ name: View.noGit })
			}
		})()
	}, [])

	switch (view.name) {
		case View.loading:
			return <LoadingView {...view.data} />
		case View.noGit:
			return <NoGitView {...view.data} />
		case View.selectRepo:
			return <SelectRepoView {...view.data} />
		case View.tree:
			return <TreeView {...view.data} />
		default:
			return <LoadingView {...view.data} />
	}
}

const root = createRoot(document.getElementById('root'))
root.render(<Root />)
