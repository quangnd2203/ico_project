class NetworkResponse<T> {

    public code: STATUS_CODE;
    public message?: string;
    public data?: T;

    static fromErrors: <T>(code: STATUS_CODE, error: string) => NetworkResponse<T>;
    static success: <T>(data:any, message?: string) => NetworkResponse<T>;

    constructor(code: STATUS_CODE, message?: string, data?: T) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
}

NetworkResponse.fromErrors = function <T>(code: STATUS_CODE, error: string) {
    return new NetworkResponse<T>(
        code,
        error,
        null,
    );
}

NetworkResponse.success = function <T>(data: T, message?: string) {
    return new NetworkResponse<T>(
        STATUS_CODE.success,
        message,
        data,
    );
}

enum STATUS_CODE {
    success = 200,
    bad_request = 400,
    unauthorized = 401,
    forbidden = 403,
    not_found = 404,
    request_entity_too_large = 413,
    unsupported_media_type = 415,
}

export { NetworkResponse, STATUS_CODE }