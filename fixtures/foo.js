const delay = Number(process.argv[2])

setTimeout(() => {
  console.log(delay)

  process.exit(0)
}, delay)
