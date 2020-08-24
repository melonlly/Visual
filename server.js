const express = require('express')
const app = express()
const cors = require('cors')
const port = 9999

app.use(cors())

app.use(express.static('./'))

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
