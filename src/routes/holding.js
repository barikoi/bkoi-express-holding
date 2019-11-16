import express from 'express'
import pool from '../database/connection'
import SQL from 'sql-template-strings'
// import moment from 'moment'
import moment from 'moment-timezone'


const router = express.Router()

router.get('/', (req, res) => res.send('bad url'))


// Get all holding
router.get('/v1/api/holding', async (req, res) => {
    await pool.query("SELECT * FROM holdings", (err, rows, fields) => {

        if(err) res.send(err)
        // console.log(moment('2019-12-10').format("YYYY-MM-DD HH:mm:ss"))
        res.json(rows).status(200)
    })
})

// Get a holding by id
router.get('/v1/api/holding/:id', async (req, res) => {
    
    try {
        
        let query = SQL`SELECT * FROM holdings WHERE id=${req.params.id}`

        await pool.query(query, (err, rows, fields) => {

            if(err) res.send(err)

            if(rows) {
                res.status(200).json(rows[0])
            }
        })
    }
    catch(err) {
        res.json(err.message)
    }
})


export default router




