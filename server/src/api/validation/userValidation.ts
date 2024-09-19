import { body, ValidationChain } from 'express-validator'
import { UserModel } from '@/api/models/UserModel.ts'

export const userValidation: {
    [K in keyof Partial<UserModel>]: (field: K) => ValidationChain;
} = {
    username: field => body(field).optional().isLength({ min: 3, max: 32 }).withMessage(`${field} must be between 3 and 32 characters`),
    password: field => body(field).optional().isLength({ min: 3, max: 32 }).withMessage(`${field} must be between 3 and 32 characters`),
    email: field => body(field).optional().isEmail().withMessage(`${field} must be email`),
}
