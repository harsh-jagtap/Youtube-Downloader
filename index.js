const express = require('express')
const app = express()
const port = 3000
const ytdl = require('ytdl-core');

app.use(express.json())
app.use(express.static('Home'))

app.get('/api/link', async function(req, res) {
    let link = req.query.ViLink
    let result = await ytdl.getInfo(link)
    res.status(200).json(result)
})

app.listen(port, function() {
    console.log(`Youtube Downloader is on port http://localhost:${port}`);
})