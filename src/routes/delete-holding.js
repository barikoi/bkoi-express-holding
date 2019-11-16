import express from 'express'
import pool from '../database/connection'
import SQL from 'sql-template-strings'

const router = express.Router()

// Delete a holding
router.delete('/v1/api/holding/:id', async (req, res) => {
    
    try {
        
        let query = SQL`DELETE FROM holdings WHERE id=${req.params.id}`

        await pool.query(query, (err, rows, fields) => {

            if(err) res.send(err)
    
            if(rows) {
                res.status(204).json('Holding Deleted')
            }
        })
    }
    catch(err) {
        res.json(err.message)
    }
})

export default router