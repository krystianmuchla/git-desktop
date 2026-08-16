import { Loading } from './loading'

export function LoadingView() {
	return (
		<div className='background' style={{ display: 'grid', justifyItems: 'center' }}>
			<Loading />
		</div>
	)
}
