const validator = require('validator')
const chalk = require(`chalk`)

const dataEmail = validator.isEmail(`decoz@gmail.com`)
console.info(dataEmail)

const dataTelp = validator.isMobilePhone(`081123123`,`id-ID`)
console.info(dataTelp)

const dataNumeric = validator.isNumeric(`12`)
console.info(dataNumeric)

const pesan = chalk`lorem {bgYellow awdas} {blue.bold adsdaw}  {bgGreen.italic.black asdasd}`
console.info(chalk.bgRed.white.bold(pesan))