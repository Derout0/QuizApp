import { NextFunction, Request, Response } from 'express'
import { UserService } from '@/api/services/UserService.js'
import { BaseController } from '@/api/controllers/BaseController.js'
import { UserModel } from '@/api/models/UserModel.js'

export class GetAllUsersController extends BaseController {
    constructor() {
        super()
    }

    protected async executeImplement(req: Request, res: Response, next: NextFunction) {
        try {
            const users: UserModel[] = await UserService.getAllUsers()
            this.ok(res, users)
        }
        catch (error: any) {
            next(error)
        }
    }
}
