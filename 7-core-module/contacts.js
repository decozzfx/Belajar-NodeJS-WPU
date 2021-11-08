// core module
const fs = require('fs')
const chalk = require('chalk')
const validator = require('validator')

// // Menuliskan string ke file (synchronous)
// try{
//     fs.writeFileSync(`file.txt`,`menulis secara synchronous`)
// }catch (e){
//     console.info(e)
// }

//menuliskan string ke file (Asynchronous)
// fs.writeFile(`file.txt`,`menulis secara asynchronous`,(e)=>{
//     console.info(e)
// })

// //membaca isi file (synchronous)
// const data = fs.readFileSync('file.txt','utf-8') // utf-8 untuk mengubah buffer ke string
// console.info(data)

// // membaca isi file (asynchronous)
//    fs.readFile(`file.txt`,`utf-8`,(e , data)=>{
//        if (e) throw e
//         console.info(data)
//     })


// ReadLine
// const readline = require(`readline`)  // import module

// const rl = readline.createInterface({ // membuat interface
//     input : process.stdin,
//     output : process.stdout
// })

// rl.question(`Siapa nama kamu? `,(answer)=>{ // membuat pertanyaan pada interface
//    // TODO:
//     console.info(`Terima kasih , ${answer}`) //membuat jawaban

//     rl.close() // menutup interface
// })

// Cek keberadaan direktori folder dan membuat folder tsb
const dirPath = (`./data`)
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath)
}

// Cek File contacts.json dan membuatnya jika belum ada
const dataPath = (`./data/contacts.json`)
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, `[]`, `utf-8`)
}

//multiple question dengan promise
// const pertanyaan1 = () =>{
//     return new Promise((resolve, rejects)=>{
//         rl.question(`Masukkan nama kamu? `,(nama)=>{
//             resolve(nama)
//         })
//     })
// }

// pertanyaan dengan model generic
// const tulisPertanyaan = (pertanyaan) =>{
//     return new Promise((resolve, rejects)=>{
//         rl.question(pertanyaan,(nama)=>{
//             resolve(nama)
//         })
//     })
// }

const loadContact = () => {
    const file = fs.readFileSync(`./data/contacts.json`,`utf-8`) // ambil data file
    const contacts = JSON.parse(file) // rubah jenis data file string ke JSON
    return contacts
}

const simpanContact = (nama, email, noHp ) =>{
    const contact = {nama, email, noHp} // ambil data jawaban
    // const file = fs.readFileSync(`./data/contacts.json`,`utf-8`) // ambil data file
    // const contacts = JSON.parse(file) // rubah jenis data file string ke JSON
    const contacts = loadContact()

    //cek duplikat
    const duplikat = contacts.find((contact)=> contact.nama === nama)
    if(duplikat){
        console.info(
            chalk.red.inverse.bold(`Nama contact telah terdaftar, gunakan nama lain!`)
            )
        return false 
    }

    //cek email
    if(email){
        if(!validator.isEmail(email)){
            console.info(
                chalk.red.inverse.bold(`Email yang anda masukkan salah!`)
                )
            return false 
        }
    }

    //cek No Hape
    if(!validator.isMobilePhone(noHp,`id-ID`)){
        console.info(
            chalk.red.inverse.bold(`NO HP yang anda masukkan salah!`)
            )
        return false 
    }

    contacts.push(contact) // Mengisi data ke JSON (JSON seperti Array)
    
    fs.writeFileSync(`./data/contacts.json`,JSON.stringify(contacts))
    
    console.info(chalk.green.inverse.bold(
    `terima kasih sudah mengisi data`)
    )
    
    // rl.close() // menutup interface
}
// Function menampilkan contact

const listContact = () => {
    const contacts = loadContact()
    console.info(chalk.green.bgBlack.bold(
        `daftar nama dan nomor contact :`)
        )
    contacts.forEach((contact, i) => {
      console.info(`${i+1}, ${contact.nama} - ${contact.noHp}`)  
    })
}

const detailContact = (nama) =>{
    const contacts = loadContact()
        const contact = contacts.find(
             (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
         )

    if(contact){
        console.info(contact.nama)
        console.info(contact.noHp)
        if(contact.email){
            console.info(contact.email)
        }
    }else{
        console.info(chalk.red.inverse.bold(`${nama} Nama contact tidak ada!`))
        return false
    }

}

// Menghapus Kontak
const hapusContact = (nama) =>{
    const contacts = loadContact()
    const newContacts = contacts.filter(
        (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
        )

    if(contacts.length === newContacts.length){
        console.info(chalk.red.inverse(`${nama} tidak ditemukan`))
    }else{
    fs.writeFileSync(`./data/contacts.json`,JSON.stringify(newContacts))
    
    console.info(chalk.green.inverse.bold(
    `data contact ${nama} berhasil dihapus`)
    )
    }
 }

module.exports = {simpanContact,listContact,detailContact, hapusContact}


// multiple question dengan callback
// rl.question(`Siapa nama kamu? `,(nama)=>{ // membuat pertanyaan pada interface
    
//     rl.question(`Berapa nomor hp ? `, (noHP) => {
//         const contact = {nama,noHP} // ambil data jawaban
//         const file = fs.readFileSync(`./data/contacts.json`,`utf-8`) // ambil data file
//         const contacts = JSON.parse(file) // rubah jenis data file string ke JSON
//         contacts.push(contact) // Mengisi data ke JSON (JSON seperti Array)

//         fs.writeFile(`./data/contacts.json`,JSON.stringify(contacts),(e)=>{ //mengupload data ke JSON file
//             console.info(e)
//         })

//         console.info(`terima kasih sudah mengisi data`)
        
//         rl.close() // menutup interface

//     })
//  })

