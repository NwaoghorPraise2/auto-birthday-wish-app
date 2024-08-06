

class GlobalError extends Error {
    public message: string;
    private statusCode: number;
    private status: string;
    private isOperational: boolean;


    constructor( statusCode:number, message: string,) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default GlobalError;