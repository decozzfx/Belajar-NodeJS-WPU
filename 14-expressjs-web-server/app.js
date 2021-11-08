const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res)=>{
    // res.send('Hello Worlds')
    // res.json({
    //     nama : 'decoz',
    //     email : 'awdadaw@gmail.com',
    //     noHp : '0812345678'
    // })
    res.sendFile('./index.html',{root: __dirname})
})


app.get('/about', (req, res)=>{
    // res.send('ini adalah halaman about')
    res.sendFile('./about.html', {root: __dirname})
})

app.get('/contact', (req, res)=>{
    // res.send('ini adalah halaman contact')
    res.sendFile('./contact.html', {root: __dirname})
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



// const fs= require("fs")
// const http = require(`http`)

// const renderHTML = (path, res)=>{
//     fs.readFile(path,(err, data)=>{
//         if(err){
//             res.write(404)
//             res.write('File Not Found')
//         }else{
//             res.write(data)
//         }
//         res.end()
//     })
// }

// const server = http.createServer((req, res)=>{
//     res.writeHead(200, {
//         'Content-Type' : 'text/html'
//     })

//     const url = req.url
//     // if(url === '/about'){
//     //    renderHTML('./about.html', res)
//     // }else if(url === `/contact`){
//     //     renderHTML('./contact.html', res)
//     // }else{
//     //    renderHTML('./index.html',res)
       
//     // }

//     switch(url){
//         case '/about':
//             renderHTML('./about.html', res)
//             break
//         case '/contact':
//             renderHTML('./contact.html', res)
//             break
//         default:
//             renderHTML('./index.html',res)
//             break
//     }

// })
// server.listen(3000, ()=>{
//     console.info(`server is listening on port 3000`)
// })