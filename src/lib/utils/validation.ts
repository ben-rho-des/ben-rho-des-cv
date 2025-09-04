// Form validation utilities
export function validateEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

export function validateName(name: string): boolean {
	return name.trim().length >= 2;
}

export function validateMessage(message: string): boolean {
	return message.trim().length >= 10;
}

export interface ValidationResult {
	isValid: boolean;
	errors: string[];
}

export function validateContactForm(data: {
	name: string;
	email: string;
	message: string;
}): ValidationResult {
	const errors: string[] = [];

	if (!validateName(data.name)) {
		errors.push('Name must be at least 2 characters long');
	}

	if (!validateEmail(data.email)) {
		errors.push('Please enter a valid email address');
	}

	if (!validateMessage(data.message)) {
		errors.push('Message must be at least 10 characters long');
	}

	return {
		isValid: errors.length === 0,
		errors
	};
}
