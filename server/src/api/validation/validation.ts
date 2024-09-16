import { ValidationChain } from 'express-validator'

export const validation = <T>(fieldMapping: {
    [K in keyof T]: (field: K) => ValidationChain
}): ValidationChain[] => {
    return Object.entries(fieldMapping).map(([key]) => {
        const typedKey = key as keyof T
        return fieldMapping[typedKey](typedKey)
    })
}
