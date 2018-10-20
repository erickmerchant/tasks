const test = require('tape')
const execa = require('execa')

test('test index.js 1', async (t) => {
  t.plan(1)

  const result = await execa('node', ['..', '1'], { cwd: './fixtures/' })

  t.ok(['30\n10\n20', '30\n20\n10'].includes(result.stdout))
})

test('test index.js 2', async (t) => {
  t.plan(1)

  const result = await execa('node', ['..', '2'], { cwd: './fixtures/' })

  t.ok(['15\n10\n20\n15', '15\n20\n10\n15'].includes(result.stdout))
})

test('test index.js 3', async (t) => {
  t.plan(1)

  const result = await execa('node', ['..', '3'], { cwd: './fixtures/' })

  t.ok(['10\n20\n30', '20\n10\n30'].includes(result.stdout))
})
