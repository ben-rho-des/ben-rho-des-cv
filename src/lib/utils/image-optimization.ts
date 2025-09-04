// Image optimization utilities
export interface ImageOptimizationOptions {
	width?: number;
	height?: number;
	quality?: number;
	format?: 'webp' | 'avif' | 'jpeg' | 'png';
}

export function getOptimizedImageSrc(src: string, options: ImageOptimizationOptions = {}): string {
	// Destructure to avoid unused parameter warning
	const { width, height, quality, format } = options;
	console.log('Image optimization options:', { width, height, quality, format });
	// For static images, we can't dynamically optimize them
	// In a real app, you'd use a service like Cloudinary, ImageKit, or Next.js Image
	// For now, we'll just return the original src
	return src;
}

export function preloadImage(src: string): Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = reject;
		img.src = src;
	});
}

export function getImageDimensions(src: string): Promise<{ width: number; height: number }> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => {
			resolve({
				width: img.naturalWidth,
				height: img.naturalHeight
			});
		};
		img.onerror = reject;
		img.src = src;
	});
}

export function supportsWebP(): boolean {
	if (typeof window === 'undefined') return false;

	const canvas = document.createElement('canvas');
	canvas.width = 1;
	canvas.height = 1;

	return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

export function supportsAVIF(): boolean {
	if (typeof window === 'undefined') return false;

	const canvas = document.createElement('canvas');
	canvas.width = 1;
	canvas.height = 1;

	return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
}

export function getBestImageFormat(): 'avif' | 'webp' | 'jpeg' {
	if (supportsAVIF()) return 'avif';
	if (supportsWebP()) return 'webp';
	return 'jpeg';
}
