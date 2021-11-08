const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/wpu', {
useNewUrlParser: true, 
useUnifiedTopology: true,
useCreateIndex : true // otomatis membuat index untuk setiap document db yang dibuat
})

// // schema
// const Contact = new mongoose.model('Contact', {
//     nama : {
//         type : String,
//         required : true,
//     },
//     nohp : {
//         type : String,
//         required : true
//     },
//     email : {
//         type : String
//     },
// })

// // Menambah 1 data
// const contact1 = new Contact(
//     {
//         nama : 'dono',
//         nohp : '089764632343',
//         email : 'dono@mail.com'
//     }
// )

// // simpan ke collection
// contact1.save().then((result) => {
//     console.info(result)
// }).catch((error) => {
//     console.info(error)
// })