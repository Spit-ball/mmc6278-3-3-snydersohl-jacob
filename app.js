require('dotenv').config()
const express = require('express')
const app = express()


// TODO: import the getCityInfo and getJobs functions from util.js

const appInfo = require('./util.js')


// TODO: Statically serve the public folder

app.use(express.static('public'))

// TODO: declare the GET route /api/city/:city

// This endpoint should call getCityInfo and getJobs and 

// the result as JSON.
// The returned JSON object should have two keys:
// cityInfo (with value of the getCityInfo function)
// jobs (with value of the getJobs function)
// If no city info or jobs are found,
// the endpoint should return a 404 status

app.get('/api/city/:city', async (req, res) => {
    const city = req.params.city
    const cityInfo = await appInfo.getCityInfo(city)
    const jobs = await appInfo.getJobs(city)
    if (cityInfo && jobs) {
        res.json({ cityInfo, jobs })
    } else {
        res.status(404).json({ message: 'Not found' })
        console.log('Not found')
    }
})


module.exports = app
