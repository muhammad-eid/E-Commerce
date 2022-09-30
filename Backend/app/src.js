require('./database/connection')
const express = require('express')

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())

const registerRoute = require('./routes/register.route')
const categoryRoute = require('./routes/category.route')
const productRoute = require('./routes/product.route')
const cartRoute = require('./routes/cart.route')
const profileRoute = require('./routes/profile.route')

app.use('/', registerRoute)
app.use('/', categoryRoute)
app.use('/product', productRoute)
app.use('/cart', cartRoute)
app.use('/profile', profileRoute)


module.exports=app