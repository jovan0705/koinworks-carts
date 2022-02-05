const app = require('../app')
const http = require('http')
const server = http.createServer(app)
const PORT = process.env.PORT || 3000
    server.listen(PORT, _ => {
        console.log(`server listening on http://localhost:${PORT}`)
    })

module.exports = server