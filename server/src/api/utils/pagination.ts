export const getPagination = (page: number, size: number) => {
    const limit = size ? +size : 10
    const offset = page ? page * limit : 0

    return { limit, offset }
}

export const getPagingData = (data: { count: number, rows: any[] }, page: number, limit: number) => {
    const { count, rows } = data
    const currentPage = page ? +page : 0
    const totalPages = Math.ceil(count / limit)
    const hasMore = currentPage + 1 < totalPages

    return { data: rows, count, limit, currentPage, totalPages, hasMore }
}
