import { Request, Response } from 'express'
import { UserService } from '@/api/services/user/UserService.js'
import { BaseController } from '@/api/controllers/BaseController.js'
import { User } from '@/api/models/User.js'

export class GetAllUsersController extends BaseController {
    constructor() {
        super()
    }

    protected async executeImplement(req: Request, res: Response): Promise<void> {
        try {
            const users: User[] = await UserService.getAllUsers()
            this.ok(res, users)
        }
        catch (error: any) {
            this.fail(res, error)
        }
    }
}
