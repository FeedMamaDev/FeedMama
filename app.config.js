const fs = require('fs')

// on production ngrokUrl will be null
// you don't need to have the file NGROK_URL
// in production

let ngrokUrl = null
ngrokUrl = fs.readFileSync('./NGROK_URL', { encoding: 'utf8'})

export default ({ config }) => {
  return {
    ...config,
    extra: {
      ...config.extra,
      ngrokUrl,
    }
  }
}