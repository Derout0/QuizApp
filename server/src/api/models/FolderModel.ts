export interface RequestFolderModel {
    userId: number
    name: string
    parentFolderId?: number | null
}

export interface FolderModel extends RequestFolderModel {
    folderId: number
    createdAt: Date
}
