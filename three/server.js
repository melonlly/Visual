const express = require('express')
const app = express()
const cors = require('cors')
const port = 8888

app.use(cors())

app.use(express.static('./'))

app.get('/', (req, res) => res.send('Hello threejs!'))

app.listen(port, () => console.log(`threejs app listening on port ${port}!`))
