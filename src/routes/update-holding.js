import express from 'express'
import pool from '../database/connection'
// import SQL from 'sql-template-strings'
import mysql from 'mysql2'

const router = express.Router()

// Update one holding
router.patch('/v1/api/holding/:id', async (req, res) => {

    try {

        let query = mysql.format('UPDATE holdings SET ? WHERE id = ?', [req.body, req.params.id]);        

        await pool.query(query, (err, rows, fields) => {

            if(err) res.send(err)
    
            if(rows) {
                res.json('Holding Updated').status(200)
            }
        })
    } catch(err) {
        res.json(err.message)
    }
})

export default router