import { lazy } from 'react'

export const ModulesPageAsync = lazy(async () => await import('./ModulesPage'))
