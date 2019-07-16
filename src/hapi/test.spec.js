const rewire = require('rewire')
const sinon = require('sinon')

// for the clean test 
const controller = require('./controller')

// for rewire
const wiredController = rewire('./controller')

// for sinon
const data = require('./data');


it('is good', () => {
    expect(1).toEqual(1)
})

it('basic controller', () => {
    expect(controller.controller()).toEqual('basic')
})

it('rewired controller', () => {
    // patching the getData call 'inside' controller
    wiredController.__set__('getData', () => 'fancy')
    expect(wiredController.controller()).toEqual('fancy')
})

it('sinoned controller', () => {
    // patching the external 'data' library
    // (won't work for patching the internal call)
    const dataMock = sinon.stub(data, 'getData').callsFake( () => 'fancy2' );
    expect(controller.controller2()).toEqual('fancy2')
})


