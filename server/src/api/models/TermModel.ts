export interface RequestTermModel {
    term: string
    definition: string
}

export interface TermModel extends RequestTermModel {
    termId: number
    moduleId: number
}
