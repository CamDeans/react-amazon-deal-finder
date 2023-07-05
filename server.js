const PORT = 8000
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

// ????????????? >>>> PH when move to public repo
const username = "cameronmdeans"
// ????????????? >>>> PH when move to public repo
const password = "SandPointFN1!"

app.get('/deals', async(req, res) => {
    try{
        const body = {
            "source": "amazon_search",
            "domain": "ca",
            "query" : "deal of the day",
            "pages" : 1,
            "parse" : true
        } 
        const response = await fetch("https://realtime.oxylabs.io/v1/queries", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + Buffer.from(`${username}:${password}`).toString("base64")
            }
        }) 
        console.log(await response.json())
    } catch(err) {
        console.error(err)
    }
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`))