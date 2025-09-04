import type { ShaderMaterial } from 'three';

// Event handling utilities for kaleidoscope interactions
export function createMouseHandler(
	containerElement: HTMLElement,
	material: ShaderMaterial,
	getMotionFactor: () => number
) {
	const mouse = { x: 0, y: 0 };

	function handleMouseMove(event: MouseEvent) {
		updateMousePosition(event.clientX, event.clientY);
	}

	function handleTouchMove(event: TouchEvent) {
		if (event.touches.length > 0) {
			updateMousePosition(event.touches[0].clientX, event.touches[0].clientY);
		}
	}

	function updateMousePosition(clientX: number, clientY: number) {
		const rect = containerElement.getBoundingClientRect();
		mouse.x = (clientX - rect.left) / containerElement.offsetWidth;
		mouse.y = (clientY - rect.top) / containerElement.offsetHeight;
	}

	function updateUniforms() {
		const motionFactor = getMotionFactor();
		const offsetX = 2 * (mouse.x - 0.5) * motionFactor;
		const offsetY = 2 * (mouse.y - 0.5) * motionFactor;
		material.uniforms.uOffset.value.set(offsetX, offsetY);

		const rotation = Math.PI * (mouse.y - 0.5) * 2 * motionFactor;
		material.uniforms.uRotation.value = rotation;
	}

	// Add event listeners
	containerElement.addEventListener('mousemove', handleMouseMove);
	containerElement.addEventListener('touchmove', handleTouchMove);

	// Return cleanup function
	return {
		updateUniforms,
		cleanup: () => {
			containerElement.removeEventListener('mousemove', handleMouseMove);
			containerElement.removeEventListener('touchmove', handleTouchMove);
		}
	};
}

export function createScrollHandler(
	containerElement: HTMLElement,
	material: ShaderMaterial,
	getMotionFactor: () => number
) {
	function handleScroll() {
		const rect = containerElement.getBoundingClientRect();
		const top = rect.top;
		const bottom = rect.bottom;

		if (top < window.innerHeight && bottom >= 0) {
			const totalHeight = window.innerHeight + containerElement.offsetHeight;
			const scrollProgress = (window.innerHeight - top) / totalHeight;
			const maxRotation = 2 * Math.PI;
			const motionFactor = getMotionFactor();
			material.uniforms.uRotation.value = scrollProgress * maxRotation * motionFactor;
		}
	}

	window.addEventListener('scroll', handleScroll);

	return {
		cleanup: () => {
			window.removeEventListener('scroll', handleScroll);
		}
	};
}

export function createResizeHandler(
	containerElement: HTMLElement,
	renderer: import('three').WebGLRenderer,
	camera: import('three').OrthographicCamera,
	material: ShaderMaterial
) {
	function handleResize() {
		const width = containerElement.offsetWidth;
		const height = containerElement.offsetHeight;

		renderer.setSize(width, height);
		camera.updateProjectionMatrix();

		let aspectX, aspectY;
		if (height / width > 1) {
			aspectX = (width / height) * 1;
			aspectY = 1;
		} else {
			aspectX = 1;
			aspectY = height / width / 1;
		}

		material.uniforms.resolution.value.x = width;
		material.uniforms.resolution.value.y = height;
		material.uniforms.resolution.value.z = aspectX;
		material.uniforms.resolution.value.w = aspectY;
	}

	window.addEventListener('resize', handleResize);
	handleResize(); // Initial call

	return {
		cleanup: () => {
			window.removeEventListener('resize', handleResize);
		}
	};
}
