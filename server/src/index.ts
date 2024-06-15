import express from 'express'

export const app = express()

interface ProductsInterface {
    id: number
    title: string
}

interface DB {
    products: ProductsInterface[]
}

const testDB: DB = {
    products: [
        { id: 1, title: 'Some Name' },
    ],
}

app.get('/products', (req, res) => {
    res.json(testDB).send()
})
