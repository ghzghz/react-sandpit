const data = require('./data')

let getData = data.getData


let controller = () => {
    return getData()
}

module.exports = { controller }
