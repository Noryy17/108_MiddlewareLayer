import express from 'express'
import pg from 'pg'
import Joi, { allow, valid } from 'joi'
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

// RESPONSE ENVELOPE
function successResponse(res, message, data, status = 200) {
    return res.status(status).json({
        success: true,
        message,
        data,
        error: null,
    })
}

function errorResponse(res, message, status, details = null) {
    return res.status(status).json({
        success: false,
        message,
        data: null,
        error: details,
    })
}

const biodataSchema = Joi.object({
    id: Joi.number().integer().positive(),
    nama: Joi.string().trim().min(2).max(100).required(),
    nim: Joi.string().trim().nim(5).max(20).required(),
    kelas: Joi.string().trim().min(1).max(20).required(),
})
