//requires modules express
const express = require('express')
const expresslayouts = require('express-ejs-layouts')
const {body, validationResult, check} = require('express-validator')
const methodOverride = require('method-override')

//requires modules for flash
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

//require mongodb connection and model
require('./utils/db')
const Contact = require('./model/contact.js')

// Setup app express
const app = express()
const port = 3000

// Setup method override
app.use(methodOverride('_method'))

// Setup EJS view engine
app.set('view engine', 'ejs') // SET untuk menggunakan view engine , // format file ejs
app.use(expresslayouts)  // third party middleware untuk layout view engine
app.use(express.static('public')) // tempat folder build-in middleware

// Configuration of server
app.listen(port, () => {
    console.info(`Mongo Contact App | Listening at http:/localhost:${port}`)
})

// Configuration of Flash msg
app.use(cookieParser('secret'))
app.use(
    session({
        cookie : {maxAge : 6000},
        secret : 'secret',
        resave : true,
        saveUninitialized : true
    })
)
app.use(flash())

// Halaman Home
app.get('/', (req, res) => {
    const mahasiswa = [{
        nama : 'decoz',
        email : 'decoz@gmail.com'
    }]
    res.render('index', {
        layout : 'layouts/main-layout',
        title : 'Halaman Utama',
        nama : 'decozzfx',
        mahasiswa

    })
    console.info('Halaman Home')
})

// Halaman About
app.get('/about', (req, res) => {
    res.render('about', {
        layout : 'layouts/main-layout',
        title : 'Halaman About'
    })
})

// Halaman contact
app.get('/contact', async (req, res) => {
    // Contact.find().then((contact) => {
    //     res.send(contact)
    // })
    const contacts = await Contact.find()
    res.render('contact', {
        layout : 'layouts/main-layout',
        title : 'Halaman Contact',
        contacts,
        msg : req.flash('msg')
    })
})

// Halaman menambah data contact // Taruh sebelum route detail karena akan bersinggungan bila setelahnya
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        title : 'Halaman tambah contact',
        layout : 'layouts/main-layout',
    })
})

// Proses tambah data contact
app.post(
    '/contact',
    [
    body('nama').custom( async (value) => { // value => apa yang diketikan oleh user
    const duplikat = await Contact.findOne({ nama : value }) // method pengecekan apakah value sudah ada/duplikat
    if(duplikat){
        throw new Error ('Nama contact sudah digunakan')
    }
    return true
}),
    check('email', 'Email tidak valid!').isEmail(),
    check('nohp', 'Nomor Hp tidak valid!').isMobilePhone('id-ID'),
],
(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('add-contact', {
            title : 'Form tambah data contact',
            layout : 'layouts/main-layout',
            errors : errors.array(), // Jika error tidak ada maka akan menjadi undefined
        }) 

    }else{
       Contact.insertMany(req.body,async (error, result) => {
            req.flash('msg', 'Data contact berhasil ditambahkan!')
            res.redirect('/contact') // mengirim respon kembali ( karena route yang menangani adalah post)
        })
        // mengirimkan flash message sebelum redirect
    }
})

// Proses delete contact
app.delete('/contact', (req, res) => {
    Contact.deleteOne({ nama : req.body.nama}).then((result) => {
        req.flash('msg', 'data berhasil dihapus')
        res.redirect('/contact')
    })
})

app.get('/contact/edit/:nama', async (req, res) => {
    const contact = await Contact.findOne({nama : req.body.nama})
    res.render('edit-contact', {
        title : 'Form ubah data',
        layout : 'layouts/main-layout',
        contact,
    })
})

// app.get('/contact/delete/:nama', async (req, res) => {
//     const contact = await Contact.findOne({nama : req.params.nama})
//     // cek keberadaan contact
//     if(!contact){
//         res.status(404)
//         res.send('<h1> 404 Not Found</h1>')
//     } else {
//         Contact.deleteOne ({_id : contact._id }).then((result) => {
//             req.flash('msg', 'Data contact berhasil dihapus!')
//             res.redirect('/contact')
//         })
//    }
// })

// Halaman detail
app.get('/contact/:nama', async (req, res) => {
    const contact = await Contact.findOne({nama : req.params.nama})
    res.render('detail', {
        title : 'Halaman detail contact',
        layout : 'layouts/main-layout',
        contact
    })
})

