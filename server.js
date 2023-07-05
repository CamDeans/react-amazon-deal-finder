const PORT = 8000
const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()

app.use(cors())

// these will be in a .env file
// const username = process.env.USERNAME
// const password = process.env.PASSWORD
const username = "cameronmdeans"
const password = "AmazonWebScraper1!"

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
        const data = await response.json()

        // get the data for the first object
        const results = data.results[0].content.results.organic
        
        // filter through array prices and show ones that have a price_strikethrough deal applied to it
        const filteredDeals = results.filter(deal => deal.price_strikethrough)

        // sort highest to lowest and remove the original price then divide by price and multiply by 100 to get the percentage
        // compare to b.price_strikethrough
        const sortedByBestDeal = filteredDeals.sort((b, a) => 
            ((a.price_strikethrough - a.price) / a.price_strikethrough * 100) - 
            ((b.price_strikethrough - b.price) / b.price_strikethrough * 100)
        )
        // display the response from sorted by best deal 
        res.send(sortedByBestDeal)
    } catch(err) {
        console.error(err)
    }
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`))