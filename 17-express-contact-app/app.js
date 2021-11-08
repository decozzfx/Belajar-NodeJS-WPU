const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const { loadContact, findContact } = require('./utils/contacts')
const app = express()
const port = 3000

// Configurasi atau setup
// Menggunakan EJS
app.set('view engine', 'ejs')

// Third-party Middlerware
app.use(expressLayouts)

// build in middleware
app.use(express.static('public'))


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
    const contacts = loadContact()
    res.render('contact', {
        layout : 'layouts/main-layout',
        title : 'halaman contact',
        contacts,
    })
})

app.get('/contact/:nama', (req, res)=>{
    const contact = findContact(req.params.nama)
    res.render('detail',{
        layout : 'layouts/main-layout',
        title : 'halaman detail contact',
        contact,
    })
})

// middler
app.use('/', (req, res)=>{
    res.status(404)
    res.send('<h1> 404 not found </h1>')
})

app.listen(port, ()=>{
    console.info(`Example app listening at http://localhost:${port}`)
})
