
// const contacts = require('./contacts')


// //membuat pertanyaan
// const main = async ()=>{
    //     const nama = await contacts.tulisPertanyaan(`Masukkan Nama Anda : `)
    //     const email = await contacts.tulisPertanyaan(`Masukkan Email Anda : `)
    //     const noHp = await contacts.tulisPertanyaan(`Masukkan No Hp Anda : `)
    
    //     contacts.simpanContact(nama, email, noHp)
    // }
    
    // main()
    
    
    
// mengambil argumen dari commandline
const { demandOption } = require("yargs");
const yargs = require(`yargs`);
const contacts = require("./contacts");

// Menambah kontak
yargs.command({
    command : `add`,
    describe : `Menambah kontak baru`,
    builder : {
        nama : {
            describe : `Nama Lengkap`,
            demandOption : true,
            type : `string`,
        },
        email : {
            describe : `Email`,
            demandOption : false,
            type : `string`
        },
        noHp : {
            describe : `Nomor Handphone`,
            demandOption : true,
            type : `string`
        },
    },
    handler(argv){
        contacts.simpanContact(argv.nama, argv.email, argv.noHp)
        },

})
.demandCommand()

// Menampilkan daftar kontak
yargs.command({
    command : `list`,
    describe : `Menampilkan daftar nama dan no hape contact`,
    handler(){
        contacts.listContact()
    }
})

yargs.command({
    command : `detail`,
    describe : `Menampilkan detail contact berdasarkan nama`,
    builder : {
        nama :{
             describe : `Nama`,
             demandOption : true,
             type : `string`
        },
    },
    handler(argv){
        contacts.detailContact(argv.nama)
    },
})

yargs.command({
    command : `hapus`,
    describe : `Menghapus contact berdasarkan nama`,
    builder: {
        nama : {
            describe : `nama`,
            demandOption : true,
            type : `string`
        },        
    },
    handler(argv){
        contacts.hapusContact(argv.nama)
    }
})



yargs.parse()