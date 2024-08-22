import pg from 'pg'

// const database = new Pool({
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     host: process.env.DB_HOST,
//     port: Number(process.env.DB_PORT),
//     database: process.env.DB_NAME,
// })

const { Pool } = pg

const database = new Pool({
    user: 'postgres',
    password: 'GEoGRaF1',
    host: 'localhost',
    port: 5432,
    database: 'Quiz App',
})

export default database
