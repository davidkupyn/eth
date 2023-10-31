export function createTypeformTracker({
	onSubmit = () => {},
	onStepChange = () => {}
}: {
	onSubmit?: (responseId?: string) => void;
	onStepChange?: (changeCount?: number) => void;
}) {
	let changeCount = 0;
	return {
		listen() {
			window.addEventListener(
				'message',
				function (e) {
					const { data } = e;
					if (data.type == 'form-submit') {
						onSubmit(data.responseId);
					} else if (data.type == 'form-screen-changed') {
						onStepChange(++changeCount);
					}
				},
				false
			);
		},
		cleanup() {
			window.removeEventListener('message', () => {});
		}
	};
}
