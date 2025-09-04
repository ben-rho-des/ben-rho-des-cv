<script lang="ts">
	import { browser } from '$app/environment';
	import {
		createOrthographicCamera,
		createWebGLRenderer,
		loadTexture,
		cleanupThreeResources,
		isWebGLSupported
	} from '$lib/utils/three-helpers';
	import { DEFAULTS } from '$lib/constants';

	// Kaleidoscope-specific constants
	const MODES = {
		STATIC: 'static',
		LOOP: 'loop',
		MOUSE: 'mouse',
		SCROLL: 'scroll'
	} as const;

	const {
		imageSrc = '',
		segments = DEFAULTS.SEGMENTS,
		mode = MODES.STATIC,
		scaleFactor = DEFAULTS.SCALE_FACTOR,
		motionFactor = DEFAULTS.MOTION_FACTOR,
		opacity = DEFAULTS.OPACITY,
		imageAspect = DEFAULTS.IMAGE_ASPECT
	} = $props<{
		imageSrc?: string;
		segments?: number;
		mode?: 'static' | 'loop' | 'mouse' | 'scroll';
		scaleFactor?: number;
		motionFactor?: number;
		opacity?: number;
		imageAspect?: number;
	}>();

	let containerElement: HTMLElement;
	let scene: import('three').Scene;
	let camera: import('three').OrthographicCamera;
	let renderer: import('three').WebGLRenderer;
	let material: import('three').ShaderMaterial;
	let geometry: import('three').PlaneGeometry;
	let plane: import('three').Mesh;
	const mouse = $state({ x: 0, y: 0 });
	const isPlaying = $state(true);
	let lastTime = performance.now() / 1000;
	let animationId: number;
	let webglSupported = $state(true);
	let texture: import('three').Texture;
	let THREE: typeof import('three');

	const vertexShader = `
		varying vec2 vUv;
		
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		}
	`;

	const fragmentShader = `
		precision mediump float;
		
		uniform sampler2D uTexture;
		uniform vec4 resolution;
		uniform float uOpacity;
		uniform float segments;
		uniform vec2 uOffset;
		uniform float uRotation;
		uniform float uOffsetAmount;
		uniform float uRotationAmount;
		uniform float uScaleFactor;
		uniform float uImageAspect;
		
		varying vec2 vUv;
		
		const float PI = 3.14159265359;
		
		vec2 adjustUV(vec2 uv, vec2 offset, float rotation) {
			vec2 uvOffset = uv + offset * uOffsetAmount;
			float cosRot = cos(rotation * uRotationAmount);
			float sinRot = sin(rotation * uRotationAmount);
			mat2 rotMat = mat2(cosRot, -sinRot, sinRot, cosRot);
			return rotMat * (uvOffset - vec2(0.5)) + vec2(0.5);
		}
		
		void main() {
			vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);
			vec2 uv = newUV * 2.0 - 1.0;
			
			float angle = atan(uv.y, uv.x);
			float radius = length(uv);
			
			float segment = PI * 2.0 / segments;
			angle = mod(angle, segment);
			angle = segment - abs(segment / 2.0 - angle);
			
			uv = radius * vec2(cos(angle), sin(angle));
			
			float scale = 1.0 / uScaleFactor;
			vec2 adjustedUV = adjustUV(uv * scale + scale, uOffset, uRotation);
			
			vec2 aspectCorrectedUV = vec2(adjustedUV.x, adjustedUV.y * uImageAspect);
			
			vec2 tileIndex = floor(aspectCorrectedUV);
			vec2 oddTile = mod(tileIndex, 2.0);
			vec2 mirroredUV = mix(fract(aspectCorrectedUV), 1.0 - fract(aspectCorrectedUV), oddTile);
			
			vec4 color = texture2D(uTexture, mirroredUV);
			color.a *= uOpacity;
			
			gl_FragColor = color;
		}
	`;

	$effect(() => {
		if (browser) {
			webglSupported = isWebGLSupported();
			if (webglSupported) {
				// Dynamically import Three.js
				import('three').then((THREE_MODULE) => {
					THREE = THREE_MODULE;
					initThreeJS();
					setupEventListeners();
					startRenderLoop();
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

		renderer = createWebGLRenderer(
			containerElement,
			containerElement.offsetWidth,
			containerElement.offsetHeight
		);

		texture = loadTexture(
			imageSrc,
			(loadedTexture: import('three').Texture) => {
				console.log('Texture loaded successfully');
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

		handleResize();
	}

	function setupEventListeners() {
		if (mode === 'mouse') {
			containerElement.addEventListener('mousemove', handleMouseMove);
			containerElement.addEventListener('touchmove', handleTouchMove);
		}

		if (mode === 'scroll') {
			window.addEventListener('scroll', handleScroll);
		}

		window.addEventListener('resize', handleResize);
	}

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

	function handleScroll() {
		const rect = containerElement.getBoundingClientRect();
		const top = rect.top;
		const bottom = rect.bottom;

		if (top < window.innerHeight && bottom >= 0) {
			const totalHeight = window.innerHeight + containerElement.offsetHeight;
			const scrollProgress = (window.innerHeight - top) / totalHeight;
			const maxRotation = 2 * Math.PI;
			material.uniforms.uRotation.value = scrollProgress * maxRotation * motionFactor;
		}
	}

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

	function updateDataTexture(time: number) {
		time /= 1000;

		if (mode === 'mouse') {
			const offsetX = 2 * (mouse.x - 0.5) * motionFactor;
			const offsetY = 2 * (mouse.y - 0.5) * motionFactor;
			material.uniforms.uOffset.value.set(offsetX, offsetY);

			const rotation = Math.PI * (mouse.y - 0.5) * 2 * motionFactor;
			material.uniforms.uRotation.value = rotation;
		} else if (mode === 'loop') {
			const deltaTime = time - lastTime;
			const rotationSpeed = 0.1;
			material.uniforms.uRotation.value += rotationSpeed * motionFactor * deltaTime;
			lastTime = time;
		}
	}

	function startRenderLoop() {
		function render(time = 0) {
			if (isPlaying && renderer && scene && camera) {
				try {
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

		render();
	}

	function cleanup(): void {
		if (animationId) {
			cancelAnimationFrame(animationId);
		}

		cleanupThreeResources(renderer, material, geometry);

		if (mode === 'mouse') {
			containerElement.removeEventListener('mousemove', handleMouseMove);
			containerElement.removeEventListener('touchmove', handleTouchMove);
		}

		if (mode === 'scroll') {
			window.removeEventListener('scroll', handleScroll);
		}

		window.removeEventListener('resize', handleResize);
	}

	$effect(() => {
		if (material) {
			material.uniforms.segments.value = segments;
			material.uniforms.uScaleFactor.value = scaleFactor;
			material.uniforms.uOpacity.value = opacity;
			material.uniforms.uImageAspect.value = imageAspect;
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
