export class StatusConstants {
    public static SUCCESS_CODE = 200
    public static BAD_REQUEST_CODE = 400
    public static UNAUTHORIZED_CODE = 401
    public static FORBIDDEN_CODE = 403
    public static NOT_FOUND_RESOURCE_CODE = 404
    public static CONFLICT_CODE = 409
    public static INTERNAL_SERVER_ERROR_CODE = 500

    public static SUCCESS_MSG = '[Success]: Success.'
    public static BAD_REQUEST_MSG = '[Error]: Bad request!'
    public static UNAUTHORIZED_MSG = '[Error]: Unauthorized!'
    public static FORBIDDEN_MSG = '[Error]: Forbidden!'
    public static NOT_FOUND_RESOURCE_MSG = '[Error]: Resource not found!'
    public static CONFLICT_MSG = '[Error]: Conflict!'
    public static INTERNAL_SERVER_ERROR_MSG = '[Error]: Internal server error!'

    // Custom
    public static USER_ALREADY_EXISTS_MSG = '[Error]: User already exists!'
    public static VALIDATION_ERROR_MSG = '[Error]: Validation Error!'

    // Not Found
    public static ID_NOT_FOUND_MSG = '[Error]: ID not found!'
    public static PROFILE_NOT_FOUND_MSG = '[Error]: Profile not found!'
    public static USER_NOT_FOUND_MSG = '[Error]: User not found!'
    public static DATA_NOT_FOUND_MSG = '[Error]: Data not found!'
}
