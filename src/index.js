import express from 'express'
import cors from 'cors'
import holdingRoute from './routes/holding'
import deleteHolding from './routes/delete-holding'
import createHolding from './routes/create-holding'
import updateHolding from './routes/update-holding'

const app = express()
const PORT = process.env.PORT || 4000
// const applog  = debug('applog')
// const dblog  = debug('dblog')

app.use(cors())
app.use(express.json())

app.use('/', holdingRoute, createHolding, updateHolding)

app.listen(PORT, () => console.log(`app runnung on port ${PORT}`))

