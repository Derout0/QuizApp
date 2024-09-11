import { NextFunction, Request, Response } from 'express'
import { AuthService } from '@/api/services/AuthService.ts'
import { BaseController } from '@/api/controllers/BaseController.ts'

export class GetAllUsersController extends BaseController {
    // private userService: AuthService

    constructor() {
        super()
        // this.userService = new AuthService()
    }

    protected async executeImplement(req: Request, res: Response, next: NextFunction) {
        // try {
        //     const users: UserModel[] = await this.userService.getAllUsers()
        //     this.ok(res, users)
        // }
        // catch (error: any) {
        //     next(error)
        // }
    }
}
