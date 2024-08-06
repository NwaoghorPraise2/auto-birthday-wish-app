// Define an interface for the API error structure
interface IApiError {
    statusCode: number;
    data: null;
    message: string;
    success: boolean;
    errors: any[];
    stack: string;
}

// Define a custom error class for API errors
class CustomApiError extends Error implements IApiError {
    public statusCode: number;
    public data: null = null;
    public success: boolean = false;
    public errors: any[] = [];
    public stack: string = '';

    constructor(
        statusCode: number,
        message: string,
        errors: any[] = [],
        stack: string = ''
    ) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default CustomApiError;
