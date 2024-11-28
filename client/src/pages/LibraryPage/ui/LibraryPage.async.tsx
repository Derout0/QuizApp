import { lazy } from 'react'

export const LibraryPageAsync = lazy(async () => await import('./LibraryPage'))
