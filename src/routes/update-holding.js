import express from 'express'
import pool from '../database/connection'
// import SQL from 'sql-template-strings'
import mysql from 'mysql2'
import rp from 'request-promise'

const router = express.Router()

// Update one holding
router.patch('/v1/api/holding/:id', async (req, res) => {

    if(req.body.address) {

        let rupantor = {
            method: 'POST',
            uri: `https://admin.barikoi.xyz/v1/api/search/${process.env.BARIKOI_API_KEY}/rupantor/geocode`,
            form: {
                q: req.body.address
            }
        };


        await rp(rupantor)
        .then(function (body) {
            // POST succeeded...

            let data = JSON.parse(body)

            req.body.latitude = data.geocoded_address.latitude
            req.body.longitude = data.geocoded_address.longitude

            try {

                let query = mysql.format('UPDATE holdings SET ? WHERE id = ?', [req.body, req.params.id]);   
        
                pool.query(query, (err, rows, fields) => {
        
                    if(err) res.send(err)
            
                    if(rows) {
                        res.json('Holding Updated').status(200)
                    }
                })
            } catch(err) {
                res.json(err.message)
            }

        })
        .catch(function (err) {
            // POST failed...
            console.log(err.message)
            res.json(err.message)

        });






    } else {
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
    }

})

export default router