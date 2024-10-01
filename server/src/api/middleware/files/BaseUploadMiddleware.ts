import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import multer, { Multer, StorageEngine } from 'multer'
import { MimeTypes } from '@/api/constants/MimeTypes.ts'
import { ApiError } from '@/api/utils/ApiError.ts'

export class BaseUploadMiddleware {
    private storage: StorageEngine
    private allowedFileTypes: MimeTypes[]
    private maxSizeMB: number

    constructor(destination: string, allowedFileTypes: MimeTypes[], maxSizeMB: number) {
        this.allowedFileTypes = allowedFileTypes
        this.maxSizeMB = maxSizeMB
        this.storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, destination)
            },
            filename: (req, file, cb) => {
                const uniqueString = uuidv4()
                const extension = path.extname(file.originalname)
                cb(null, `${file.fieldname}-${uniqueString}${extension}`)
            },
        })
    }

    public getMulter(): Multer {
        return multer({
            storage: this.storage,
            limits: { fileSize: this.maxSizeMB * 1024 * 1024 },
            fileFilter: (req, file, cb) => {
                if (this.allowedFileTypes.includes(file.mimetype as MimeTypes)) {
                    cb(null, true)
                }
                else {
                    cb(ApiError.BadRequest('Unsupported file type!'))
                }
            },
        })
    }

    public single(fieldName: string) {
        return this.getMulter().single(fieldName)
    }

    public array(fieldName: string, maxCount: number) {
        return this.getMulter().array(fieldName, maxCount)
    }

    public fields(fields: { name: string, maxCount: number, maxSizeMB?: number }[]) {
        return this.getMulter().fields(fields)
    }

    public any() {
        return this.getMulter().any()
    }
}
