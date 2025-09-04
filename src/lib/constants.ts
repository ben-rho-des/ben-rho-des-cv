export const THEMES = {
	LIGHT: '🌞',
	DARK: '🌚',
	GRID: '🫥'
} as const;

export type Theme = (typeof THEMES)[keyof typeof THEMES];

export const DEFAULTS = {
	THEME: THEMES.LIGHT,
	GRID_ENABLED: false,
	SEGMENTS: 6,
	SCALE_FACTOR: 1,
	MOTION_FACTOR: 1,
	OPACITY: 1,
	IMAGE_ASPECT: 1
} as const;

const CSS_CLASSES_MODE_PREFIX = 'mode-';
export const CSS_CLASSES = {
	MODE_PREFIX: CSS_CLASSES_MODE_PREFIX,
	GRID_MODE: `${CSS_CLASSES_MODE_PREFIX}${THEMES.GRID}`,
	DARK_MODE: `${CSS_CLASSES_MODE_PREFIX}${THEMES.DARK}`,
	LIGHT_MODE: `${CSS_CLASSES_MODE_PREFIX}${THEMES.LIGHT}`
} as const;
