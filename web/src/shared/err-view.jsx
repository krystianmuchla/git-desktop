import { Err } from './err'

export function ErrView() {
	return (
		<div className='background' style={{ display: 'grid', alignItems: 'center', justifyItems: 'center' }}>
			<Err />
		</div>
	)
}
