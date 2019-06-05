#!/usr/bin/env node
const { command, start } = require('sergeant')('tasks')
const execa = require('execa')
const pkg = require(process.cwd() + '/package.json')

command(({ parameter }) => {
  parameter({
    name: 'command',
    description: 'command to run',
    required: true,
    multiple: true,
    type (val) { return val }
  })

  return async (args) => {
    const commands = []
    let parallel = 0

    for (const command of args.command) {
      if (command === '[') {
        parallel += 1

        commands.push([])

        continue
      }

      if (command === ']') {
        parallel -= 1

        continue
      }

      if (parallel) {
        commands[commands.length - 1].push(command)
      } else {
        commands.push([command])
      }
    }

    for (const command of commands) {
      const promises = []

      for (let c of command) {
        const first = c.split(' ')[0]

        if (pkg.bin && pkg.bin[first]) {
          c = 'node ' + pkg.bin[first] + c.substring(first.length)
        } else if (pkg.scripts && pkg.scripts[c]) {
          c = pkg.scripts[c]
        }

        promises.push(execa.shell(c, { stdio: 'inherit', cwd: process.cwd() }))
      }

      await Promise.all(promises)
    }
  }
})

start(process.argv.slice(2))
