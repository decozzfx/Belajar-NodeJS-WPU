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
const loadContact = () => {   // Membuat fungsi ambil/load file
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8') // Membaca file
    const contacts = JSON.parse(fileBuffer)  // Ambil dan mengconvert file String menjadi Object
    return contacts
}

// Mengambil data contacts berdasarkan nama contact
const findContact = (nama) => {
    const contacts = loadContact()
    const contact = contacts.find((contact) => contact.nama === nama) // mencari value yang nilainya sama 'nama'
    return contact
}

// Rewrite data file JSON contacts.JSON dengan data yang baru dimasukkan
const saveContacts = (contacts)=> { // parameter contacts sebagai object baru
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts)) // Mengubah data object menjadi String-> timpa ke contacts.json
}

// Menambahkan data contact baru
const addContact = (contact) => {
const contacts = loadContact() // ambil data file contacts
contacts.push(contact) // menambahkan contact baru ke file contacts
saveContacts(contacts) // menimpa file contacts lama dengan file contants baru yg telah ditambahkan contact baru

}

// Method Mengecek nama contact yang duplikat
const cekDuplikat = (nama) => { //value name diambil dari form contact
    const contacts = loadContact()
    return contacts.find((contact) => contact.nama === nama ) // mencari value yang nilainya sama 'nama' (pertama yg ada di json)
}
 
// Hapus contact
const deleteContact = (nama) => {
    const contacts = loadContact()
    const filteredContacts = contacts.filter((contact) => contact.nama !== nama) // mencari value yang nilainya tidak sama dengan 'nama' (semua data difilter)
    saveContacts(filteredContacts)
}

// Memperbarui contacts
const updateContacts = (contactBaru) => { // contactBaru berisi oldNama, nama, email dan nohp
    const contacts = loadContact()
    // hilangkan contact lama yang namanya sama dengan oldNama
    const filteredContacts = contacts.filter((contact) => contact.nama !== contactBaru.oldNama) // memfilter contacs yang namanya tidak sama dengan oldNama
    delete contactBaru.oldNama
    filteredContacts.push(contactBaru)
    saveContacts(filteredContacts)
}

module.exports = {loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts}