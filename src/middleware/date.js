import moment from 'moment-timezone'

function momentDateConversion (req, res, next) {
    if (req.body.holding_reg_date) req.body.holding_reg_date = moment.tz(req.body.holding_reg_date, "Asia/Dhaka")
    if(req.body.assessment_date) req.body.assessment_date = moment.tz(req.body.assessment_date, "Asia/Dhaka")
    if(req.body.last_assesment_date) req.body.last_assesment_date = moment.tz(req.body.last_assesment_date, "Asia/Dhaka")
    if(req.body.last_transaction_date) req.body.last_transaction_date = moment.tz(req.body.last_transaction_date, "Asia/Dhaka")

    next()
}

export default momentDateConversion