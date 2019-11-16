import dotenv from 'dotenv'
import express from 'express'
import pool from '../database/connection'
import SQL from 'sql-template-strings'
import mysql from 'mysql2'
import momentDateConversion from '../middleware/date'
import rp from 'request-promise'
dotenv.config()


const router = express.Router()

router.get('/', (req, res) => res.send('bad url'))

// Create a new holding
router.post('/v1/api/holding', async (req, res) => {

    if (req.body.address) {
        let rupantor = {
            method: 'POST',
            uri: `https://admin.barikoi.xyz/v1/api/search/${process.env.BARIKOI_API_KEY}/rupantor/geocode`,
            form: {
                // Like <input type="text" name="name">
                q: req.body.address
            }
        };
        // console.log(rupantor.uri);


        await rp(rupantor)
            .then(function (body) {
                // POST succeeded...

                let data = JSON.parse(body)

                req.body.latitude = data.geocoded_address.latitude
                req.body.longitude = data.geocoded_address.longitude

                try {
                    
                     pool.query(mysql.format('INSERT INTO holdings SET ?', req.body), (err, rows, fields) => {

                        if (err) res.send(err)

                        if (rows) {
                            res.status(201).json({
                                message: "Holding created",
                                id: rows.insertId
                            })
                        }
                    })

                } catch (err) {
                    res.json(err.message)

                }

            })
            .catch(function (err) {
                // POST failed...
                console.log(err.message)

            });
    } else {
        try {

            await pool.query(mysql.format('INSERT INTO holdings SET ?', req.body), (err, rows, fields) => {

                if (err) res.send(err)

                if (rows) {
                    res.status(201).json({
                        message: "Holding created",
                        id: rows.insertId
                    })
                }
            })
        } catch (err) {
            res.json(err.message)
        }
    }

})

export default router