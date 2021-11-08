const fs = require('fs')

// Mengecek dan membuat folder data jika belum ada
const dirPath = './data'
if(!fs.existsSync(dirPath)){ // Mengecek ketersediaan folder
    fs.mkdirSync(dirPath) // Membuat folder
}

// Mengecek dan membuat file data jika belum ada
const dataPath = './data/contacts.json'
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8') // Membuat file (di dir, isi , format)
}

// Mengambil semua data file contacts.JSON
const loadContact = () =>{   // Membuat fungsi ambil/load file
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8') // Membaca file
    const contacts = JSON.parse(fileBuffer)  // Ambil dan mengconvert file JSON ke String
    return contacts
}

// Mengambil data contacts berdasarkan nama contact
const findContact = (nama) => {
    const contacts = loadContact()
    const contact = contacts.find((contact) => contact.nama === nama)
    return contact
}

module.exports = {loadContact, findContact}