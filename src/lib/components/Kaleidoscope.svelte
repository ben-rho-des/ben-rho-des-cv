<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import * as THREE from 'three';

	// Props for customization
	export let imageSrc = '';
	export let segments = 6; // Number of kaleidoscope segments
	export let mode = 'static'; // 'static', 'loop', 'mouse', 'scroll'
	export let scaleFactor = 1;
	export let motionFactor = 1;
	export let opacity = 1;
	export let imageAspect = 1; // Image aspect ratio (width/height)

	let containerElement;
	let scene;
	let camera;
	let renderer;
	let material;
	let geometry;
	let plane;
	let mouse = { x: 0, y: 0 };
	let isPlaying = true;
	let lastTime = performance.now() / 1000;
	let animationId;

	// Vertex shader - handles vertex positions
	const vertexShader = `
		varying vec2 vUv;
		
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		}
	`;

	// Fragment shader - creates the kaleidoscope effect
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
		
		// Adjust UV coordinates with offset and rotation
		vec2 adjustUV(vec2 uv, vec2 offset, float rotation) {
			vec2 uvOffset = uv + offset * uOffsetAmount;
			float cosRot = cos(rotation * uRotationAmount);
			float sinRot = sin(rotation * uRotationAmount);
			mat2 rotMat = mat2(cosRot, -sinRot, sinRot, cosRot);
			return rotMat * (uvOffset - vec2(0.5)) + vec2(0.5);
		}
		
		void main() {
			// Normalize UV coordinates
			vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);
			vec2 uv = newUV * 2.0 - 1.0;
			
			// Calculate angle and radius from center
			float angle = atan(uv.y, uv.x);
			float radius = length(uv);
			
			// Create kaleidoscope segments
			float segment = PI * 2.0 / segments;
			angle = mod(angle, segment);
			angle = segment - abs(segment / 2.0 - angle);
			
			// Convert back to UV coordinates
			uv = radius * vec2(cos(angle), sin(angle));
			
			// Apply scaling and adjustments
			float scale = 1.0 / uScaleFactor;
			vec2 adjustedUV = adjustUV(uv * scale + scale, uOffset, uRotation);
			
			// Correct for image aspect ratio
			vec2 aspectCorrectedUV = vec2(adjustedUV.x, adjustedUV.y * uImageAspect);
			
			// Create tiling pattern with mirroring
			vec2 tileIndex = floor(aspectCorrectedUV);
			vec2 oddTile = mod(tileIndex, 2.0);
			vec2 mirroredUV = mix(fract(aspectCorrectedUV), 1.0 - fract(aspectCorrectedUV), oddTile);
			
			// Sample texture and apply opacity
			vec4 color = texture2D(uTexture, mirroredUV);
			color.a *= uOpacity;
			
			gl_FragColor = color;
		}
	`;

	onMount(() => {
		if (browser) {
			initThreeJS();
			setupEventListeners();
			startRenderLoop();
		}
	});

	onDestroy(() => {
		if (browser) {
			cleanup();
		}
	});

	function initThreeJS() {
		// Create scene
		scene = new THREE.Scene();

		// Create camera (orthographic for 2D effect)
		camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, -1000, 1000);
		camera.position.set(0, 0, 2);

		// Create renderer
		renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setSize(containerElement.offsetWidth, containerElement.offsetHeight);
		renderer.setClearColor(0xeeeeee, 1);
		renderer.physicallyCorrectLights = true;
		renderer.outputColorSpace = THREE.SRGBColorSpace;

		// Position renderer
		renderer.domElement.style.position = 'absolute';
		renderer.domElement.style.top = '0';
		renderer.domElement.style.left = '0';
		renderer.domElement.style.zIndex = '1';

		containerElement.appendChild(renderer.domElement);

		// Load texture with error handling
		const textureLoader = new THREE.TextureLoader();
		const texture = textureLoader.load(
			imageSrc,
			// onLoad callback
			(texture) => {
				console.log('Texture loaded successfully');
				texture.minFilter = THREE.LinearFilter;
				texture.generateMipmaps = false;
				texture.wrapS = THREE.RepeatWrapping;
				texture.wrapT = THREE.RepeatWrapping;
			},
			// onProgress callback
			undefined,
			// onError callback
			(error) => {
				console.error('Error loading texture:', error);
			}
		);

		// Create material with shaders
		material = new THREE.ShaderMaterial({
			extensions: {
				derivatives: '#extension GL_OES_standard_derivatives : enable'
			},
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

		// Create geometry and mesh
		geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
		plane = new THREE.Mesh(geometry, material);
		scene.add(plane);

		console.log('Three.js scene initialized');
		console.log('Container dimensions:', containerElement.offsetWidth, containerElement.offsetHeight);
		console.log('Image source:', imageSrc);

		// Initial resize
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

	function handleMouseMove(event) {
		updateMousePosition(event.clientX, event.clientY);
	}

	function handleTouchMove(event) {
		if (event.touches.length > 0) {
			updateMousePosition(event.touches[0].clientX, event.touches[0].clientY);
		}
	}

	function updateMousePosition(clientX, clientY) {
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
		camera.aspect = width / height;
		camera.updateProjectionMatrix();

		// Calculate aspect ratio for shader
		let aspectX, aspectY;
		if (height / width > 1) {
			aspectX = (width / height) * 1;
			aspectY = 1;
		} else {
			aspectX = 1;
			aspectY = (height / width) / 1;
		}

		// Update shader uniforms
		material.uniforms.resolution.value.x = width;
		material.uniforms.resolution.value.y = height;
		material.uniforms.resolution.value.z = aspectX;
		material.uniforms.resolution.value.w = aspectY;
	}

	function updateDataTexture(time) {
		time /= 1000;

		if (mode === 'mouse') {
			// Mouse-based rotation and offset
			const offsetX = 2 * (mouse.x - 0.5) * motionFactor;
			const offsetY = 2 * (mouse.y - 0.5) * motionFactor;
			material.uniforms.uOffset.value.set(offsetX, offsetY);

			const rotation = Math.PI * (mouse.y - 0.5) * 2 * motionFactor;
			material.uniforms.uRotation.value = rotation;
		} else if (mode === 'loop') {
			// Continuous rotation
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
					// Update animations for mouse and loop modes
					if (mode === 'mouse' || mode === 'loop') {
						updateDataTexture(time);
					}

					// Render the scene
					renderer.render(scene, camera);
					animationId = requestAnimationFrame(render);
				} catch (error) {
					console.error('Render error:', error);
				}
			}
		}

		render();
	}

	function cleanup() {
		if (animationId) {
			cancelAnimationFrame(animationId);
		}

		if (renderer) {
			renderer.dispose();
		}

		if (material) {
			material.dispose();
		}

		if (geometry) {
			geometry.dispose();
		}

		// Remove event listeners
		if (mode === 'mouse') {
			containerElement.removeEventListener('mousemove', handleMouseMove);
			containerElement.removeEventListener('touchmove', handleTouchMove);
		}

		if (mode === 'scroll') {
			window.removeEventListener('scroll', handleScroll);
		}

		window.removeEventListener('resize', handleResize);
	}

	// Reactive updates
	$: if (material) {
		material.uniforms.segments.value = segments;
		material.uniforms.uScaleFactor.value = scaleFactor;
		material.uniforms.uOpacity.value = opacity;
		material.uniforms.uImageAspect.value = imageAspect;
	}
</script>

<div class="kaleidoscope-container" bind:this={containerElement}>
	<!-- The Three.js canvas will be inserted here -->
</div>

<style>
	.kaleidoscope-container {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
</style>
