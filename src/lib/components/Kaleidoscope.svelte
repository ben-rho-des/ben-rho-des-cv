<script lang="ts">
	import { browser } from '$app/environment';
	import {
		createOrthographicCamera,
		createWebGLRenderer,
		loadTexture,
		cleanupThreeResources,
		isWebGLSupported
	} from '$lib/utils/three-helpers';
	import { DEFAULTS, KALEIDOSCOPE_MODES } from '$lib/constants';
	import { vertexShader, fragmentShader } from './kaleidoscope/shaders';
	import {
		createMouseHandler,
		createScrollHandler,
		createResizeHandler
	} from './kaleidoscope/events';
	import { createRenderLoop } from './kaleidoscope/renderer';

	const {
		imageSrc = '',
		segments = DEFAULTS.SEGMENTS,
		mode = KALEIDOSCOPE_MODES.STATIC,
		scaleFactor = DEFAULTS.SCALE_FACTOR,
		motionFactor = DEFAULTS.MOTION_FACTOR,
		imageAspect = DEFAULTS.IMAGE_ASPECT
	} = $props<{
		imageSrc?: string;
		segments?: number;
		mode?: 'static' | 'loop' | 'mouse' | 'scroll';
		scaleFactor?: number;
		motionFactor?: number;
		imageAspect?: number;
	}>();

	const opacity = 1;

	let containerElement = $state<HTMLElement>();
	let scene: import('three').Scene;
	let camera: import('three').OrthographicCamera;
	let renderer: import('three').WebGLRenderer;
	let material: import('three').ShaderMaterial;
	let geometry: import('three').PlaneGeometry;
	let plane: import('three').Mesh;
	let webglSupported = $state(true);
	let texture: import('three').Texture;
	let THREE: typeof import('three');

	// Event handlers
	let mouseHandler: ReturnType<typeof createMouseHandler> | null = null;
	let scrollHandler: ReturnType<typeof createScrollHandler> | null = null;
	let resizeHandler: ReturnType<typeof createResizeHandler> | null = null;
	let renderLoop: ReturnType<typeof createRenderLoop> | null = null;

	$effect(() => {
		if (browser) {
			webglSupported = isWebGLSupported();
			if (webglSupported) {
				// Dynamically import Three.js
				import('three').then((THREE_MODULE) => {
					THREE = THREE_MODULE;
					initThreeJS();
					setupEventHandlers();
					startRenderLoop();

					// Update uniforms with current prop values after initialization
					if (material) {
						material.uniforms.segments.value = segments;
						material.uniforms.uScaleFactor.value = scaleFactor;
						material.uniforms.uOpacity.value = opacity;
						material.uniforms.uImageAspect.value = imageAspect;
					}
				});
			}
		}

		return () => {
			if (browser) {
				cleanup();
			}
		};
	});

	function initThreeJS(): void {
		scene = new THREE.Scene();

		camera = createOrthographicCamera();

		if (!containerElement) return;

		renderer = createWebGLRenderer(
			containerElement,
			containerElement.offsetWidth,
			containerElement.offsetHeight
		);

		texture = loadTexture(
			imageSrc,
			(loadedTexture: import('three').Texture) => {
				texture = loadedTexture;
			},
			(error: unknown) => {
				console.error('Error loading texture:', error);
			}
		);

		material = new THREE.ShaderMaterial({
			side: THREE.DoubleSide,
			uniforms: {
				resolution: { value: new THREE.Vector4() },
				uTexture: { value: texture },
				uOpacity: { value: opacity },
				uOffset: { value: new THREE.Vector2(0, 0) },
				uRotation: { value: 0 },
				uRotationAmount: { value: 0.2 },
				uOffsetAmount: { value: 0.2 },
				segments: { value: segments },
				uScaleFactor: { value: scaleFactor },
				uImageAspect: { value: imageAspect }
			},
			vertexShader,
			fragmentShader,
			transparent: true
		});

		geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
		plane = new THREE.Mesh(geometry, material);
		scene.add(plane);
	}

	function setupEventHandlers() {
		if (!containerElement) return;

		if (mode === 'mouse') {
			mouseHandler = createMouseHandler(containerElement, material, motionFactor);
		}

		if (mode === 'scroll') {
			scrollHandler = createScrollHandler(containerElement, material, motionFactor);
		}

		resizeHandler = createResizeHandler(containerElement, renderer, camera, material);
	}

	function startRenderLoop() {
		renderLoop = createRenderLoop(renderer, scene, camera, material, mode, motionFactor);
	}

	function cleanup(): void {
		// Clean up event handlers
		mouseHandler?.cleanup();
		scrollHandler?.cleanup();
		resizeHandler?.cleanup();
		renderLoop?.cleanup();

		// Clean up Three.js resources
		cleanupThreeResources(renderer, material, geometry);
	}

	// Effect to update uniforms when props change or material becomes available
	$effect(() => {
		if (material) {
			material.uniforms.segments.value = segments;
			material.uniforms.uScaleFactor.value = scaleFactor;
			material.uniforms.uOpacity.value = opacity;
			material.uniforms.uImageAspect.value = imageAspect;
			// motionFactor is used in updateDataTexture function, so we don't need to set it here
			// but we need to include it in the effect dependencies
			void motionFactor; // This ensures the effect re-runs when motionFactor changes
		}
	});
</script>

{#if webglSupported}
	<div class="kaleidoscope-container" bind:this={containerElement}>
		<!-- The Three.js canvas will be inserted here -->
	</div>
{:else}
	<div class="webgl-fallback flex h-full w-full items-center justify-center">
		<div class="fallback-content p-8 text-center">
			<h3 class="mb-2 text-lg font-semibold">WebGL Not Supported</h3>
			<p class="text-sm text-gray-600">
				Your browser doesn't support WebGL, which is required for the kaleidoscope effect.
			</p>
			<p class="mt-2 text-xs text-gray-500">
				Try updating your browser or enabling hardware acceleration.
			</p>
		</div>
	</div>
{/if}

<style>
	.kaleidoscope-container {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.webgl-fallback {
		background: linear-gradient(45deg, #f0f4f9, #e8f2ff);
		border: 2px dashed #cbd5e1;
		border-radius: 8px;
	}

	.fallback-content {
		max-width: 300px;
	}
</style>
