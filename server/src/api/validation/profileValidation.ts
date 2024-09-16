import { body, ValidationChain } from 'express-validator'
import { ProfileModel } from '@/api/models/ProfileModel.ts'

export const profileValidation: {
    [K in keyof Partial<ProfileModel>]: (field: K) => ValidationChain;
} = {
    avatarUrl: field => body(field).optional().isURL().withMessage(`${field} must be a valid URL`),
    firstName: field => body(field).optional().isLength({ min: 3, max: 32 }).withMessage(`${field} must be between 3 and 32 characters`),
    lastName: field => body(field).optional().isLength({ min: 3, max: 32 }).withMessage(`${field} must be between 3 and 32 characters`),
    about: field => body(field).optional().isLength({ max: 500 }).withMessage(`${field} must not exceed 500 characters`),
    age: field => body(field).optional().isInt({ min: 1, max: 99 }).withMessage('Age must be between 1 and 99'),
    country: field => body(field).optional().isString().withMessage(`${field} must be a string`),
}
