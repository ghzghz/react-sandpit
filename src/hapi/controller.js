const data = require('./data')

let getData = data.getData


let controller = () => {
    return getData()
}

let controller2 = () => {
    return data.getData()
}

module.exports = { controller, controller2 }
