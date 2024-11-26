import { body, ValidationChain } from 'express-validator'
import isLength from 'validator/lib/isLength'
import { RequestModuleModel } from '@/api/models/ModuleModel.ts'
import { RequestTermModel } from '@/api/models/TermModel.ts'

export const moduleValidation: {
    [K in keyof Partial<RequestModuleModel>]: (field: K) => ValidationChain;
} = {
    folderId: field => body(field).optional().toInt(),
    isPublic: field => body(field).optional().isBoolean().withMessage(`${field} must be a boolean`),
    name: field => body(field)
        .isLength({ min: 3, max: 128 })
        .withMessage(`${field} must be between 3 and 128 characters`),
    description: field => body(field)
        .optional()
        .isLength({ min: 1, max: 1024 }).withMessage(`${field} must be between 1 and 1024 characters`),
    terms: field => body(field)
        .optional()
        .isArray({ min: 1, max: 100 })
        .withMessage(`${field} must be an array with 1 - 100 terms`)
        .custom((terms: RequestTermModel[]) => {
            terms.forEach(({ term, definition }, index) => {
                if (!isLength(term, { min: 1, max: 1024 })) {
                    throw new Error(`'term' must be between 1 and 1024 characters at index ${index}`)
                }
                if (!isLength(definition, { min: 1, max: 1024 })) {
                    throw new Error(`'definition' must be between 1 and 1024 characters at index ${index}`)
                }
            })

            return true
        }),
}
