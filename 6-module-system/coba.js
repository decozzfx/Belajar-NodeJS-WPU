function cetakNama(nama){
    return `Halo, Nama saya ${nama}`
}

const PI = 3.14

const mahasiswa = {
    nama : 'decoz zfx',
    umur : 25,
    cetakMhs(){
        return `Halo nama saya ${this.nama}, umur ${this.umur} tahun.`
    }
}

class Orang{
    constructor(){
        console.info(`Object orang telah dibuat!!`)
    }
}

// module.exports.cetakNama = cetakNama
// module.exports.PI = PI
// module.exports.mahasiswa = mahasiswa
// module.exports.Orang = Orang

// module.exports = {
//     cetakNama : cetakNama,
//     PI : PI,
//     mahasiswa : mahasiswa,
//     Orang : Orang
// }

module.exports = {cetakNama, PI, mahasiswa, Orang}