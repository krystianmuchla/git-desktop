import progressActivity from './progress-activity.svg'
import { useImperativeHandle, useState } from 'react'

export function Loading({ ref, hidden }) {
	const [visible, setVisible] = useState(hidden != null ? !hidden : true)

	useImperativeHandle(ref, () => ({
		show: () => setVisible(true),
		hide: () => setVisible(false),
	}))

	return (
		<div style={{ display: visible ? 'flex' : 'none', animation: 'spin 2s linear infinite' }}>
			<object data={progressActivity} type='image/svg+xml'>
				<title>Loading</title>
			</object>
		</div>
	)
}
