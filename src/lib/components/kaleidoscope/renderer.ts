import type { ShaderMaterial } from 'three';

// Render loop and animation utilities for kaleidoscope
export function createRenderLoop(
	renderer: import('three').WebGLRenderer,
	scene: import('three').Scene,
	camera: import('three').OrthographicCamera,
	material: ShaderMaterial,
	mode: 'static' | 'loop' | 'mouse' | 'scroll',
	getMotionFactor: () => number,
	mouseHandler?: { updateUniforms: () => void } | null,
	getUniforms?: () => {
		segments: number;
		scaleFactor: number;
		imageAspect: number;
		opacity: number;
	} | null
) {
	let isPlaying = true;
	let lastTime = performance.now() / 1000;
	let animationId: number;

	function updateDataTexture(time: number) {
		time /= 1000;

		if (mode === 'mouse') {
			// Mouse updates are handled by the mouse handler
			mouseHandler?.updateUniforms();
			return;
		} else if (mode === 'loop') {
			const deltaTime = time - lastTime;
			const rotationSpeed = 0.1;
			const motionFactor = getMotionFactor();
			material.uniforms.uRotation.value += rotationSpeed * motionFactor * deltaTime;
			lastTime = time;
		}
	}

	function render(time = 0) {
		if (isPlaying && renderer && scene && camera) {
			try {
				// Update uniforms from props on every frame
				if (getUniforms) {
					const uniforms = getUniforms();
					if (uniforms) {
						material.uniforms.segments.value = uniforms.segments;
						material.uniforms.uScaleFactor.value = uniforms.scaleFactor;
						material.uniforms.uImageAspect.value = uniforms.imageAspect;
						material.uniforms.uOpacity.value = uniforms.opacity;
					}
				}

				if (mode === 'mouse' || mode === 'loop') {
					updateDataTexture(time);
				}

				renderer.render(scene, camera);
				animationId = requestAnimationFrame(render);
			} catch (error) {
				console.error('Render error:', error);
			}
		}
	}

	// Start the render loop
	render();

	return {
		start: () => {
			isPlaying = true;
			render();
		},
		stop: () => {
			isPlaying = false;
			if (animationId) {
				cancelAnimationFrame(animationId);
			}
		},
		cleanup: () => {
			isPlaying = false;
			if (animationId) {
				cancelAnimationFrame(animationId);
			}
		}
	};
}
