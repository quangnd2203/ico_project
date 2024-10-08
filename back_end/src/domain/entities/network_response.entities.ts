class NetworkResponse<T> {

    public code: STATUS_CODE;
    public message?: string;
    public response?: T;

    static fromErrors: <T>(code: STATUS_CODE, error: string) => NetworkResponse<T>;
    static success: <T>(response:T, message?: string) => NetworkResponse<T>;

    constructor(code: STATUS_CODE, message?: string, response?: T) {
        this.code = code;
        this.message = message;
        this.response = response;
    }
}

NetworkResponse.fromErrors = function <T>(code: STATUS_CODE, error: string) {
    return new NetworkResponse<T>(
        code,
        error,
        null,
    );
}

NetworkResponse.success = function <T>(response: T, message?: string) {
    return new NetworkResponse<T>(
        STATUS_CODE.success,
        message,
        response,
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