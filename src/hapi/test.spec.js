const rewire = require('rewire')
//const controller = require('./controller')
const controller = rewire('./controller')


it('is good', () => {
    expect(1).toEqual(1)
})

it('not rewired controller', () => {
    expect(controller.controller()).toEqual('basic')
})

it('rewired controller', () => {
    controller.__set__('getData', () => 'fancy')
    expect(controller.controller()).toEqual('fancy')
})


