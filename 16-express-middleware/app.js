const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
const app = express()
const port = 3000

// Configurasi atau setup
// Menggunakan EJS
app.set('view engine', 'ejs')

// Third-party Middlerware
app.use(expressLayouts)
app.use(morgan('dev'))

// build in middleware
app.use(express.static('public'))

//Application level middleware
app.use((res, req, next)=>{
    console.info(`Time : `, Date.now())
    next()
})


// routing
app.get('/', (req, res)=>{

    const mahasiswa = [
        {
        nama : 'decoz',
        email: 'decoz@gmail.com'
        },
        {
        nama : 'erik',
        email: 'erik@gmail.com'
        },
        {
        nama : 'dody',
        email: 'dody@gmail.com'
        },
    ]

      res.render('index', {
        layout : 'layouts/main-layout',
          nama : 'decozdagger',
          title : 'Halaman Home',
          mahasiswa,
    })
})


app.get('/about', (req, res)=>{
    res.render('about', {
        layout : 'layouts/main-layout',
        title : 'halaman about'})
})

app.get('/contact', (req, res)=>{
    res.render('contact', {
        layout : 'layouts/main-layout',
        title : 'halaman contact'})
})

//Req Http
app.get('/produk/:id', (req, res)=>{ //req param produk/1
    res.send(`Produk ID : ${req.params.id} <br> Kategori ID : ${req.query.kategori}`) // req query kategori=sepatu
    })

// middler
app.use('/', (req, res)=>{
    res.status(404)
    res.send('<h1> 404 not found </h1>')
})

app.listen(port, ()=>{
    console.info(`Example app listening at http://localhost:${port}`)
})
