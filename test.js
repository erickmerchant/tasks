const test = require('tape')
const execa = require('execa')

test('test index.js 1', async (t) => {
  t.plan(1)

  const result = await execa('node', ['..', '1'], { cwd: './fixtures/' })

  t.equal(result.stdout, '30\n10\n20')
})

test('test index.js 2', async (t) => {
  t.plan(1)

  const result = await execa('node', ['..', '2'], { cwd: './fixtures/' })

  t.equal(result.stdout, '15\n10\n20\n15')
})

test('test index.js 3', async (t) => {
  t.plan(1)

  const result = await execa('node', ['..', '3'], { cwd: './fixtures/' })

  t.equal(result.stdout, '10\n20\n30')
})
