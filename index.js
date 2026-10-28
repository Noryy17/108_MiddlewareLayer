import express from 'express'
import pg from 'pg'
import Joi, { allow } from 'joi'
import e from 'express'

const app = express()
const port = 3000
const { Pool } = pg

const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'mahasiswa',
    password: 'Qwertyuiop10Q',
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// MIDDLEWARE LOGGING
app.use((req, res, next) => {
    const start = Date.now()

    res.on('finish', () => {
        const duration = Date.now() - start

        console.log({
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            // SEKARANG SUDAH MENGGUNAKAN BACKTICK (`)
            duration: `${duration} ms`, 
        })
    })

    next()
})
