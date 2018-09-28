#!/usr/bin/env node
const command = require('sergeant')
const execa = require('execa')
const pkg = require(process.cwd() + '/package.json')

command('run', ({ parameter }) => {
  parameter('command', {
    description: 'command to run',
    required: true,
    multiple: true,
    type (val) { return val }
  })

  return async (args) => {
    const commands = []
    let parallel = 0

    for (let command of args.command) {
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
        const first = c.split(/\s+/)[0]

        if (pkg.bin && pkg.bin[first]) {
          c = 'node ' + pkg.bin[first] + c.substring(first.length)
        } else if (pkg.scripts && pkg.scripts[first]) {
          c = pkg.scripts[first] + c.substring(first.length)
        }

        promises.push(execa.shell(c, { stdio: 'inherit', cwd: process.cwd() }))
      }

      await Promise.all(promises)
    }
  }
})(process.argv.slice(2))
