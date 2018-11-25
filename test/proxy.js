import _proxy  from '../src/proxy'
import _ from 'lodash'

let context = {
  data: {
    name: 'lee',
    info: {
      graduate: 'hafol university',
      year: '2016'
    },
    pets: [
      'dog',
      {
        name: 'lili',
        type: 'cat'
      }
    ]
  }
}


QUnit.test(`_proxy`, function(assert){
  let done = assert.async()
  assert.timeout(1000)

  let origin = _.cloneDeep(context)
  _proxy(origin, origin.data, (data) => {
    assert.equal(data.name, 'limei', 'data.name 应该是limei')
    assert.equal(data.info.year, '2002', 'data.info.year 应该是2002')
    assert.equal(data.pets[0], 'liming', 'data.pets[0] 应该是liming')
    assert.equal(data.pets[1].name, 'kiki', 'data.pets[1].name 应该是kiki')
    assert.equal(data.pets[2], 'vikey', 'data.pets[2] 应该是vikey')
    done()
  })
  origin.$data.name = 'limei'
  origin.$data.info.year = '2002'
  origin.$data.pets[0] = 'liming'
  origin.$data.pets[1].name = 'kiki'
  origin.$data.pets.push('vikey')
})

QUnit.test('_proxy1', function(assert){
  let done = assert.async()
  assert.timeout(1000)
  
  let origin = _.cloneDeep(context)
  _proxy(origin, origin.data, (data) => {
    console.log('finish')
    assert.equal(data.info.year, '2012', 'data.info.year应该是2012')
    assert.equal(data.info.graduate, undefined, 'data.info.graduate 应该是undefind')
    assert.equal(data.pets[1], '123', 'data.pets[1]应该是123')
    done()
  })

  origin.$data.info = {
    year: '2012'
  }
  origin.$data.pets[1] = '123'
})


