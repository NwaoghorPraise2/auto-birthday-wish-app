
class ApiResponse{
    status: string;
    statusCode: number;
    data: {};
    message: string;

    constructor(statusCode: number, data: {}, message: string) {
        this.status = 'Success'
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
    }
}

export default ApiResponse;
