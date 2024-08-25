import { NextFunction, Request, Response } from 'express'
import { StatusConstants } from '@/api/constants/StatusConstants.js'

export abstract class BaseController {
    protected abstract executeImplement(req: Request, res: Response, next: NextFunction): Promise<void | any>

    public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await this.executeImplement(req, res, next)
        }
        catch (error) {
            console.log(`[BaseController]: Uncaught controller error \n`, error)
            this.fail(res, 'An unexpected error occurred')
        }
    }

    public static jsonResponse(res: Response, code: number, message: string) {
        return res.status(code).json({ message })
    }

    public ok<T>(res: Response, dto?: T) {
        if (dto) {
            res.type('application/json')
            return res.status(StatusConstants.SUCCESS_CODE).json(dto)
        }
        else {
            return res.sendStatus(StatusConstants.SUCCESS_CODE)
        }
    }

    public fail(res: Response, error: Error | string) {
        console.log(error)
        return res.status(StatusConstants.INTERNAL_SERVER_ERROR_CODE).json({
            message: error.toString(),
        })
    }

    public created(res: Response) {
        return res.sendStatus(201)
    }

    public clientError(res: Response, message?: string) {
        return BaseController.jsonResponse(res, StatusConstants.BAD_REQUEST_CODE, message ? message : StatusConstants.BAD_REQUEST_MSG)
    }

    public unauthorized(res: Response, message?: string) {
        return BaseController.jsonResponse(res, StatusConstants.UNAUTHORIZED_CODE, message ? message : StatusConstants.UNAUTHORIZED_MSG)
    }

    public forbidden(res: Response, message?: string) {
        return BaseController.jsonResponse(res, StatusConstants.FORBIDDEN_CODE, message ? message : StatusConstants.FORBIDDEN_MSG)
    }

    public notFound(res: Response, message?: string) {
        return BaseController.jsonResponse(res, StatusConstants.NOT_FOUND_RESOURCE_CODE, message ? message : StatusConstants.NOT_FOUND_RESOURCE_MSG)
    }

    public conflict(res: Response, message?: string) {
        return BaseController.jsonResponse(res, StatusConstants.CONFLICT_CODE, message ? message : StatusConstants.CONFLICT_MSG)
    }
}
