import { fileURLToPath } from 'url'
import path from 'path'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
global.__filename = fileURLToPath(import.meta.url)
global.__dirname = path.dirname(__filename)
global.__projectRoot = path.resolve(__dirname, '../..')
