import * as THREE from 'three';

// Three.js utility functions
export function createOrthographicCamera(): THREE.OrthographicCamera {
	const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, -1000, 1000);
	camera.position.set(0, 0, 2);
	return camera;
}

export function createWebGLRenderer(
	container: HTMLElement,
	width: number,
	height: number
): THREE.WebGLRenderer {
	const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	renderer.setSize(width, height);
	renderer.setClearColor(0xeeeeee, 1);
	renderer.outputColorSpace = THREE.SRGBColorSpace;

	renderer.domElement.style.position = 'absolute';
	renderer.domElement.style.top = '0';
	renderer.domElement.style.left = '0';
	renderer.domElement.style.zIndex = '1';

	container.appendChild(renderer.domElement);
	return renderer;
}

export function loadTexture(
	imageSrc: string,
	onLoad?: (texture: THREE.Texture) => void,
	onError?: (error: unknown) => void
): THREE.Texture {
	const textureLoader = new THREE.TextureLoader();
	return textureLoader.load(
		imageSrc,
		(texture: THREE.Texture) => {
			texture.minFilter = THREE.LinearFilter;
			texture.generateMipmaps = false;
			texture.wrapS = THREE.RepeatWrapping;
			texture.wrapT = THREE.RepeatWrapping;
			onLoad?.(texture);
		},
		undefined,
		(error: unknown) => {
			console.error('Error loading texture:', error);
			onError?.(error);
		}
	);
}

export function cleanupThreeResources(
	renderer?: THREE.WebGLRenderer,
	material?: THREE.Material,
	geometry?: THREE.BufferGeometry
): void {
	if (material) {
		material.dispose();
	}
	if (geometry) {
		geometry.dispose();
	}
	if (renderer) {
		renderer.dispose();
	}
}

export function isWebGLSupported(): boolean {
	try {
		const canvas = document.createElement('canvas');
		return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
	} catch {
		return false;
	}
}
