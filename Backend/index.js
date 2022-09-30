const app = require('./app/src')
require('dotenv').config()
app.listen(process.env.PORT, ()=>console.log(`Listining on http://localhost:${process.env.PORT}`))