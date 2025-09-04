// Form state discriminated union
export type FormState =
	| { status: 'idle' }
	| { status: 'loading' }
	| { status: 'success'; message: string }
	| { status: 'error'; message: string };

// Theme and mode types
export type Theme = '🌞' | '🌚';
export type Mode = Theme | '🫥';

export interface ModeState {
	theme: Theme;
	grid: boolean;
}

// Blog post interface
export interface BlogPost {
	title: string;
	date: string;
	excerpt: string;
	tags: string[];
	slug: string;
	content: string;
}

// Navigation item interface
export interface NavItem {
	href: string;
	label: string;
}

// Kaleidoscope component props
export interface KaleidoscopeProps {
	imageSrc: string;
	segments: number;
	mode: 'static' | 'loop' | 'mouse' | 'scroll';
	scaleFactor: number;
	motionFactor: number;
	opacity: number;
	imageAspect: number;
}

// Page title component props
export interface PageTitleProps {
	title: string;
}

// Form data interface
export interface ContactFormData {
	name: string;
	email: string;
	message: string;
	website: string; // honeypot
}

// Animation options
export interface AnimationOptions {
	titleOptions: string[];
	imageOptions: string[];
}

// Three.js cleanup function type
export type CleanupFunction = () => void;
