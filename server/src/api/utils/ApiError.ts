import { StatusConstants } from '@/api/constants/StatusConstants.js'

export class ApiError extends Error {
    status
    errors: any[]

    constructor(status: number, message: string, errors: any[] = []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static Unauthorized() {
        return new ApiError(StatusConstants.UNAUTHORIZED_CODE, StatusConstants.UNAUTHORIZED_MSG)
    }

    static BadRequest(message: string, errors: any[] = []) {
        return new ApiError(StatusConstants.BAD_REQUEST_CODE, `${message}`, errors)
    }

    static Conflict(message: string, errors: any[] = []) {
        return new ApiError(StatusConstants.CONFLICT_CODE, `${message}`, errors)
    }

    static NotFound(message: string, errors: any[] = []) {
        return new ApiError(StatusConstants.NOT_FOUND_RESOURCE_CODE, `${message}`, errors)
    }
}
