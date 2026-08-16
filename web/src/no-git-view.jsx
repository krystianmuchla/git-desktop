import { Binding } from './shared/binding'

export function NoGitView() {
	return (
		<div
			className='background'
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<div>Please follow the instructions to install Git</div>
			<button type='button' className='all-unset link' onClick={() => Binding.openLink('https://git-scm.com/install')}>
				https://git-scm.com/install
			</button>
		</div>
	)
}
