const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const { loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts } = require('./utils/contacts')
const { body, validationResult, check } = require('express-validator');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

const app = express()
const port = 3000

// Configurasi atau setup
// Menggunakan EJS
app.set('view engine', 'ejs')

// Third-party Middlerware
app.use(expressLayouts)

// build in middleware
app.use(express.static('public')) // import file dari local pc
app.use(express.urlencoded({extended : true})) // parsing data dari method post 

// konfigurasi flash
app.use(cookieParser('secret')) // konfigurasi cookieparser
app.use(session({
    cookie : { maxAge : 6000},
    secret : 'secret',
    resave : true,
    saveUninitialized : true,
}))
app.use(flash())

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
        msg : req.flash('msg'),
    })
})

//Form tambah data contact
app.get('/contact/add', (req, res)=> {
    res.render('add-contact', {
        layout : 'layouts/main-layout',
        title : 'Tambah contact',

    })
})

//proses post data contact (Menambah Contact)

app.post('/contact',[ 
    body('nama').custom((value) => { // value => apa yang diketikan oleh user
    const duplikat = cekDuplikat(value) // method pengecekan apakah value sudah ada/duplikat
    if(duplikat){
        throw new Error ('Nama contact sudah digunakan')
    }
    
    return true
}),
    check('email', 'Email tidak valid').isEmail(),
    check('nohp', 'Nomor Hp tidak valid').isMobilePhone('id-ID')
], (req, res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
        res.render('add-contact', {
            title : 'Form tambah data contact',
            layout : 'layouts/main-layout',
            errors : errors.array(), // Jika error tidak ada maka akan menjadi undefined
        })
        
    }else{
        addContact(req.body)
        // mengirimkan flash message sebelum redirect
        req.flash('msg', 'Data contact berhasil ditambahkan!')
    }
    res.redirect('/contact') // mengirim respon kembali ( karena route yang menangani adalah post)
})

// Proses delete contact
app.get('/contact/delete/:nama', (req, res) => {
    const contact = findContact(req.params.nama)
    // cek keberadaan contact
    if(!contact){
        res.status(404)
        res.send('<h1> 404 Not Found</h1>')
    } else {
        deleteContact(req.params.nama)
        req.flash('msg', 'Data contact berhasil dihapus!')
   }
   res.redirect('/contact')
})

// Halaman form ubah data contact
app.get('/contact/edit/:nama', (req, res) => {
    const contact = findContact(req.params.nama)
    res.render('edit-contact', {
        title : 'Form ubah data contact',
        layout : 'layouts/main-layout',
        contact,
    })
})

// Proses ubah data contact
app.post('/contact/update',[
    body('nama').custom((value, {req}) => { // value = nama yang baru // {req} mendapatkan akses req
        const duplikat = cekDuplikat(value) // cek apakah value sama dengan data yg sudah ada  
        if (value !== req.body.oldNama && duplikat) {  // Membuat kondisi dimana jika nama sama oldNama boleh, jika beda harus dicek lagi dengan duplikat()
            throw new Error('Nama contact sudah digunakan!')
        }
        return true
    }),
    check('email', 'Email tidak valid!').isEmail(),
    check('nohp', 'Nomor handphone tidak valid!').isMobilePhone('id-ID'),
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        res.render('edit-contact', {
            title : 'Form Ubah Data Contact',
            layout : 'layouts/main-layout',
            errors : errors.array(),
            contact : req.body
        })
    } else {
        updateContacts(req.body)
        // Flash msg
        req.flash('msg', 'Data Contact Berhasil Diperbarui')
    }
    res.redirect('/contact')
})


// Halaman detail contact
app.get('/contact/:nama', (req, res) => {
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
