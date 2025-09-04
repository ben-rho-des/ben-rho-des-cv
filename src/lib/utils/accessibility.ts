// Accessibility utilities
export function prefersReducedMotion(): boolean {
	if (typeof window === 'undefined') return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function getReducedMotionDuration(duration: number): number {
	return prefersReducedMotion() ? 0 : duration;
}

export function announceToScreenReader(message: string): void {
	if (typeof window === 'undefined') return;

	const announcement = document.createElement('div');
	announcement.setAttribute('aria-live', 'polite');
	announcement.setAttribute('aria-atomic', 'true');
	announcement.className = 'sr-only';
	announcement.textContent = message;

	document.body.appendChild(announcement);

	setTimeout(() => {
		document.body.removeChild(announcement);
	}, 1000);
}

export function trapFocus(element: HTMLElement): () => void {
	const focusableElements = element.querySelectorAll(
		'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
	);
	const firstFocusableElement = focusableElements[0] as HTMLElement;
	const lastFocusableElement = focusableElements[focusableElements.length - 1] as HTMLElement;

	function handleTabKey(e: KeyboardEvent): void {
		if (e.key !== 'Tab') return;

		if (e.shiftKey) {
			if (document.activeElement === firstFocusableElement) {
				lastFocusableElement.focus();
				e.preventDefault();
			}
		} else {
			if (document.activeElement === lastFocusableElement) {
				firstFocusableElement.focus();
				e.preventDefault();
			}
		}
	}

	element.addEventListener('keydown', handleTabKey);
	firstFocusableElement?.focus();

	return () => {
		element.removeEventListener('keydown', handleTabKey);
	};
}
