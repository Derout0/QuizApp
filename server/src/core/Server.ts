import { app } from '@/index.js'

const PORT = process.env.PORT || 3000

export const server = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    }
    catch (err) {
        console.log(err)
    }
}
