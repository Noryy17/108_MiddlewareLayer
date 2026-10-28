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

