export function createTypeformTracker({
	onSubmit = () => {},
	onStart = () => {},
	onStepChange = () => {}
}: {
	onSubmit?: (responseId?: string) => void;
	onStart?: () => void;
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
						if (changeCount === 0) {
							onStart();
						} else {
							onStepChange(changeCount);
						}
						changeCount++;
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
