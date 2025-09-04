// Error handling utilities
export interface AppError {
	message: string;
	code?: string;
	details?: unknown;
}

export class ValidationError extends Error {
	constructor(
		message: string,
		public field?: string
	) {
		super(message);
		this.name = 'ValidationError';
	}
}

export class NetworkError extends Error {
	constructor(
		message: string,
		public status?: number
	) {
		super(message);
		this.name = 'NetworkError';
	}
}

export function createUserFriendlyError(error: unknown): string {
	if (error instanceof ValidationError) {
		return error.message;
	}

	if (error instanceof NetworkError) {
		if (error.status === 429) {
			return 'Too many requests. Please try again later.';
		}
		if (error.status && error.status >= 500) {
			return 'Server error. Please try again later.';
		}
		return 'Network error. Please check your connection and try again.';
	}

	if (error instanceof Error) {
		return error.message;
	}

	return 'An unexpected error occurred. Please try again.';
}

export function logError(error: unknown, context?: string): void {
	const timestamp = new Date().toISOString();
	const errorInfo = {
		timestamp,
		context,
		error:
			error instanceof Error
				? {
						name: error.name,
						message: error.message,
						stack: error.stack
					}
				: error
	};

	console.error('Application Error:', errorInfo);

	// In a real app, you might send this to an error reporting service
	// like Sentry, LogRocket, etc.
}

export function handleAsyncError<T>(
	promise: Promise<T>,
	fallback: T,
	context?: string
): Promise<T> {
	return promise.catch((error) => {
		logError(error, context);
		return fallback;
	});
}
