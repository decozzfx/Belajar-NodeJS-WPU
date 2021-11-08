const { MongoClient } = require('mongodb') //import mongodb
const { BSON } = require('mongodb/lib/core')

const uri = 'mongodb://127.0.0.1:27017' // uri untuk database lokal
const dbName = 'wpu' // nama database yang digunakan

// Konfigurasi
const client = new MongoClient(uri, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
}) 

// Koneksi ke server
client.connect((error, client) => {
    if(error){
        return console.info('Koneksi gagal!')
    }

// pilih database
const db = client.db(dbName)

// Menambahkan 1 data dan pilih collection mahasiswa
// db.collection('mahasiswa').insertOne({
//     nama : 'Erik',
//     email : 'erik@gmail.com'
// },
// (error, result) => {
//     if(error){
//         return console.info('Gagal menambahkan data')
//     }
//     console.info(result)
// }
// )

// Menambahkan lebih dari 1 data 
// db.collection('mahasiswa').insertMany(
//     [
//         {
//             nama : 'Riko',
//             email : 'riko@gmail.com',
//         },
//         {
//             nama : 'Avip',
//             email : 'Avip@gmail.com'
//         }
//     ],
//     (error, result) => {
//         if (error){
//             return console.info('Data gagal')
//         }

//         console.info(result)
//     }
// )

// // Menampilkan semua data yang ada di collection 'mahasiswa'
// console.info(
//     db
//     .collection('mahasiswa')
//     .find()
//     .toArray((error, result) => {
//         console.info(result)
// }))

// Menampilkan semua data yang ada di collection 'mahasiswa' berdasarkan kriteria
// console.info(
//     db
//     .collection('mahasiswa')
//     .find({nama : 'Erik'}) // menampilkan data nama erik , dengan paremeter object {}
//     .toArray((error, result) => {
//         console.info(result)
// }))

    // Berdasarkan ID
// console.info(
//     db
//     .collection('mahasiswa')
//     .find({ _id : BSON.ObjectID('618292a7d3cd0a7bb11822a1') }) // 
//     .toArray((error, result) => {
//         console.info(result)
// }))

// Memperbarui 1 data berdasarkan id
// const updatePromise = db.collection('mahasiswa').updateOne(
//     {
//         _id : BSON.ObjectId('618292a7d3cd0a7bb11822a1')
//     },
//     {
//         $set : {
//             nama : 'Avip Saipul'
//         }
//     }
// )

// updatePromise.then((result) => { // menghasilkan result perbarui
//     console.info(result)
// }).catch((error) => {
//     console.info(error)
// })

// Memperbarui banyak data berdasarkan kriteria
// db.collection('mahasiswa').updateMany(
//     {
//         nama : 'Erik'
//     },
//     {
//         $set : {
//             nama : 'Erik Doang'
//         }
//     }
// )

// Menghapus 1 data
// db.collection('mahasiswa').deleteOne(
//     {
//         _id : BSON.ObjectId('618292a7d3cd0a7bb11822a0')
//     }
// ).then((result) => {     // method chaining
//     console.info(result)
// }).catch((error) => {
//     console.info(error)
// })

// Menghapus banyak data
db.collection('mahasiswa').deleteMany(
    {
        nama : 'Erik Doang'
    }
).then((result) => {     // method chaining
    console.info(result)
}).catch((error) => {
    console.info(error)
})

});